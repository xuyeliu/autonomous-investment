import PerformanceChart from '../components/PerformanceChart';
import StatCard from '../components/StatCard';
import AllocationCard from '../components/AllocationCard';
import SectionHeader from '../components/SectionHeader';
import { performanceData, portfolioSummary, allocationData } from '../data/mock';
import { TrendingUp, Calendar, DollarSign, Target } from 'lucide-react';
import { colors, spacing, typography, radii } from '../styles/tokens';

export default function PerformancePage() {
  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      <h1 style={{
        fontSize: typography.fontSize['2xl'],
        fontWeight: typography.fontWeight.bold,
        color: colors.text.primary,
        marginBottom: spacing.xs,
      }}>Performance</h1>
      <p style={{
        color: colors.text.secondary,
        fontSize: typography.fontSize.sm,
        marginBottom: spacing.xl,
      }}>
        Track how your portfolio is performing over time.
      </p>

      <PerformanceChart data={performanceData} />

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: spacing.md,
        marginTop: spacing.xl,
      }}>
        <StatCard
          label="Total Return"
          value={`+$${portfolioSummary.totalGain.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
          change={`+${portfolioSummary.totalGainPct.toFixed(2)}%`}
          changeType="gain"
          icon={<TrendingUp size={16} />}
        />
        <StatCard
          label="Today"
          value={`+$${portfolioSummary.dayChange.toFixed(2)}`}
          change={`+${portfolioSummary.dayChangePct.toFixed(2)}%`}
          changeType="gain"
          icon={<Calendar size={16} />}
        />
        <StatCard
          label="Portfolio Value"
          value={`$${portfolioSummary.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
          icon={<DollarSign size={16} />}
        />
        <StatCard
          label="Initial Investment"
          value={`$${portfolioSummary.initialDeposit.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
          icon={<Target size={16} />}
        />
      </div>

      <div style={{ marginTop: spacing.xl }}>
        <SectionHeader title="Portfolio Allocation" />
        <AllocationCard data={allocationData} />
      </div>

      {/* Key metrics */}
      <div style={{ marginTop: spacing.xl }}>
        <SectionHeader title="Key Metrics" />
        <div style={{
          background: colors.bg.card,
          borderRadius: radii.lg,
          padding: spacing.lg,
          border: `1px solid ${colors.border.primary}`,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: spacing.lg,
        }}>
          {[
            { label: 'Sharpe Ratio', value: '1.84' },
            { label: 'Max Drawdown', value: '-6.2%' },
            { label: 'Beta', value: '0.92' },
            { label: 'Alpha', value: '+4.1%' },
            { label: 'Win Rate', value: '72%' },
            { label: 'Avg Trade Duration', value: '12 days' },
          ].map(m => (
            <div key={m.label} style={{
              display: 'flex', justifyContent: 'space-between',
              paddingBottom: spacing.sm,
              borderBottom: `1px solid ${colors.border.secondary}`,
            }}>
              <span style={{ color: colors.text.secondary, fontSize: typography.fontSize.sm }}>{m.label}</span>
              <span style={{ color: colors.text.primary, fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold }}>{m.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
