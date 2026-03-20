import type { AIResponse } from './types';
import { portfolioSummary, tradeLeads } from '../data/mock';

export function getOnboardingWelcome(): AIResponse[] {
  return [
    {
      text: 'Hey there! I\'m your AI wealth manager at Autonomous Investment.',
      delay: 1000,
    },
    {
      card: { type: 'welcome' },
      delay: 800,
    },
    {
      text: 'Let\'s get you set up. How much would you like to start investing?',
      card: { type: 'deposit' },
      delay: 1200,
    },
  ];
}

export function getOnboardingThemes(): AIResponse[] {
  return [
    {
      text: 'Great choice! Now, what sectors interest you? Pick as many as you like.',
      card: { type: 'theme-picker' },
      delay: 1000,
    },
  ];
}

export function getOnboardingRisk(): AIResponse[] {
  return [
    {
      text: 'Almost done! What\'s your risk tolerance?',
      card: { type: 'risk-picker' },
      delay: 1000,
    },
  ];
}

export function getOnboardingComplete(): AIResponse[] {
  return [
    {
      text: 'Deploying your portfolio now...',
      delay: 1500,
    },
    {
      card: { type: 'portfolio' },
      delay: 1200,
    },
    {
      text: 'You\'re all set! I\'ll message you when I spot opportunities or when something needs your attention. I\'ve got this.\n\nRemember: all investments carry risk. Past performance doesn\'t guarantee future results.',
      quickReplies: [
        { label: 'Show portfolio', value: 'Show my portfolio' },
        { label: 'Trade ideas', value: 'Show trade suggestions' },
        { label: 'How it works', value: 'What can you do?' },
      ],
      delay: 800,
    },
  ];
}

export function getDailyBriefing(): AIResponse[] {
  return [
    {
      text: 'Good morning! Here\'s your daily briefing.',
      delay: 600,
    },
    {
      card: { type: 'daily-briefing' },
      delay: 800,
    },
    {
      text: `Your portfolio is at $${portfolioSummary.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}, up ${portfolioSummary.dayChangePct}% today. I made ${4} trades this week with a ${72}% win rate.`,
      quickReplies: [
        { label: 'Portfolio details', value: 'Show my portfolio' },
        { label: 'Trade ideas', value: 'Show trade suggestions' },
        { label: 'Performance', value: 'Show performance chart' },
      ],
      delay: 1000,
    },
  ];
}

export function getProactiveTradeAlert(): AIResponse[] {
  const trade = tradeLeads.find(t => t.status === 'pending');
  if (!trade) return [];

  return [
    {
      text: `I just spotted an opportunity — ${trade.ticker} looks interesting right now.`,
      delay: 800,
    },
    {
      card: { type: 'trade-proposal', props: { trade: { ...trade } } },
      delay: 600,
    },
  ];
}

export function getPerformanceAlert(): AIResponse[] {
  return [
    {
      text: `Your portfolio just hit a new high of $${portfolioSummary.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}! You're up ${portfolioSummary.totalGainPct}% all time.`,
      quickReplies: [
        { label: 'See details', value: 'Show my portfolio' },
        { label: 'Performance chart', value: 'Show performance chart' },
      ],
      delay: 800,
    },
  ];
}
