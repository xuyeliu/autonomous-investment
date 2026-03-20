import { CheckCircle } from 'lucide-react';
import { colors, spacing, typography, radii } from '../../styles/tokens';

interface TradeConfirmationCardProps {
  trade?: Record<string, unknown>;
}

export default function TradeConfirmationCard({ trade }: TradeConfirmationCardProps) {
  const action = (trade?.action as string) || 'buy';
  const ticker = (trade?.ticker as string) || 'NVDA';
  const name = (trade?.name as string) || 'NVIDIA Corporation';

  return (
    <div style={{
      background: colors.bg.card,
      borderRadius: radii.lg,
      padding: spacing.lg,
      border: `1px solid ${colors.border.accent}`,
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: spacing.sm,
        marginBottom: spacing.md,
      }}>
        <CheckCircle size={20} color={colors.status.gain} />
        <span style={{
          fontSize: typography.fontSize.base,
          fontWeight: typography.fontWeight.semibold,
          color: colors.text.primary,
        }}>
          Trade Executed
        </span>
      </div>

      <div style={{
        background: colors.bg.tertiary,
        borderRadius: radii.md,
        padding: spacing.md,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div>
          <div style={{ fontSize: typography.fontSize.sm, color: colors.text.primary, fontWeight: typography.fontWeight.semibold }}>
            {action.toUpperCase()} {ticker}
          </div>
          <div style={{ fontSize: typography.fontSize.xs, color: colors.text.tertiary }}>{name}</div>
        </div>
        <div style={{
          fontSize: typography.fontSize.xs,
          color: colors.status.gain,
          fontWeight: typography.fontWeight.medium,
        }}>
          Filled
        </div>
      </div>
    </div>
  );
}
