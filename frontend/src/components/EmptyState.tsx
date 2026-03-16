import { colors, spacing, typography, radii } from '../styles/tokens';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({ icon, title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', padding: spacing.xxxl,
      textAlign: 'center',
    }}>
      <div style={{ color: colors.text.tertiary, marginBottom: spacing.lg }}>{icon}</div>
      <h3 style={{ color: colors.text.primary, fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.semibold, marginBottom: spacing.sm }}>{title}</h3>
      <p style={{ color: colors.text.secondary, fontSize: typography.fontSize.sm, maxWidth: 320, marginBottom: spacing.lg }}>{description}</p>
      {actionLabel && (
        <button onClick={onAction} style={{
          background: colors.accent.primary, color: colors.text.inverse,
          border: 'none', borderRadius: radii.full,
          padding: `${spacing.sm} ${spacing.xl}`,
          fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold,
          cursor: 'pointer',
        }}>{actionLabel}</button>
      )}
    </div>
  );
}
