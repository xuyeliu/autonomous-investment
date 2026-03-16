import { useState } from 'react';
import TradeLeadCard from '../components/TradeLeadCard';
import AutoTradeToggle from '../components/AutoTradeToggle';
import SectionHeader from '../components/SectionHeader';
import { tradeLeads as initialLeads } from '../data/mock';
import { colors, spacing, typography, radii } from '../styles/tokens';

export default function TradesPage() {
  const [leads, setLeads] = useState(initialLeads);
  const [autoTrade, setAutoTrade] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved'>('all');

  const handleApprove = (id: string) => {
    setLeads(leads.map(l => l.id === id ? { ...l, status: 'approved' as const } : l));
  };

  const handleReject = (id: string) => {
    setLeads(leads.map(l => l.id === id ? { ...l, status: 'rejected' as const } : l));
  };

  const filtered = filter === 'all' ? leads : leads.filter(l => l.status === filter);

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <h1 style={{
        fontSize: typography.fontSize['2xl'],
        fontWeight: typography.fontWeight.bold,
        color: colors.text.primary,
        marginBottom: spacing.xs,
      }}>Trade Suggestions</h1>
      <p style={{
        color: colors.text.secondary,
        fontSize: typography.fontSize.sm,
        marginBottom: spacing.xl,
      }}>
        AI-generated trade ideas based on market analysis. Review and approve, or enable auto-trading.
      </p>

      <AutoTradeToggle enabled={autoTrade} onToggle={setAutoTrade} />

      <div style={{ marginTop: spacing.xl }}>
        <div style={{ display: 'flex', gap: spacing.sm, marginBottom: spacing.lg }}>
          {(['all', 'pending', 'approved'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                background: filter === f ? colors.accent.muted : 'transparent',
                border: `1px solid ${filter === f ? colors.accent.primary : colors.border.primary}`,
                borderRadius: radii.full,
                padding: `${spacing.xs} ${spacing.md}`,
                color: filter === f ? colors.accent.primary : colors.text.tertiary,
                fontSize: typography.fontSize.sm,
                fontWeight: typography.fontWeight.medium,
                cursor: 'pointer',
                textTransform: 'capitalize',
              }}
            >
              {f} {f === 'pending' && `(${leads.filter(l => l.status === 'pending').length})`}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}>
          {filtered.map(lead => (
            <TradeLeadCard
              key={lead.id}
              lead={lead}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: spacing.xxl,
            color: colors.text.tertiary,
          }}>
            No trades match this filter.
          </div>
        )}
      </div>
    </div>
  );
}
