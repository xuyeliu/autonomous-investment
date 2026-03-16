import { colors, spacing, typography } from '../styles/tokens';

interface SectionHeaderProps {
  title: string;
  action?: string;
  onAction?: () => void;
}

export default function SectionHeader({ title, action, onAction }: SectionHeaderProps) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      marginBottom: spacing.md,
    }}>
      <h2 style={{
        fontSize: typography.fontSize.lg,
        fontWeight: typography.fontWeight.semibold,
        color: colors.text.primary,
      }}>{title}</h2>
      {action && (
        <button onClick={onAction} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: colors.accent.primary,
          fontSize: typography.fontSize.sm,
          fontWeight: typography.fontWeight.medium,
        }}>{action}</button>
      )}
    </div>
  );
}
