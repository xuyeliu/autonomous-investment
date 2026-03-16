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
  },
];

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
