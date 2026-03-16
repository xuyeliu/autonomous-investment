import { TrendingUp, TrendingDown } from 'lucide-react';
import { colors, spacing, typography, radii, shadows } from '../styles/tokens';

interface PortfolioSummaryProps {
  totalValue: number;
  totalGain: number;
  totalGainPct: number;
  dayChange: number;
  dayChangePct: number;
}

export default function PortfolioSummary({ totalValue, totalGain, totalGainPct, dayChange, dayChangePct }: PortfolioSummaryProps) {
  const isPositive = totalGain >= 0;
  const isDayPositive = dayChange >= 0;

  return (
    <div style={{
      background: `linear-gradient(135deg, ${colors.bg.elevated} 0%, ${colors.bg.card} 100%)`,
      borderRadius: radii.xl,
      padding: spacing.xl,
      border: `1px solid ${colors.border.primary}`,
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        top: -60, right: -60,
        width: 200, height: 200,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${isPositive ? 'rgba(0,212,170,0.06)' : 'rgba(255,107,107,0.06)'} 0%, transparent 70%)`,
      }} />

      <div style={{ color: colors.text.secondary, fontSize: typography.fontSize.sm, marginBottom: spacing.sm }}>
        Total Portfolio Value
      </div>
      <div style={{
        fontSize: typography.fontSize['5xl'],
        fontWeight: typography.fontWeight.extrabold,
        color: colors.text.primary,
        letterSpacing: '-2px',
        lineHeight: 1,
        marginBottom: spacing.md,
      }}>
        ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
      </div>

      <div style={{ display: 'flex', gap: spacing.lg, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: spacing.xs }}>
          {isPositive ? <TrendingUp size={16} color={colors.status.gain} /> : <TrendingDown size={16} color={colors.status.loss} />}
          <span style={{
            color: isPositive ? colors.status.gain : colors.status.loss,
            fontSize: typography.fontSize.base,
            fontWeight: typography.fontWeight.semibold,
          }}>
            {isPositive ? '+' : ''}${totalGain.toLocaleString('en-US', { minimumFractionDigits: 2 })} ({isPositive ? '+' : ''}{totalGainPct.toFixed(2)}%)
          </span>
          <span style={{ color: colors.text.tertiary, fontSize: typography.fontSize.sm }}>all time</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: spacing.xs }}>
          <span style={{
            color: isDayPositive ? colors.status.gain : colors.status.loss,
            fontSize: typography.fontSize.sm,
            fontWeight: typography.fontWeight.medium,
          }}>
            {isDayPositive ? '+' : ''}${dayChange.toFixed(2)} ({isDayPositive ? '+' : ''}{dayChangePct.toFixed(2)}%)
          </span>
          <span style={{ color: colors.text.tertiary, fontSize: typography.fontSize.sm }}>today</span>
        </div>
      </div>
    </div>
  );
}
