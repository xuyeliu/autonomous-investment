import type { ReactNode } from 'react';

// Card types that can be embedded in chat messages
export type CardType =
  | 'welcome'
  | 'daily-briefing'
  | 'portfolio'
  | 'performance-chart'
  | 'allocation'
  | 'trade-proposal'
  | 'trade-confirmation'
  | 'decision-reference'
  | 'ai-reasoning'
  | 'deposit'
  | 'theme-picker'
  | 'risk-picker'
  | 'activity'
  | 'wallet'
  | 'settings';

export interface CardData {
  type: CardType;
  props?: Record<string, unknown>;
}

export interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text?: string;
  card?: CardData;
  timestamp: number;
  quickReplies?: QuickReply[];
}

export interface QuickReply {
  label: string;
  value: string;
}

export interface ChatState {
  messages: ChatMessage[];
  isTyping: boolean;
  quickReplies: QuickReply[];
  onboardingComplete: boolean;
  onboardingStep: OnboardingStep;
  context: ChatContext;
}

export type OnboardingStep =
  | 'welcome'
  | 'deposit'
  | 'themes'
  | 'risk'
  | 'deploying'
  | 'complete';

export interface ChatContext {
  lastIntent?: string;
  pendingTradeId?: string;
  tradeIndex?: number;
  selectedDeposit?: number;
  selectedThemes?: string[];
  selectedRisk?: string;
  autoTrade?: boolean;
}

export type Intent =
  | 'portfolio'
  | 'performance'
  | 'allocation'
  | 'trades'
  | 'deposit'
  | 'withdraw'
  | 'activity'
  | 'wallet'
  | 'settings'
  | 'approve'
  | 'reject'
  | 'reasoning'
  | 'help'
  | 'greeting'
  | 'fallback';

export interface IntentResult {
  intent: Intent;
  confidence: number;
  params?: Record<string, unknown>;
}

export interface AIResponse {
  text?: string;
  card?: CardData;
  quickReplies?: QuickReply[];
  delay?: number;
}
