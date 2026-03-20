// Portfolio summary
export const portfolioSummary = {
  totalValue: 12847.63,
  totalGain: 2847.63,
  totalGainPct: 28.48,
  dayChange: 156.42,
  dayChangePct: 1.23,
  cashBalance: 2150.00,
  investedBalance: 10697.63,
  initialDeposit: 10000.00,
};

// Performance chart data - 1 year of weekly data points
export const performanceData = generatePerformanceData();

function generatePerformanceData() {
  const data = [];
  let value = 10000;
  const now = new Date();
  for (let i = 365; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const change = (Math.random() - 0.45) * 100;
    value = Math.max(value + change, 8000);
    data.push({
      date: date.toISOString().split('T')[0],
      value: Math.round(value * 100) / 100,
    });
  }
  return data;
}

// Allocation data
export const allocationData = [
  { name: 'AI & Tech', value: 35, color: '#00D4AA' },
  { name: 'Healthcare', value: 20, color: '#0984E3' },
  { name: 'Energy', value: 15, color: '#FFD93D' },
  { name: 'Consumer', value: 15, color: '#A29BFE' },
  { name: 'Green', value: 10, color: '#55EFC4' },
  { name: 'Cash', value: 5, color: '#636E72' },
];

// Trade leads
export const tradeLeads = [
  {
    id: '1',
    action: 'buy' as const,
    ticker: 'NVDA',
    name: 'NVIDIA Corporation',
    rationale: 'Strong AI chip demand continues. Revenue growth exceeding expectations with data center segment up 154% YoY.',
    confidence: 92,
    potentialReturn: '+8.5%',
    timeframe: '2-4 weeks',
    status: 'pending' as const,
    reasoning: {
      dataSources: [
        { name: 'SEC 10-Q Filing', type: 'fundamental' as const, detail: 'Q4 2025 quarterly report — data center revenue $18.4B (+154% YoY)' },
        { name: 'Bloomberg Terminal', type: 'market' as const, detail: 'Institutional buying volume up 32% over 10-day average' },
        { name: 'Reuters News Feed', type: 'news' as const, detail: '14 positive analyst revisions in past 7 days' },
        { name: 'Technical Analysis', type: 'technical' as const, detail: 'RSI at 62, MACD bullish crossover, above 50-day SMA' },
      ],
      signals: [
        { label: 'Revenue Growth', impact: 'high' as const, description: 'Data center segment growing 154% YoY, beating consensus by 12%' },
        { label: 'Institutional Flow', impact: 'high' as const, description: 'Net institutional inflows of $2.1B in last 5 trading days' },
        { label: 'AI Capex Cycle', impact: 'medium' as const, description: 'Hyperscaler capex guidance up 40% — direct demand driver' },
        { label: 'Valuation Risk', impact: 'low' as const, description: 'Forward P/E of 35x is elevated but justified by growth trajectory' },
      ],
      steps: [
        'Screened 4,200+ equities for momentum + fundamental strength',
        'Identified NVDA via sector rotation model (AI/semiconductor overweight)',
        'Cross-referenced earnings surprise history (beat 8 of last 8 quarters)',
        'Validated with technical signals: bullish MACD crossover + volume confirmation',
        'Risk-adjusted position sizing: 5% of portfolio, within max trade limit',
      ],
      confidenceBreakdown: {
        fundamental: 95,
        technical: 88,
        sentiment: 91,
        risk: 85,
      },
    },
  },
  {
    id: '2',
    action: 'buy' as const,
    ticker: 'MSFT',
    name: 'Microsoft Corporation',
    rationale: 'Azure AI services adoption accelerating. Cloud revenue growing faster than market expects.',
    confidence: 87,
    potentialReturn: '+5.2%',
    timeframe: '3-6 weeks',
    status: 'pending' as const,
    reasoning: {
      dataSources: [
        { name: 'SEC 10-K Filing', type: 'fundamental' as const, detail: 'FY2025 Azure revenue grew 29%, Copilot adoption at 60% of enterprise' },
        { name: 'Earnings Call Transcript', type: 'fundamental' as const, detail: 'CEO highlighted $10B+ AI annual run rate' },
        { name: 'Social Sentiment (X/Reddit)', type: 'news' as const, detail: 'Developer sentiment score 78/100, trending positive on Copilot' },
        { name: 'Technical Analysis', type: 'technical' as const, detail: 'Consolidating near ATH, Bollinger Band squeeze signals breakout' },
      ],
      signals: [
        { label: 'Cloud Growth', impact: 'high' as const, description: 'Azure growing 29%, outpacing AWS (17%) and GCP (22%)' },
        { label: 'AI Monetization', impact: 'high' as const, description: 'Copilot and AI services generating $10B+ annual run rate' },
        { label: 'Margin Expansion', impact: 'medium' as const, description: 'Operating margin expanded 200bps to 44.6%' },
        { label: 'Valuation', impact: 'low' as const, description: 'P/E of 33x is in line with 5-year average for growth profile' },
      ],
      steps: [
        'Flagged via cloud/AI sector momentum screen',
        'Analyzed Azure growth vs. peer cloud platforms',
        'Reviewed Copilot adoption metrics from earnings call',
        'Confirmed technical setup: consolidation pattern near all-time highs',
        'Position sized at 4% of portfolio based on moderate volatility',
      ],
      confidenceBreakdown: {
        fundamental: 90,
        technical: 82,
        sentiment: 85,
        risk: 88,
      },
    },
  },
  {
    id: '3',
    action: 'sell' as const,
    ticker: 'TSLA',
    name: 'Tesla Inc',
    rationale: 'Delivery numbers below guidance. Increasing competition in EV market may pressure margins.',
    confidence: 74,
    potentialReturn: '-3.8%',
    timeframe: '1-2 weeks',
    status: 'pending' as const,
    reasoning: {
      dataSources: [
        { name: 'Delivery Report (IR)', type: 'fundamental' as const, detail: 'Q4 deliveries 480K vs 510K guidance — 5.9% miss' },
        { name: 'China Auto Association', type: 'market' as const, detail: 'BYD outsold Tesla 3:1 in China market for Q4' },
        { name: 'Options Flow Data', type: 'technical' as const, detail: 'Put/call ratio spiked to 1.8, bearish positioning increasing' },
        { name: 'Analyst Reports', type: 'news' as const, detail: '6 downgrades and 4 price target cuts in past 14 days' },
      ],
      signals: [
        { label: 'Delivery Miss', impact: 'high' as const, description: 'Q4 deliveries missed guidance by 5.9%, worst miss in 6 quarters' },
        { label: 'Competition', impact: 'high' as const, description: 'Market share declining in China and Europe, BYD gaining rapidly' },
        { label: 'Margin Pressure', impact: 'medium' as const, description: 'Gross margin at 17.6%, down from 25% two years ago' },
        { label: 'Analyst Sentiment', impact: 'medium' as const, description: '6 downgrades in 14 days, consensus shifting bearish' },
      ],
      steps: [
        'Delivery miss triggered automatic review of TSLA position',
        'Compared delivery trend vs. guidance across last 4 quarters',
        'Analyzed competitive landscape: BYD, Rivian, and legacy OEM EV launches',
        'Confirmed bearish technical signals: below 20-day SMA, rising put/call ratio',
        'Recommend full exit to redeploy capital into higher-conviction positions',
      ],
      confidenceBreakdown: {
        fundamental: 78,
        technical: 72,
        sentiment: 68,
        risk: 76,
      },
    },
  },
  {
    id: '4',
    action: 'hold' as const,
    ticker: 'AAPL',
    name: 'Apple Inc',
    rationale: 'Stable earnings, iPhone cycle neutral. Waiting for AI integration announcements.',
    confidence: 81,
    potentialReturn: '+1.2%',
    timeframe: '4-8 weeks',
    status: 'approved' as const,
    reasoning: {
      dataSources: [
        { name: 'SEC 10-Q Filing', type: 'fundamental' as const, detail: 'Services revenue $24.2B (+14% YoY), iPhone flat at $46B' },
        { name: 'Supply Chain Checks', type: 'market' as const, detail: 'iPhone 17 component orders stable, no upside signal yet' },
        { name: 'Patent Filings (USPTO)', type: 'news' as const, detail: '12 new AI/ML-related patents filed in Q4, on-device LLM focus' },
        { name: 'Technical Analysis', type: 'technical' as const, detail: 'Trading in range $178-$195, low volatility, no directional bias' },
      ],
      signals: [
        { label: 'Services Growth', impact: 'medium' as const, description: 'Services revenue growing 14% YoY, strong margin contributor' },
        { label: 'iPhone Cycle', impact: 'low' as const, description: 'Current cycle neutral, next catalyst is AI-enabled iPhone 17' },
        { label: 'AI Catalyst Pending', impact: 'medium' as const, description: 'On-device AI features expected at WWDC — potential re-rating' },
        { label: 'Stable Technicals', impact: 'low' as const, description: 'Range-bound trading with low volatility, no urgency to act' },
      ],
      steps: [
        'Routine quarterly review of existing AAPL position',
        'Assessed iPhone cycle: flat, not deteriorating',
        'Reviewed AI patent activity as leading indicator of WWDC announcements',
        'Technical analysis shows no exit signal — hold for AI catalyst',
        'Maintain current 6% portfolio weight, reassess post-WWDC',
      ],
      confidenceBreakdown: {
        fundamental: 84,
        technical: 75,
        sentiment: 80,
        risk: 88,
      },
    },
  },
  {
    id: '5',
    action: 'buy' as const,
    ticker: 'GOOGL',
    name: 'Alphabet Inc',
    rationale: 'Gemini AI integration boosting search revenue. Cloud platform growth accelerating.',
    confidence: 85,
    potentialReturn: '+6.1%',
    timeframe: '2-5 weeks',
    status: 'pending' as const,
    reasoning: {
      dataSources: [
        { name: 'SEC 10-Q Filing', type: 'fundamental' as const, detail: 'Search revenue $50.8B (+12%), Cloud $9.4B (+28%)' },
        { name: 'SimilarWeb Traffic Data', type: 'market' as const, detail: 'Gemini web traffic up 180% QoQ, user engagement rising' },
        { name: 'Morgan Stanley Research', type: 'news' as const, detail: 'Upgraded to Overweight, $205 PT citing AI search monetization' },
        { name: 'Technical Analysis', type: 'technical' as const, detail: 'Golden cross (50-day crossed above 200-day SMA), volume rising' },
      ],
      signals: [
        { label: 'AI Search Revenue', impact: 'high' as const, description: 'Gemini integration driving 12% search revenue growth, beating estimates' },
        { label: 'Cloud Acceleration', impact: 'high' as const, description: 'GCP growing 28%, gaining enterprise AI workload share' },
        { label: 'Technical Breakout', impact: 'medium' as const, description: 'Golden cross confirmed with rising volume — strong bullish signal' },
        { label: 'Regulatory Risk', impact: 'low' as const, description: 'DOJ antitrust case ongoing but market has priced in likely outcomes' },
      ],
      steps: [
        'Identified via AI/search sector momentum screen',
        'Analyzed Gemini user growth metrics vs. ChatGPT/Copilot adoption',
        'Cross-referenced cloud growth with enterprise AI workload trends',
        'Confirmed bullish technical setup: golden cross + volume expansion',
        'Position sized at 4.5% of portfolio, within risk parameters',
      ],
      confidenceBreakdown: {
        fundamental: 88,
        technical: 84,
        sentiment: 82,
        risk: 80,
      },
    },
  },
];

// Helper to mark a trade as approved (mutates in place)
export function markTradeApproved(id: string) {
  const trade = tradeLeads.find(t => t.id === id);
  if (trade) {
    (trade as { status: string }).status = 'approved';
  }
}

// Recent activity
export const recentActivity = [
  { id: '1', type: 'trade' as const, description: 'Bought NVDA', detail: '+5 shares at $890.20', time: '2 hours ago', amount: '+$4,451.00' },
  { id: '2', type: 'trade' as const, description: 'Sold TSLA', detail: '-3 shares at $175.30', time: '5 hours ago', amount: '-$525.90' },
  { id: '3', type: 'dividend' as const, description: 'MSFT Dividend', detail: 'Quarterly dividend payment', time: '1 day ago', amount: '+$12.40' },
  { id: '4', type: 'deposit' as const, description: 'Deposit', detail: 'Bank transfer completed', time: '3 days ago', amount: '+$2,000.00' },
  { id: '5', type: 'trade' as const, description: 'Bought GOOGL', detail: '+2 shares at $165.80', time: '5 days ago', amount: '+$331.60' },
  { id: '6', type: 'ai' as const, description: 'AI Rebalanced', detail: 'Portfolio optimized for risk target', time: '1 week ago', amount: '' },
];

// AI status
export const aiStatus = {
  isActive: true,
  mode: 'balanced' as const,
  tradesThisWeek: 4,
  winRate: 72,
  lastAction: 'Rebalanced portfolio allocation',
  lastActionTime: '2 hours ago',
  safeguards: {
    maxTradeSize: 500,
    dailyTradeLimit: 5,
    stopLossPercent: 8,
  },
};

// Deposit history
export const depositHistory = [
  { id: '1', type: 'deposit' as const, amount: 5000, date: '2025-01-15', status: 'completed' as const, method: 'Bank Transfer' },
  { id: '2', type: 'deposit' as const, amount: 3000, date: '2025-03-01', status: 'completed' as const, method: 'Bank Transfer' },
  { id: '3', type: 'deposit' as const, amount: 2000, date: '2025-06-10', status: 'completed' as const, method: 'Debit Card' },
];

// Investment themes
export const investmentThemes = [
  { id: 'ai', label: 'AI & Robotics', icon: '🤖', description: 'Artificial intelligence, machine learning, automation' },
  { id: 'tech', label: 'Tech Giants', icon: '💻', description: 'Major technology companies and platforms' },
  { id: 'healthcare', label: 'Healthcare', icon: '🏥', description: 'Biotech, pharma, digital health' },
  { id: 'energy', label: 'Energy', icon: '⚡', description: 'Oil, gas, renewables, utilities' },
  { id: 'crypto', label: 'Crypto & Web3', icon: '₿', description: 'Blockchain, digital assets, DeFi' },
  { id: 'consumer', label: 'Consumer', icon: '🛍️', description: 'Retail, e-commerce, consumer brands' },
  { id: 'green', label: 'Sustainability', icon: '🌱', description: 'Clean energy, ESG, climate tech' },
];

// Notifications
export const notifications = [
  { id: '1', title: 'NVDA up 4.2% today', body: 'Your AI portfolio is outperforming the market.', time: '1h ago', read: false },
  { id: '2', title: 'New trade suggestion', body: 'AI recommends buying more GOOGL shares.', time: '3h ago', read: false },
  { id: '3', title: 'Weekly report ready', body: 'Your portfolio gained 2.1% this week.', time: '1d ago', read: true },
];
