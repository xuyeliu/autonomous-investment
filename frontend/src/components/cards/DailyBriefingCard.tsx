import { TrendingUp, Activity, ArrowUpRight } from 'lucide-react';
import { colors, spacing, typography, radii } from '../../styles/tokens';
import { portfolioSummary, aiStatus } from '../../data/mock';

export default function DailyBriefingCard() {
  const isUp = portfolioSummary.dayChange >= 0;

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
        Daily Briefing
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'baseline',
        gap: spacing.sm,
        marginBottom: spacing.xs,
      }}>
        <span style={{
          fontSize: typography.fontSize['2xl'],
          fontWeight: typography.fontWeight.bold,
          color: colors.text.primary,
        }}>
          ${portfolioSummary.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </span>
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: spacing.xs,
        marginBottom: spacing.lg,
      }}>
        <ArrowUpRight size={14} color={isUp ? colors.status.gain : colors.status.loss} />
        <span style={{
          fontSize: typography.fontSize.sm,
          color: isUp ? colors.status.gain : colors.status.loss,
          fontWeight: typography.fontWeight.medium,
        }}>
          ${Math.abs(portfolioSummary.dayChange).toFixed(2)} ({portfolioSummary.dayChangePct}%) today
        </span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: spacing.md,
      }}>
        <div style={{
          background: colors.bg.tertiary,
          borderRadius: radii.md,
          padding: spacing.md,
          display: 'flex',
          alignItems: 'center',
          gap: spacing.sm,
        }}>
          <TrendingUp size={16} color={colors.accent.primary} />
          <div>
            <div style={{ fontSize: typography.fontSize.xs, color: colors.text.tertiary }}>All-time</div>
            <div style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold, color: colors.status.gain }}>
              +{portfolioSummary.totalGainPct}%
            </div>
          </div>
        </div>

        <div style={{
          background: colors.bg.tertiary,
          borderRadius: radii.md,
          padding: spacing.md,
          display: 'flex',
          alignItems: 'center',
          gap: spacing.sm,
        }}>
          <Activity size={16} color={colors.accent.primary} />
          <div>
            <div style={{ fontSize: typography.fontSize.xs, color: colors.text.tertiary }}>AI Trades</div>
            <div style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold, color: colors.text.primary }}>
              {aiStatus.tradesThisWeek} this week
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
