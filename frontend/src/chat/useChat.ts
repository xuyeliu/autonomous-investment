import { useState, useRef, useCallback, useEffect } from 'react';
import type { ChatMessage, QuickReply, OnboardingStep, ChatContext, AIResponse } from './types';

let messageIdCounter = 0;
function nextId() {
  return `msg-${++messageIdCounter}-${Date.now()}`;
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [quickReplies, setQuickReplies] = useState<QuickReply[]>([]);
  const [onboardingStep, setOnboardingStep] = useState<OnboardingStep>(() => {
    return localStorage.getItem('atlas_onboarding_complete') === 'true' ? 'complete' : 'welcome';
  });
  const [context, setContext] = useState<ChatContext>({});
  const scrollRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Keep refs for latest values so callbacks don't go stale
  const onboardingStepRef = useRef(onboardingStep);
  onboardingStepRef.current = onboardingStep;
  const contextRef = useRef(context);
  contextRef.current = context;

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  const addUserMessage = useCallback((text: string) => {
    const msg: ChatMessage = {
      id: nextId(),
      sender: 'user',
      text,
      timestamp: Date.now(),
    };
    setMessages(prev => [...prev, msg]);
    setQuickReplies([]);
    return msg;
  }, []);

  const queueAIResponses = useCallback((responses: AIResponse[]) => {
    // Clear any pending timers
    typingTimeoutRef.current.forEach(clearTimeout);
    typingTimeoutRef.current = [];

    let totalDelay = 0;

    responses.forEach((response, index) => {
      const delay = response.delay || 800;
      totalDelay += delay;

      // Show typing indicator before each message
      const typingTimer = setTimeout(() => {
        setIsTyping(true);
      }, totalDelay - delay + 100);
      typingTimeoutRef.current.push(typingTimer);

      // Show the actual message
      const messageTimer = setTimeout(() => {
        setIsTyping(index < responses.length - 1);

        if (response.text || response.card) {
          const msg: ChatMessage = {
            id: nextId(),
            sender: 'ai',
            text: response.text,
            card: response.card,
            timestamp: Date.now(),
          };
          setMessages(prev => [...prev, msg]);
        }

        if (response.quickReplies) {
          setQuickReplies(response.quickReplies);
        }
      }, totalDelay);
      typingTimeoutRef.current.push(messageTimer);
    });

    // Ensure typing stops after all messages
    const finalTimer = setTimeout(() => {
      setIsTyping(false);
    }, totalDelay + 100);
    typingTimeoutRef.current.push(finalTimer);
  }, []);

  const updateContext = useCallback((updates: Partial<ChatContext>) => {
    setContext(prev => ({ ...prev, ...updates }));
  }, []);

  const completeOnboarding = useCallback(() => {
    localStorage.setItem('atlas_onboarding_complete', 'true');
    setOnboardingStep('complete');
  }, []);

  const getOnboardingStep = useCallback(() => onboardingStepRef.current, []);
  const getContext = useCallback(() => contextRef.current, []);
  const isOnboardingComplete = useCallback(() => onboardingStepRef.current === 'complete', []);

  return {
    messages,
    isTyping,
    quickReplies,
    onboardingStep,
    onboardingComplete: onboardingStep === 'complete',
    context,
    scrollRef,
    addUserMessage,
    queueAIResponses,
    setQuickReplies,
    setOnboardingStep,
    updateContext,
    completeOnboarding,
    getOnboardingStep,
    getContext,
    isOnboardingComplete,
  };
}
