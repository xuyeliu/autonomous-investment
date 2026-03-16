import { Bot, Shield, Zap } from 'lucide-react';
import { colors, spacing, typography, radii, shadows } from '../styles/tokens';

interface AutoTradeToggleProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}

export default function AutoTradeToggle({ enabled, onToggle }: AutoTradeToggleProps) {
  return (
    <div style={{
      background: colors.bg.card,
      borderRadius: radii.lg,
      padding: spacing.xl,
      border: `1px solid ${enabled ? colors.accent.primary + '44' : colors.border.primary}`,
      boxShadow: enabled ? shadows.glow : 'none',
      transition: 'all 0.3s',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.lg }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: spacing.md }}>
          <div style={{
            width: 48, height: 48, borderRadius: radii.md,
            background: enabled ? colors.accent.muted : `${colors.text.tertiary}22`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Bot size={24} color={enabled ? colors.accent.primary : colors.text.tertiary} />
          </div>
          <div>
            <div style={{ color: colors.text.primary, fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.semibold }}>
              AI Auto-Trading
            </div>
            <div style={{ color: enabled ? colors.accent.primary : colors.text.tertiary, fontSize: typography.fontSize.sm }}>
              {enabled ? 'Active — AI is trading for you' : 'Disabled — Manual approval required'}
            </div>
          </div>
        </div>

        <button
          onClick={() => onToggle(!enabled)}
          style={{
            width: 56, height: 30, borderRadius: 15,
            background: enabled ? colors.accent.primary : colors.text.tertiary + '44',
            border: 'none', cursor: 'pointer',
            position: 'relative',
            transition: 'background 0.3s',
          }}
        >
          <div style={{
            width: 24, height: 24,
            borderRadius: '50%',
            background: '#fff',
            position: 'absolute',
            top: 3,
            left: enabled ? 29 : 3,
            transition: 'left 0.3s',
            boxShadow: shadows.sm,
          }} />
        </button>
      </div>

      {enabled && (
        <div style={{ display: 'flex', gap: spacing.md, flexWrap: 'wrap' }}>
          {[
            { icon: <Shield size={14} />, text: 'Stop-loss protection enabled' },
            { icon: <Zap size={14} />, text: 'Trades within your risk limits' },
          ].map(item => (
            <div key={item.text} style={{
              display: 'flex', alignItems: 'center', gap: spacing.sm,
              color: colors.text.secondary, fontSize: typography.fontSize.xs,
              background: colors.bg.tertiary,
              borderRadius: radii.full,
              padding: `${spacing.xs} ${spacing.sm}`,
            }}>
              <span style={{ color: colors.accent.primary }}>{item.icon}</span>
              {item.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
