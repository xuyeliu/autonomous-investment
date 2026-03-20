import { colors, spacing, typography } from '../../styles/tokens';

interface DateDividerProps {
  label: string;
}

export default function DateDivider({ label }: DateDividerProps) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: spacing.md,
      padding: `${spacing.md} ${spacing.lg}`,
    }}>
      <div style={{ flex: 1, height: 1, background: colors.border.primary }} />
      <span style={{
        fontSize: typography.fontSize.xs,
        color: colors.text.tertiary,
        fontWeight: typography.fontWeight.medium,
      }}>
        {label}
      </span>
      <div style={{ flex: 1, height: 1, background: colors.border.primary }} />
    </div>
  );
}
