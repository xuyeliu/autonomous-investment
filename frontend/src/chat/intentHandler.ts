import type { Intent, IntentResult, AIResponse, ChatContext } from './types';
import { tradeLeads, portfolioSummary } from '../data/mock';

interface IntentPattern {
  intent: Intent;
  keywords: string[];
}

const patterns: IntentPattern[] = [
  { intent: 'portfolio', keywords: ['portfolio', 'balance', 'how am i doing', 'how much do i', 'my money', 'net worth', 'holdings', 'investments', 'my stocks', 'my shares', 'show me my'] },
  { intent: 'performance', keywords: ['chart', 'performance', 'graph', 'trend', 'returns', 'growth', 'market today', 'how much have i made', 'gains', 'profit', 'earned', 'p&l', 'how\'s the market'] },
  { intent: 'allocation', keywords: ['allocation', 'sectors', 'breakdown', 'diversif', 'split', 'pie'] },
  { intent: 'trades', keywords: ['trade', 'suggestion', 'ideas', 'opportunities', 'recommend', 'picks', 'stocks', 'should i buy', 'what to buy', 'investment idea', 'what do you suggest', 'what should i'] },
  { intent: 'deposit', keywords: ['deposit', 'add money', 'invest more', 'fund', 'top up', 'add funds', 'put in money'] },
  { intent: 'withdraw', keywords: ['withdraw', 'cash out', 'take out', 'pull out'] },
  { intent: 'activity', keywords: ['activity', 'history', 'recent', 'transactions', 'activity log'] },
  { intent: 'wallet', keywords: ['wallet', 'funds', 'cash', 'available'] },
  { intent: 'settings', keywords: ['settings', 'preferences', 'config', 'options', 'auto-trade', 'notifications', 'change risk', 'set risk', 'risk level', 'risk to'] },
  { intent: 'reasoning', keywords: ['how do you decide', 'how does ai', 'reasoning', 'reference', 'why this', 'explain decision', 'how it works', 'decision process', 'analysis', 'data source', 'how do you work', 'methodology', 'show reasoning', 'view reasoning'] },
  { intent: 'approve', keywords: ['yes', 'approve', 'do it', 'go ahead', 'confirm', 'execute', 'let\'s go', 'sure', 'sounds good', 'looks good', 'buy it', 'sell it'] },
  { intent: 'reject', keywords: ['no', 'skip', 'reject', 'pass', 'nah', 'not now', 'cancel', 'no thanks', 'nevermind', 'never mind'] },
  { intent: 'greeting', keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'what\'s up', 'sup'] },
  { intent: 'help', keywords: ['help', 'what can you do', 'capabilities', 'features', 'commands'] },
];

const intentLabels: Record<string, string> = {
  portfolio: 'Show my portfolio',
  performance: 'Show performance chart',
  trades: 'Show trade suggestions',
  deposit: 'Add money',
  settings: 'Show settings',
  activity: 'Show activity',
  wallet: 'Show wallet',
  reasoning: 'AI reasoning',
};

function extractParams(text: string, intent: Intent): Record<string, unknown> {
  const lower = text.toLowerCase().trim();
  const params: Record<string, unknown> = {};

  if (intent === 'deposit') {
    const amountMatch = lower.match(/\$?([\d,]+(?:\.\d{1,2})?)/);
    if (amountMatch) {
      const amount = parseFloat(amountMatch[1].replace(/,/g, ''));
      if (amount > 0) params.amount = amount;
    }
  }

  if (intent === 'settings') {
    const riskMatch = lower.match(/(?:risk\s+(?:to\s+)?|change\s+(?:to\s+)?|set\s+(?:to\s+)?)(conservative|balanced|aggressive)/);
    if (riskMatch) {
      params.riskLevel = riskMatch[1];
    }
  }

  if (intent === 'approve') {
    const tickerMatch = text.match(/(?:approve|execute|buy|sell)\s+(?:the\s+)?([A-Z]{2,5})/i);
    if (tickerMatch) {
      params.ticker = tickerMatch[1].toUpperCase();
    }
  }

  return params;
}

function fuzzyMatch(text: string): string[] {
  const hints: { label: string; score: number }[] = [];
  const words = text.split(/\s+/).filter(w => w.length >= 3);

  for (const pattern of patterns) {
    if (['approve', 'reject', 'greeting', 'help', 'fallback'].includes(pattern.intent)) continue;
    const label = intentLabels[pattern.intent];
    if (!label) continue;

    let score = 0;
    for (const word of words) {
      for (const keyword of pattern.keywords) {
        if (keyword.includes(word) || word.includes(keyword.slice(0, Math.min(4, keyword.length)))) {
          score++;
        }
      }
    }
    if (score > 0) {
      hints.push({ label, score });
    }
  }

  return hints
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(h => h.label);
}

export function resolveIntent(text: string, _context: ChatContext): IntentResult {
  const lower = text.toLowerCase().trim();

  for (const pattern of patterns) {
    for (const keyword of pattern.keywords) {
      if (lower.includes(keyword)) {
        const params = extractParams(text, pattern.intent);
        return { intent: pattern.intent, confidence: 0.9, params };
      }
    }
  }

  const suggestions = fuzzyMatch(lower);
  return { intent: 'fallback', confidence: 0.3, params: { suggestions } };
}

export function generateResponse(intent: Intent, context: ChatContext, params?: Record<string, unknown>): AIResponse[] {
  switch (intent) {
    case 'portfolio':
      return [
        { text: 'Here\'s your portfolio overview:', delay: 800 },
        { card: { type: 'portfolio' }, delay: 400 },
        {
          quickReplies: [
            { label: 'Performance chart', value: 'Show performance chart' },
            { label: 'Allocation', value: 'Show allocation' },
            { label: 'Trade ideas', value: 'Show trade suggestions' },
          ],
          delay: 200,
        },
      ];

    case 'performance':
      return [
        { text: 'Here\'s how your portfolio has been performing:', delay: 800 },
        { card: { type: 'performance-chart' }, delay: 400 },
        {
          quickReplies: [
            { label: 'Portfolio', value: 'Show my portfolio' },
            { label: 'Trades', value: 'Show trade suggestions' },
          ],
          delay: 200,
        },
      ];

    case 'allocation':
      return [
        { text: 'Here\'s your current allocation breakdown:', delay: 800 },
        { card: { type: 'allocation' }, delay: 400 },
        {
          quickReplies: [
            { label: 'Portfolio', value: 'Show my portfolio' },
            { label: 'Performance', value: 'Show performance' },
          ],
          delay: 200,
        },
      ];

    case 'trades': {
      const pending = tradeLeads.filter(t => t.status === 'pending');
      const idx = context.tradeIndex ?? 0;
      const currentTrade = pending[idx];

      if (!currentTrade) {
        return [
          {
            text: 'You\'ve seen all my current trade ideas! I\'ll let you know when I spot new opportunities.',
            quickReplies: [
              { label: 'Portfolio', value: 'Show my portfolio' },
              { label: 'Performance', value: 'Show performance chart' },
            ],
            delay: 800,
          },
        ];
      }

      const remaining = pending.length - idx - 1;
      const responses: AIResponse[] = [
        { text: idx === 0 ? `I've got ${pending.length} trade ideas for you. Here's my top pick:` : `Here's the next one:`, delay: 1000 },
        {
          card: { type: 'trade-proposal', props: { trade: { ...currentTrade } } },
          delay: 600,
        },
      ];
      if (remaining > 0) {
        responses.push({
          text: `I have ${remaining} more suggestion${remaining > 1 ? 's' : ''} when you're ready.`,
          quickReplies: [
            { label: 'Next trade', value: 'Show more trade ideas' },
            { label: 'Approve all', value: 'Approve all trades' },
            { label: 'Portfolio', value: 'Show my portfolio' },
          ],
          delay: 400,
        });
      }
      return responses;
    }

    case 'deposit': {
      // If user specified an amount directly (e.g. "deposit $2000"), confirm it
      if (params?.amount) {
        const amount = params.amount as number;
        return [
          {
            text: `Got it — depositing $${amount.toLocaleString('en-US', { minimumFractionDigits: 0 })}. Confirm below:`,
            card: { type: 'deposit', props: { prefillAmount: amount } },
            delay: 800,
          },
        ];
      }
      return [
        { text: 'How much would you like to add?', delay: 800 },
        { card: { type: 'deposit' }, delay: 400 },
      ];
    }

    case 'withdraw':
      return [
        {
          text: `You have $${portfolioSummary.cashBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })} in available cash. Withdrawals typically take 1-3 business days.`,
          delay: 1000,
          quickReplies: [
            { label: 'Withdraw all', value: 'Withdraw all cash' },
            { label: 'Never mind', value: 'Cancel' },
          ],
        },
      ];

    case 'activity':
      return [
        { text: 'Here\'s your recent activity:', delay: 800 },
        { card: { type: 'activity' }, delay: 400 },
        {
          quickReplies: [
            { label: 'Portfolio', value: 'Show my portfolio' },
            { label: 'Wallet', value: 'Show wallet' },
          ],
          delay: 200,
        },
      ];

    case 'wallet':
      return [
        { text: 'Here\'s your wallet:', delay: 800 },
        { card: { type: 'wallet' }, delay: 400 },
      ];

    case 'settings': {
      // If user specified a risk level (e.g. "set risk to aggressive"), acknowledge + show settings
      if (params?.riskLevel) {
        const level = params.riskLevel as string;
        const display = level.charAt(0).toUpperCase() + level.slice(1);
        return [
          {
            text: `Done! Risk level updated to **${display}**. I'll adjust future trade suggestions to match.`,
            card: { type: 'settings' },
            delay: 800,
          },
          {
            quickReplies: [
              { label: 'Portfolio', value: 'Show my portfolio' },
              { label: 'Trade ideas', value: 'Show trade suggestions' },
            ],
            delay: 200,
          },
        ];
      }
      return [
        { text: 'Here are your current settings:', delay: 800 },
        { card: { type: 'settings' }, delay: 400 },
      ];
    }

    case 'reasoning': {
      if (context.lastIntent === 'trades' || context.pendingTradeId) {
        const trade = tradeLeads.find(t => t.id === context.pendingTradeId) || tradeLeads.find(t => t.status === 'pending');
        if (trade) {
          return [
            { text: `Here's my full analysis behind the ${trade.ticker} recommendation:`, delay: 800 },
            { card: { type: 'decision-reference', props: { trade: { ...trade } } }, delay: 600 },
            {
              quickReplies: [
                { label: 'How AI works', value: 'Show AI reasoning' },
                { label: 'Back to trades', value: 'Show trade suggestions' },
                { label: 'Portfolio', value: 'Show my portfolio' },
              ],
              delay: 200,
            },
          ];
        }
      }
      return [
        { text: 'Here\'s how I analyze and make investment decisions:', delay: 800 },
        { card: { type: 'ai-reasoning' }, delay: 600 },
        {
          quickReplies: [
            { label: 'See a trade example', value: 'Show trade suggestions' },
            { label: 'Portfolio', value: 'Show my portfolio' },
            { label: 'Performance', value: 'Show performance chart' },
          ],
          delay: 200,
        },
      ];
    }

    case 'approve': {
      if (context.lastIntent === 'trades' || context.pendingTradeId) {
        // P0 FIX: Find the correct trade using context.pendingTradeId, not tradeLeads[0]
        let trade = context.pendingTradeId
          ? tradeLeads.find(t => t.id === context.pendingTradeId)
          : undefined;

        // If user specified a ticker (e.g. "approve NVDA"), find that trade
        if (params?.ticker) {
          const byTicker = tradeLeads.find(t => t.ticker === params.ticker && t.status === 'pending');
          if (byTicker) trade = byTicker;
        }

        // Fall back to first pending trade if nothing matched
        if (!trade) trade = tradeLeads.find(t => t.status === 'pending');
        if (!trade) trade = tradeLeads[0];

        return [
          { text: `Executing ${trade.ticker} trade now...`, delay: 1200 },
          { card: { type: 'trade-confirmation', props: { trade: { ...trade } } }, delay: 800 },
          {
            text: 'Done! I\'ll keep monitoring and let you know if anything changes.',
            quickReplies: [
              { label: 'More trades', value: 'Show trade suggestions' },
              { label: 'Portfolio', value: 'Show my portfolio' },
            ],
            delay: 400,
          },
        ];
      }
      return [
        {
          text: 'I\'m not sure what to approve. Want me to show you some trade ideas?',
          quickReplies: [
            { label: 'Yes, show trades', value: 'Show trade suggestions' },
            { label: 'Show portfolio', value: 'Show my portfolio' },
          ],
          delay: 800,
        },
      ];
    }

    case 'reject':
      if (context.lastIntent === 'trades' || context.pendingTradeId) {
        return [
          {
            text: 'No problem, I\'ll skip that one. I\'ll keep looking for better opportunities.',
            quickReplies: [
              { label: 'More trades', value: 'Show trade suggestions' },
              { label: 'Portfolio', value: 'Show my portfolio' },
            ],
            delay: 800,
          },
        ];
      }
      return [
        { text: 'Alright, let me know if you need anything.', delay: 600 },
      ];

    case 'greeting':
      return [
        {
          text: `Hey! Your portfolio is at $${portfolioSummary.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}, up ${portfolioSummary.dayChangePct}% today. What would you like to look at?`,
          quickReplies: [
            { label: 'Portfolio', value: 'Show my portfolio' },
            { label: 'Trades', value: 'Show trade suggestions' },
            { label: 'Performance', value: 'Show performance chart' },
          ],
          delay: 1000,
        },
      ];

    case 'help':
      return [
        {
          text: 'Here\'s what I can help you with:\n\n• Show your portfolio & performance\n• Suggest & execute trades\n• Explain how I make decisions\n• Manage deposits & withdrawals\n• Track activity & history\n• Adjust settings & risk level\n\nJust ask, or tap a quick reply below!',
          quickReplies: [
            { label: 'Portfolio', value: 'Show my portfolio' },
            { label: 'How AI decides', value: 'Show AI reasoning' },
            { label: 'Trades', value: 'Show trade suggestions' },
            { label: 'Settings', value: 'Show settings' },
          ],
          delay: 1000,
        },
      ];

    case 'fallback':
    default: {
      // P2: Smarter fallback with fuzzy-matched suggestions
      const suggestions = (params?.suggestions as string[]) || [];
      if (suggestions.length > 0) {
        return [
          {
            text: `I'm not sure I understood that. Did you mean one of these?`,
            quickReplies: [
              ...suggestions.map(s => ({ label: s, value: s })),
              { label: 'Help', value: 'What can you do?' },
            ],
            delay: 800,
          },
        ];
      }
      return [
        {
          text: 'I\'m not sure I understood that. Here are some things I can help with:',
          quickReplies: [
            { label: 'Portfolio', value: 'Show my portfolio' },
            { label: 'Trades', value: 'Show trade suggestions' },
            { label: 'Performance', value: 'Show performance chart' },
            { label: 'Help', value: 'What can you do?' },
          ],
          delay: 800,
        },
      ];
    }
  }
}
