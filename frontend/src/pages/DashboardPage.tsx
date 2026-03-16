import { useNavigate } from 'react-router-dom';
import { Bot, TrendingUp, ArrowRight, Plus } from 'lucide-react';
import PortfolioSummary from '../components/PortfolioSummary';
import PerformanceChart from '../components/PerformanceChart';
import AllocationCard from '../components/AllocationCard';
import AIStatusCard from '../components/AIStatusCard';
import ActivityList from '../components/ActivityList';
import SectionHeader from '../components/SectionHeader';
import StatCard from '../components/StatCard';
import { portfolioSummary, performanceData, allocationData, aiStatus, recentActivity, tradeLeads } from '../data/mock';
import { colors, spacing, typography, radii } from '../styles/tokens';

export default function DashboardPage() {
  const navigate = useNavigate();
  const pendingLeads = tradeLeads.filter(t => t.status === 'pending').length;

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      {/* Greeting */}
      <div style={{ marginBottom: spacing.lg }}>
        <h1 style={{
          fontSize: typography.fontSize['2xl'],
          fontWeight: typography.fontWeight.bold,
          color: colors.text.primary,
          marginBottom: spacing.xs,
        }}>Good morning</h1>
        <p style={{ color: colors.text.secondary, fontSize: typography.fontSize.sm }}>
          Your AI is actively managing your portfolio
        </p>
      </div>

      {/* Portfolio Summary */}
      <PortfolioSummary
        totalValue={portfolioSummary.totalValue}
        totalGain={portfolioSummary.totalGain}
        totalGainPct={portfolioSummary.totalGainPct}
        dayChange={portfolioSummary.dayChange}
        dayChangePct={portfolioSummary.dayChangePct}
      />

      {/* Quick actions */}
      <div style={{ display: 'flex', gap: spacing.md, marginTop: spacing.lg, flexWrap: 'wrap' }}>
        {[
          { label: 'Deposit', icon: <Plus size={16} />, path: '/onboarding/deposit' },
          { label: `${pendingLeads} Trade Leads`, icon: <TrendingUp size={16} />, path: '/trades' },
          { label: 'AI Agent', icon: <Bot size={16} />, path: '/ai-agent' },
        ].map(action => (
          <button
            key={action.label}
            onClick={() => navigate(action.path)}
            style={{
              background: colors.bg.card,
              border: `1px solid ${colors.border.primary}`,
              borderRadius: radii.full,
              padding: `${spacing.sm} ${spacing.lg}`,
              color: colors.text.primary,
              fontSize: typography.fontSize.sm,
              fontWeight: typography.fontWeight.medium,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: spacing.sm,
            }}
          >
            <span style={{ color: colors.accent.primary }}>{action.icon}</span>
            {action.label}
            <ArrowRight size={14} color={colors.text.tertiary} />
          </button>
        ))}
      </div>

      {/* Two-column layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)',
        gap: spacing.lg,
        marginTop: spacing.xl,
      }}>
        {/* Left column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.lg }}>
          <SectionHeader title="Performance" action="View Details" onAction={() => navigate('/performance')} />
          <PerformanceChart data={performanceData} />

          <SectionHeader title="Recent Activity" action="View All" />
          <ActivityList activities={recentActivity.slice(0, 4)} />
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.lg }}>
          <SectionHeader title="AI Agent" action="Manage" onAction={() => navigate('/ai-agent')} />
          <AIStatusCard
            isActive={aiStatus.isActive}
            mode={aiStatus.mode}
            tradesThisWeek={aiStatus.tradesThisWeek}
            winRate={aiStatus.winRate}
            lastAction={aiStatus.lastAction}
            lastActionTime={aiStatus.lastActionTime}
          />

          <SectionHeader title="Allocation" />
          <AllocationCard data={allocationData} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}>
            <StatCard
              label="Cash Available"
              value={`$${portfolioSummary.cashBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
              changeType="neutral"
            />
            <StatCard
              label="Total Invested"
              value={`$${portfolioSummary.investedBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
              change={`+${portfolioSummary.totalGainPct.toFixed(1)}% return`}
              changeType="gain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
