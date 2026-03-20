import { TrendingUp, TrendingDown } from 'lucide-react';
import { colors, spacing, typography, radii } from '../../styles/tokens';
import { portfolioSummary, allocationData } from '../../data/mock';

export default function PortfolioCard() {
  const isUp = portfolioSummary.totalGain >= 0;

  return (
    <div style={{
      background: colors.bg.card,
      borderRadius: radii.lg,
      padding: spacing.lg,
      border: `1px solid ${colors.border.primary}`,
    }}>
      <div style={{
        fontSize: typography.fontSize.xs,
        color: colors.text.tertiary,
        textTransform: 'uppercase' as const,
        letterSpacing: '0.05em',
        marginBottom: spacing.md,
        fontWeight: typography.fontWeight.semibold,
      }}>
        Your Portfolio
      </div>

      <div style={{
        fontSize: typography.fontSize['3xl'],
        fontWeight: typography.fontWeight.bold,
        color: colors.text.primary,
        marginBottom: spacing.xs,
      }}>
        ${portfolioSummary.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: spacing.xs,
        marginBottom: spacing.lg,
      }}>
        {isUp ? <TrendingUp size={16} color={colors.status.gain} /> : <TrendingDown size={16} color={colors.status.loss} />}
        <span style={{
          fontSize: typography.fontSize.sm,
          color: isUp ? colors.status.gain : colors.status.loss,
          fontWeight: typography.fontWeight.medium,
        }}>
          +${portfolioSummary.totalGain.toLocaleString('en-US', { minimumFractionDigits: 2 })} ({portfolioSummary.totalGainPct}%) all time
        </span>
      </div>

      <div style={{
        display: 'flex',
        gap: spacing.xs,
        marginBottom: spacing.md,
        height: 8,
        borderRadius: radii.full,
        overflow: 'hidden',
      }}>
        {allocationData.map((item) => (
          <div
            key={item.name}
            style={{
              flex: item.value,
              background: item.color,
              borderRadius: radii.full,
            }}
          />
        ))}
      </div>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: spacing.sm,
      }}>
        {allocationData.slice(0, 4).map((item) => (
          <div key={item.name} style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: item.color }} />
            <span style={{ fontSize: typography.fontSize.xs, color: colors.text.tertiary }}>
              {item.name} {item.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
