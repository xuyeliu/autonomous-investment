import { Bot, Activity, Target, CheckCircle2 } from 'lucide-react';
import { colors, spacing, typography, radii } from '../styles/tokens';

interface AIStatusProps {
  isActive: boolean;
  mode: string;
  tradesThisWeek: number;
  winRate: number;
  lastAction: string;
  lastActionTime: string;
}

export default function AIStatusCard({ isActive, mode, tradesThisWeek, winRate, lastAction, lastActionTime }: AIStatusProps) {
  return (
    <div style={{
      background: colors.bg.card,
      borderRadius: radii.lg,
      padding: spacing.lg,
      border: `1px solid ${colors.border.primary}`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.lg }}>
        <div style={{
          width: 10, height: 10, borderRadius: '50%',
          background: isActive ? colors.status.gain : colors.text.tertiary,
          boxShadow: isActive ? `0 0 8px ${colors.status.gain}` : 'none',
        }} />
        <span style={{ color: colors.text.primary, fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold }}>
          AI Agent — {isActive ? 'Active' : 'Paused'}
        </span>
        <span style={{
          marginLeft: 'auto',
          background: colors.accent.muted,
          color: colors.accent.primary,
          padding: `2px ${spacing.sm}`,
          borderRadius: radii.full,
          fontSize: typography.fontSize.xs,
          fontWeight: typography.fontWeight.medium,
          textTransform: 'capitalize',
        }}>{mode} mode</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing.md, marginBottom: spacing.md }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
          <Activity size={16} color={colors.accent.primary} />
          <div>
            <div style={{ color: colors.text.tertiary, fontSize: typography.fontSize.xs }}>Trades this week</div>
            <div style={{ color: colors.text.primary, fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.semibold }}>{tradesThisWeek}</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
          <Target size={16} color={colors.accent.primary} />
          <div>
            <div style={{ color: colors.text.tertiary, fontSize: typography.fontSize.xs }}>Win rate</div>
            <div style={{ color: colors.status.gain, fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.semibold }}>{winRate}%</div>
          </div>
        </div>
      </div>

      <div style={{
        background: colors.bg.tertiary,
        borderRadius: radii.md,
        padding: spacing.md,
        display: 'flex', alignItems: 'center', gap: spacing.sm,
      }}>
        <CheckCircle2 size={16} color={colors.accent.primary} />
        <div>
          <div style={{ color: colors.text.secondary, fontSize: typography.fontSize.sm }}>{lastAction}</div>
          <div style={{ color: colors.text.tertiary, fontSize: typography.fontSize.xs }}>{lastActionTime}</div>
        </div>
      </div>
    </div>
  );
}
