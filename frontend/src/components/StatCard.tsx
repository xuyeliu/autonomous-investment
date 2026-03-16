import { colors, spacing, typography, radii, shadows } from '../styles/tokens';

interface StatCardProps {
  label: string;
  value: string;
  change?: string;
  changeType?: 'gain' | 'loss' | 'neutral';
  icon?: React.ReactNode;
}

export default function StatCard({ label, value, change, changeType = 'neutral', icon }: StatCardProps) {
  const changeColor = changeType === 'gain' ? colors.status.gain : changeType === 'loss' ? colors.status.loss : colors.text.secondary;

  return (
    <div style={{
      background: colors.bg.card,
      borderRadius: radii.lg,
      padding: spacing.lg,
      border: `1px solid ${colors.border.primary}`,
      flex: 1,
      minWidth: 160,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.sm }}>
        <span style={{ color: colors.text.secondary, fontSize: typography.fontSize.sm }}>{label}</span>
        {icon && <span style={{ color: colors.text.tertiary }}>{icon}</span>}
      </div>
      <div style={{ fontSize: typography.fontSize['2xl'], fontWeight: typography.fontWeight.bold, color: colors.text.primary }}>
        {value}
      </div>
      {change && (
        <div style={{ fontSize: typography.fontSize.sm, color: changeColor, marginTop: spacing.xs, fontWeight: typography.fontWeight.medium }}>
          {change}
        </div>
      )}
    </div>
  );
}
