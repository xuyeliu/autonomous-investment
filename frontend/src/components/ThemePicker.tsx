import { colors, spacing, typography, radii } from '../styles/tokens';
import { investmentThemes } from '../data/mock';

interface ThemePickerProps {
  selected: string[];
  onChange: (selected: string[]) => void;
}

export default function ThemePicker({ selected, onChange }: ThemePickerProps) {
  const toggle = (id: string) => {
    onChange(selected.includes(id) ? selected.filter(s => s !== id) : [...selected, id]);
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
      gap: spacing.md,
    }}>
      {investmentThemes.map(theme => {
        const active = selected.includes(theme.id);
        return (
          <button
            key={theme.id}
            onClick={() => toggle(theme.id)}
            style={{
              background: active ? colors.accent.muted : colors.bg.card,
              border: `2px solid ${active ? colors.accent.primary : colors.border.primary}`,
              borderRadius: radii.lg,
              padding: spacing.lg,
              cursor: 'pointer',
              textAlign: 'center',
              transition: 'all 0.2s',
            }}
          >
            <div style={{ fontSize: '28px', marginBottom: spacing.sm }}>{theme.icon}</div>
            <div style={{
              color: active ? colors.accent.primary : colors.text.primary,
              fontSize: typography.fontSize.sm,
              fontWeight: typography.fontWeight.semibold,
            }}>{theme.label}</div>
            <div style={{
              color: colors.text.tertiary,
              fontSize: typography.fontSize.xs,
              marginTop: spacing.xs,
            }}>{theme.description}</div>
          </button>
        );
      })}
    </div>
  );
}
