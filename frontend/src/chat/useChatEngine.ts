import { useCallback, useEffect, useRef } from 'react';
import { useChat } from './useChat';
import { resolveIntent, generateResponse } from './intentHandler';
import { tradeLeads, markTradeApproved } from '../data/mock';
import {
  getOnboardingWelcome,
  getOnboardingThemes,
  getOnboardingRisk,
  getOnboardingComplete,
  getDailyBriefing,
  getProactiveTradeAlert,
  getPerformanceAlert,
} from './conversationFlows';
import type { QuickReply } from './types';

// P0 FIX: Parse onboarding text input to extract deposit amounts
function parseOnboardingAmount(text: string): number | null {
  const cleaned = text.replace(/[$,]/g, '').trim();
  const num = parseFloat(cleaned);
  return !isNaN(num) && num > 0 ? num : null;
}

export function useChatEngine() {
  const chat = useChat();
  const proactiveTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const lastUserActivity = useRef(Date.now());

  // Store stable refs to chat functions so callbacks don't go stale
  const chatRef = useRef(chat);
  chatRef.current = chat;

  // Initialize conversation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      const c = chatRef.current;
      if (c.isOnboardingComplete()) {
        c.queueAIResponses(getDailyBriefing());
      } else {
        c.queueAIResponses(getOnboardingWelcome());
      }
    }, 500);

    return () => {
      clearTimeout(timer);
      proactiveTimers.current.forEach(clearTimeout);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const startProactiveTimers = useCallback(() => {
    proactiveTimers.current.forEach(clearTimeout);
    proactiveTimers.current = [];

    // P1 FIX: Increased idle thresholds so alerts don't interrupt users mid-thought
    const tradeTimer = setTimeout(() => {
      const idle = Date.now() - lastUserActivity.current;
      if (idle >= 30000) {
        chatRef.current.queueAIResponses(getProactiveTradeAlert());
      }
    }, 35000);
    proactiveTimers.current.push(tradeTimer);

    const perfTimer = setTimeout(() => {
      const idle = Date.now() - lastUserActivity.current;
      if (idle >= 50000) {
        chatRef.current.queueAIResponses(getPerformanceAlert());
      }
    }, 60000);
    proactiveTimers.current.push(perfTimer);
  }, []);

  const handleUserMessage = useCallback((text: string) => {
    lastUserActivity.current = Date.now();
    const c = chatRef.current;
    c.addUserMessage(text);

    // P0 FIX: During onboarding, parse text input instead of silently ignoring
    if (!c.isOnboardingComplete()) {
      const step = c.getOnboardingStep();

      // Try to parse deposit amount during deposit step
      if (step === 'welcome' || step === 'deposit') {
        const amount = parseOnboardingAmount(text);
        if (amount) {
          c.updateContext({ selectedDeposit: amount });
          c.setOnboardingStep('themes');
          c.queueAIResponses([
            { text: `$${amount.toLocaleString()} — great choice!`, delay: 600 },
            ...getOnboardingThemes(),
          ]);
          return;
        }
      }

      // Try to parse risk level during risk step
      if (step === 'risk') {
        const lower = text.toLowerCase().trim();
        const riskMatch = lower.match(/\b(conservative|balanced|aggressive)\b/);
        if (riskMatch) {
          const level = riskMatch[1];
          c.updateContext({ selectedRisk: level });
          c.setOnboardingStep('deploying');
          c.queueAIResponses(getOnboardingComplete());
          setTimeout(() => {
            chatRef.current.completeOnboarding();
            startProactiveTimers();
          }, 5000);
          return;
        }
      }

      // Fallback: guide the user to use the interactive elements
      c.queueAIResponses([
        {
          text: 'Please tap one of the options above to continue setup. You can type freely once we\'re done!',
          delay: 600,
        },
      ]);
      return;
    }

    const ctx = c.getContext();
    const intentResult = resolveIntent(text, ctx);

    // Reset tradeIndex when starting a fresh trades request (not "show more")
    if (intentResult.intent === 'trades' && !text.toLowerCase().includes('more')) {
      c.updateContext({ tradeIndex: 0 });
    }

    // P1: Handle "approve all" batch action
    if (intentResult.intent === 'approve' && text.toLowerCase().includes('all')) {
      const pending = tradeLeads.filter(t => t.status === 'pending');
      if (pending.length > 0) {
        // Actually mark each trade as approved
        pending.forEach(trade => markTradeApproved(trade.id));

        const responses = [
          { text: `Executing all ${pending.length} pending trades...`, delay: 1200 },
          ...pending.map((trade, i) => ({
            card: { type: 'trade-confirmation' as const, props: { trade: { ...trade } } },
            delay: 600 + i * 200,
          })),
          {
            text: `Done! All ${pending.length} trades executed. I'll keep monitoring your positions.`,
            quickReplies: [
              { label: 'Portfolio', value: 'Show my portfolio' },
              { label: 'Performance', value: 'Show performance chart' },
            ],
            delay: 400,
          },
        ];
        c.updateContext({ lastIntent: 'approve', pendingTradeId: undefined, tradeIndex: pending.length });
        c.queueAIResponses(responses);
        startProactiveTimers();
        return;
      }
    }

    // P1: Handle parameterized settings (e.g. "set risk to aggressive")
    if (intentResult.intent === 'settings' && intentResult.params?.riskLevel) {
      const level = intentResult.params.riskLevel as string;
      localStorage.setItem('atlas_settings_risk', level.charAt(0).toUpperCase() + level.slice(1));
      c.updateContext({ selectedRisk: level, lastIntent: intentResult.intent });
    }

    // Mark trade as approved when user types "approve", "yes", etc.
    if (intentResult.intent === 'approve') {
      const ctx2 = c.getContext();
      if (ctx2.pendingTradeId) {
        markTradeApproved(ctx2.pendingTradeId);
      } else if (intentResult.params?.ticker) {
        const byTicker = tradeLeads.find(t => t.ticker === intentResult.params?.ticker && t.status === 'pending');
        if (byTicker) markTradeApproved(byTicker.id);
      }
    }

    const updatedCtx = c.getContext();
    const responses = generateResponse(intentResult.intent, updatedCtx, intentResult.params);

    // After generating trades response, track the pending trade and advance index
    if (intentResult.intent === 'trades') {
      const pending = tradeLeads.filter(t => t.status === 'pending');
      const idx = updatedCtx.tradeIndex ?? 0;
      if (pending[idx]) {
        c.updateContext({ lastIntent: intentResult.intent, pendingTradeId: pending[idx].id, tradeIndex: idx + 1 });
      } else {
        c.updateContext({ lastIntent: intentResult.intent });
      }
    } else {
      c.updateContext({ lastIntent: intentResult.intent });
    }

    c.queueAIResponses(responses);

    startProactiveTimers();
  }, [startProactiveTimers]);

  const handleQuickReply = useCallback((reply: QuickReply) => {
    handleUserMessage(reply.value);
  }, [handleUserMessage]);

  const handleCardAction = useCallback((action: string, data?: unknown) => {
    lastUserActivity.current = Date.now();
    const c = chatRef.current;

    switch (action) {
      case 'deposit': {
        const amount = data as number;
        c.addUserMessage(`$${amount.toLocaleString()}`);

        const step = c.getOnboardingStep();
        if (step === 'welcome' || step === 'deposit') {
          c.updateContext({ selectedDeposit: amount });
          c.setOnboardingStep('themes');
          c.queueAIResponses(getOnboardingThemes());
        } else {
          c.queueAIResponses([
            { text: `Depositing $${amount.toLocaleString()}... Transfer initiated! It should arrive in 1-2 business days.`, delay: 1200 },
            {
              quickReplies: [
                { label: 'Portfolio', value: 'Show my portfolio' },
                { label: 'Trade ideas', value: 'Show trade suggestions' },
              ],
              delay: 400,
            },
          ]);
        }
        break;
      }

      case 'themes-selected': {
        const themes = data as string[];
        c.addUserMessage(`Selected ${themes.length} theme${themes.length > 1 ? 's' : ''}`);
        c.updateContext({ selectedThemes: themes });
        c.setOnboardingStep('risk');
        c.queueAIResponses(getOnboardingRisk());
        break;
      }

      case 'risk-selected': {
        const level = data as string;
        c.addUserMessage(level.charAt(0).toUpperCase() + level.slice(1));
        c.updateContext({ selectedRisk: level });
        c.setOnboardingStep('deploying');
        c.queueAIResponses(getOnboardingComplete());

        setTimeout(() => {
          chatRef.current.completeOnboarding();
          startProactiveTimers();
        }, 5000);
        break;
      }

      case 'approve-trade': {
        const trade = data as Record<string, unknown>;
        // Actually mark this trade as approved
        if (trade?.id) markTradeApproved(trade.id as string);
        c.addUserMessage(`Approve ${(trade?.ticker as string) || 'trade'}`);
        c.updateContext({ lastIntent: 'approve', pendingTradeId: undefined });
        const remaining = tradeLeads.filter(t => t.status === 'pending').length - (c.getContext().tradeIndex ?? 0);
        c.queueAIResponses([
          { text: 'Executing trade now...', delay: 1200 },
          { card: { type: 'trade-confirmation', props: { trade } }, delay: 800 },
          {
            text: remaining > 0
              ? `Done! I\'ll keep monitoring this position. I have ${remaining} more idea${remaining > 1 ? 's' : ''} if you're interested.`
              : 'Done! I\'ll keep monitoring this position.',
            quickReplies: remaining > 0
              ? [
                  { label: 'Next trade', value: 'Show more trade ideas' },
                  { label: 'Approve all', value: 'Approve all trades' },
                  { label: 'Portfolio', value: 'Show my portfolio' },
                ]
              : [
                  { label: 'Portfolio', value: 'Show my portfolio' },
                  { label: 'Performance', value: 'Show performance chart' },
                ],
            delay: 400,
          },
        ]);
        break;
      }

      case 'reject-trade': {
        c.addUserMessage('Skip this one');
        c.updateContext({ pendingTradeId: undefined });
        const remainingAfterSkip = tradeLeads.filter(t => t.status === 'pending').length - (c.getContext().tradeIndex ?? 0);
        c.queueAIResponses([
          {
            text: remainingAfterSkip > 0
              ? `No problem. I have ${remainingAfterSkip} more idea${remainingAfterSkip > 1 ? 's' : ''} — want to see the next one?`
              : 'No problem. I\'ll keep looking for better opportunities.',
            quickReplies: remainingAfterSkip > 0
              ? [
                  { label: 'Next trade', value: 'Show more trade ideas' },
                  { label: 'Approve all', value: 'Approve all trades' },
                  { label: 'Portfolio', value: 'Show my portfolio' },
                ]
              : [
                  { label: 'Portfolio', value: 'Show my portfolio' },
                  { label: 'Performance', value: 'Show performance chart' },
                ],
            delay: 800,
          },
        ]);
        break;
      }

      case 'view-reasoning': {
        const tradeForReasoning = data as Record<string, unknown>;
        const ticker = (tradeForReasoning?.ticker as string) || 'trade';
        c.queueAIResponses([
          { text: `Here's my full decision reference for ${ticker}:`, delay: 800 },
          { card: { type: 'decision-reference', props: { trade: tradeForReasoning } }, delay: 600 },
          {
            quickReplies: [
              { label: 'How AI works', value: 'How does AI methodology work' },
              { label: 'Back to trades', value: 'Show trade suggestions' },
              { label: 'Portfolio', value: 'Show my portfolio' },
            ],
            delay: 200,
          },
        ]);
        break;
      }

      case 'deposit-start':
        c.queueAIResponses([
          { text: 'How much would you like to add?', delay: 600 },
          { card: { type: 'deposit' }, delay: 400 },
        ]);
        break;

      case 'smart-default': {
        // P1: One-click setup with recommended defaults
        c.addUserMessage('Set it up for me');
        c.updateContext({
          selectedDeposit: 1000,
          selectedThemes: ['ai', 'tech', 'healthcare'],
          selectedRisk: 'balanced',
        });
        c.setOnboardingStep('deploying');
        c.queueAIResponses([
          { text: 'Great choice! I\'ll set you up with a recommended plan:', delay: 800 },
          { text: '$1,000 starting investment • AI & Tech, Tech Giants, Healthcare themes • Balanced risk', delay: 600 },
          ...getOnboardingComplete(),
        ]);
        setTimeout(() => {
          chatRef.current.completeOnboarding();
          startProactiveTimers();
        }, 6500);
        break;
      }
    }
  }, [startProactiveTimers]);

  return {
    messages: chat.messages,
    isTyping: chat.isTyping,
    quickReplies: chat.quickReplies,
    scrollRef: chat.scrollRef,
    handleUserMessage,
    handleQuickReply,
    handleCardAction,
  };
}
