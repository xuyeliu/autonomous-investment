import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { colors, spacing, typography, radii } from '../../styles/tokens';
import { investmentThemes } from '../../data/mock';

interface ThemePickerCardProps {
  onDone: (themes: string[]) => void;
  onSmartDefault?: () => void;
}

export default function ThemePickerCard({ onDone, onSmartDefault }: ThemePickerCardProps) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]);
  };

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
        Pick your investment themes
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: spacing.sm,
        marginBottom: spacing.md,
      }}>
        {investmentThemes.map(theme => {
          const isSelected = selected.includes(theme.id);
          return (
            <motion.button
              key={theme.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggle(theme.id)}
              style={{
                padding: spacing.md,
                borderRadius: radii.md,
                background: isSelected ? colors.accent.muted : colors.bg.tertiary,
                border: isSelected ? `1px solid ${colors.accent.primary}` : `1px solid ${colors.border.primary}`,
                cursor: 'pointer',
                textAlign: 'left' as const,
                position: 'relative' as const,
              }}
            >
              {isSelected && (
                <div style={{
                  position: 'absolute' as const,
                  top: 6,
                  right: 6,
                  width: 18,
                  height: 18,
                  borderRadius: '50%',
                  background: colors.accent.primary,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Check size={12} color={colors.text.inverse} />
                </div>
              )}
              <div style={{ fontSize: '20px', marginBottom: 4 }}>{theme.icon}</div>
              <div style={{
                fontSize: typography.fontSize.xs,
                fontWeight: typography.fontWeight.semibold,
                color: isSelected ? colors.accent.primary : colors.text.primary,
                marginBottom: 2,
              }}>
                {theme.label}
              </div>
              {/* P2: Show theme description so beginners understand what each theme invests in */}
              <div style={{
                fontSize: '10px',
                color: colors.text.tertiary,
                lineHeight: '1.3',
              }}>
                {theme.description}
              </div>
            </motion.button>
          );
        })}
      </div>

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => selected.length > 0 && onDone(selected)}
        disabled={selected.length === 0}
        style={{
          width: '100%',
          padding: spacing.md,
          borderRadius: radii.md,
          background: selected.length > 0 ? colors.accent.primary : colors.bg.tertiary,
          color: selected.length > 0 ? colors.text.inverse : colors.text.tertiary,
          fontSize: typography.fontSize.sm,
          fontWeight: typography.fontWeight.semibold,
          cursor: selected.length > 0 ? 'pointer' : 'default',
          marginBottom: onSmartDefault ? spacing.sm : 0,
        }}
      >
        {selected.length > 0 ? `Continue with ${selected.length} theme${selected.length > 1 ? 's' : ''}` : 'Select at least one'}
      </motion.button>

      {/* P1: Smart default — let beginners skip choosing */}
      {onSmartDefault && (
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onSmartDefault}
          style={{
            width: '100%',
            padding: spacing.sm,
            borderRadius: radii.md,
            background: 'transparent',
            color: colors.accent.primary,
            fontSize: typography.fontSize.xs,
            fontWeight: typography.fontWeight.medium,
            cursor: 'pointer',
            opacity: 0.8,
          }}
        >
          Not sure? Let AI pick for me
        </motion.button>
      )}
    </div>
  );
}
