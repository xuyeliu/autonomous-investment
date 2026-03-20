import { motion } from 'framer-motion';
import { Shield, TrendingUp, Zap } from 'lucide-react';
import { colors, spacing, typography, radii } from '../../styles/tokens';

interface RiskPickerCardProps {
  onSelect: (level: string) => void;
}

// P2: Plain-language risk explanations for beginners
const riskLevels = [
  {
    id: 'conservative',
    label: 'Conservative',
    desc: 'Slow and steady — like a savings account but better. Mostly stable stocks and bonds.',
    detail: 'Lower risk, typically 4-8% annual returns',
    icon: <Shield size={20} />,
    color: colors.accent.primary,
  },
  {
    id: 'balanced',
    label: 'Balanced',
    desc: 'A mix of growth and stability. Good for most people starting out.',
    detail: 'Moderate risk, typically 8-15% annual returns',
    icon: <TrendingUp size={20} />,
    color: colors.status.warning,
  },
  {
    id: 'aggressive',
    label: 'Aggressive',
    desc: 'Go for maximum growth. Higher ups and downs, but bigger potential gains.',
    detail: 'Higher risk, typically 12-25%+ annual returns',
    icon: <Zap size={20} />,
    color: colors.status.loss,
  },
];

export default function RiskPickerCard({ onSelect }: RiskPickerCardProps) {
  return (
    <div style={{
      background: colors.bg.card,
      borderRadius: radii.lg,
      padding: spacing.lg,
      border: `1px solid ${colors.border.primary}`,
    }}>
      <div style={{
        fontSize: typography.fontSize.sm,
        fontWeight: typography.fontWeight.semibold,
        color: colors.text.primary,
        marginBottom: spacing.md,
      }}>
        Choose your risk level
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.sm }}>
        {riskLevels.map(level => (
          <motion.button
            key={level.id}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelect(level.id)}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: spacing.md,
              padding: spacing.md,
              borderRadius: radii.md,
              background: colors.bg.tertiary,
              border: `1px solid ${colors.border.primary}`,
              cursor: 'pointer',
              textAlign: 'left' as const,
              width: '100%',
            }}
          >
            <div style={{
              width: 40,
              height: 40,
              borderRadius: radii.sm,
              background: `${level.color}15`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: level.color,
              flexShrink: 0,
            }}>
              {level.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: typography.fontSize.sm,
                fontWeight: typography.fontWeight.semibold,
                color: colors.text.primary,
                marginBottom: 2,
              }}>
                {level.label}
              </div>
              <div style={{
                fontSize: typography.fontSize.xs,
                color: colors.text.secondary,
                lineHeight: typography.lineHeight.relaxed,
                marginBottom: 2,
              }}>
                {level.desc}
              </div>
              <div style={{
                fontSize: '10px',
                color: colors.text.tertiary,
              }}>
                {level.detail}
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
