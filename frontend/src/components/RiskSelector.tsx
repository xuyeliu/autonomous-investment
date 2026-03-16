import { Shield, Scale, Flame } from 'lucide-react';
import { colors, spacing, typography, radii, shadows } from '../styles/tokens';

const riskLevels = [
  {
    id: 'conservative',
    label: 'Conservative',
    icon: <Shield size={32} />,
    description: 'Lower risk, steadier returns. Best for preserving capital.',
    expectedReturn: '6-10%',
    volatility: 'Low',
    color: colors.accent.tertiary,
  },
  {
    id: 'balanced',
    label: 'Balanced',
    icon: <Scale size={32} />,
    description: 'Mix of growth and stability. Best for most investors.',
    expectedReturn: '10-18%',
    volatility: 'Medium',
    color: colors.accent.primary,
  },
  {
    id: 'aggressive',
    label: 'Aggressive',
    icon: <Flame size={32} />,
    description: 'Higher risk, higher potential returns. For growth-focused investors.',
    expectedReturn: '18-30%',
    volatility: 'High',
    color: colors.status.warning,
  },
];

interface RiskSelectorProps {
  selected: string;
  onChange: (level: string) => void;
}

export default function RiskSelector({ selected, onChange }: RiskSelectorProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}>
      {riskLevels.map(level => {
        const active = selected === level.id;
        return (
          <button
            key={level.id}
            onClick={() => onChange(level.id)}
            style={{
              background: active ? colors.bg.elevated : colors.bg.card,
              border: `2px solid ${active ? level.color : colors.border.primary}`,
              borderRadius: radii.lg,
              padding: spacing.lg,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: spacing.lg,
              textAlign: 'left',
              transition: 'all 0.2s',
              boxShadow: active ? `0 0 20px ${level.color}22` : 'none',
            }}
          >
            <div style={{
              width: 64, height: 64, borderRadius: radii.md,
              background: active ? `${level.color}22` : colors.accent.muted,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: active ? level.color : colors.text.tertiary,
              flexShrink: 0,
            }}>
              {level.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{
                color: active ? level.color : colors.text.primary,
                fontSize: typography.fontSize.lg,
                fontWeight: typography.fontWeight.semibold,
                marginBottom: spacing.xs,
              }}>{level.label}</div>
              <div style={{
                color: colors.text.secondary,
                fontSize: typography.fontSize.sm,
                marginBottom: spacing.sm,
              }}>{level.description}</div>
              <div style={{ display: 'flex', gap: spacing.lg }}>
                <span style={{ color: colors.text.tertiary, fontSize: typography.fontSize.xs }}>
                  Expected return: <span style={{ color: colors.status.gain, fontWeight: 600 }}>{level.expectedReturn}</span>
                </span>
                <span style={{ color: colors.text.tertiary, fontSize: typography.fontSize.xs }}>
                  Volatility: <span style={{ fontWeight: 600, color: colors.text.secondary }}>{level.volatility}</span>
                </span>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
