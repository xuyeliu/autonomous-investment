import { ArrowUpRight, ArrowDownRight, Minus, Check, X, Bot } from 'lucide-react';
import { colors, spacing, typography, radii } from '../styles/tokens';

interface TradeLead {
  id: string;
  action: 'buy' | 'sell' | 'hold';
  ticker: string;
  name: string;
  rationale: string;
  confidence: number;
  potentialReturn: string;
  timeframe: string;
  status: 'pending' | 'approved' | 'rejected';
}

const actionConfig = {
  buy: { color: colors.status.gain, label: 'BUY', icon: <ArrowUpRight size={16} /> },
  sell: { color: colors.status.loss, label: 'SELL', icon: <ArrowDownRight size={16} /> },
  hold: { color: colors.status.warning, label: 'HOLD', icon: <Minus size={16} /> },
};

interface TradeLeadCardProps {
  lead: TradeLead;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
}

export default function TradeLeadCard({ lead, onApprove, onReject }: TradeLeadCardProps) {
  const config = actionConfig[lead.action];

  return (
    <div style={{
      background: colors.bg.card,
      borderRadius: radii.lg,
      padding: spacing.lg,
      border: `1px solid ${colors.border.primary}`,
      borderLeft: `3px solid ${config.color}`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.md }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
          <span style={{
            background: `${config.color}22`,
            color: config.color,
            padding: `${spacing.xs} ${spacing.sm}`,
            borderRadius: radii.sm,
            fontSize: typography.fontSize.xs,
            fontWeight: typography.fontWeight.bold,
            display: 'flex', alignItems: 'center', gap: 4,
          }}>
            {config.icon} {config.label}
          </span>
          <span style={{ color: colors.text.primary, fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.bold }}>{lead.ticker}</span>
          <span style={{ color: colors.text.tertiary, fontSize: typography.fontSize.sm }}>{lead.name}</span>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: spacing.xs,
          color: colors.accent.primary, fontSize: typography.fontSize.xs,
        }}>
          <Bot size={14} />
          {lead.confidence}% confident
        </div>
      </div>

      <p style={{
        color: colors.text.secondary,
        fontSize: typography.fontSize.sm,
        lineHeight: typography.lineHeight.relaxed,
        marginBottom: spacing.md,
      }}>
        {lead.rationale}
      </p>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: spacing.lg }}>
          <span style={{ color: colors.text.tertiary, fontSize: typography.fontSize.xs }}>
            Potential: <span style={{ color: config.color, fontWeight: 600 }}>{lead.potentialReturn}</span>
          </span>
          <span style={{ color: colors.text.tertiary, fontSize: typography.fontSize.xs }}>
            Timeframe: <span style={{ color: colors.text.secondary, fontWeight: 500 }}>{lead.timeframe}</span>
          </span>
        </div>

        {lead.status === 'pending' && (
          <div style={{ display: 'flex', gap: spacing.sm }}>
            <button
              onClick={() => onApprove?.(lead.id)}
              style={{
                background: colors.status.gain + '22',
                border: `1px solid ${colors.status.gain}44`,
                borderRadius: radii.sm,
                padding: `${spacing.xs} ${spacing.md}`,
                color: colors.status.gain,
                fontSize: typography.fontSize.xs,
                fontWeight: typography.fontWeight.semibold,
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 4,
              }}
            >
              <Check size={14} /> Approve
            </button>
            <button
              onClick={() => onReject?.(lead.id)}
              style={{
                background: 'transparent',
                border: `1px solid ${colors.border.primary}`,
                borderRadius: radii.sm,
                padding: `${spacing.xs} ${spacing.md}`,
                color: colors.text.tertiary,
                fontSize: typography.fontSize.xs,
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 4,
              }}
            >
              <X size={14} /> Reject
            </button>
          </div>
        )}

        {lead.status === 'approved' && (
          <span style={{
            color: colors.status.gain,
            fontSize: typography.fontSize.xs,
            fontWeight: typography.fontWeight.semibold,
            display: 'flex', alignItems: 'center', gap: 4,
          }}>
            <Check size={14} /> Approved
          </span>
        )}
      </div>
    </div>
  );
}
