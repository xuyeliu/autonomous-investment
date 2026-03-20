import { ArrowUpRight, ArrowDownRight, Repeat, Bot } from 'lucide-react';
import { colors, spacing, typography, radii } from '../../styles/tokens';
import { recentActivity } from '../../data/mock';

const typeIcons: Record<string, React.ReactNode> = {
  trade: <Repeat size={14} />,
  deposit: <ArrowDownRight size={14} />,
  dividend: <ArrowUpRight size={14} />,
  ai: <Bot size={14} />,
};

const typeColors: Record<string, string> = {
  trade: colors.accent.primary,
  deposit: colors.status.gain,
  dividend: colors.status.warning,
  ai: colors.accent.tertiary,
};

export default function ActivityCard() {
  const items = recentActivity.slice(0, 4);

  return (
    <div style={{
      background: colors.bg.card,
      borderRadius: radii.lg,
      padding: spacing.lg,
      border: `1px solid ${colors.border.primary}`,
    }}>
      <div style={{
        fontSize: typography.fontSize.xs,
        color: colors.text.tertiary,
        textTransform: 'uppercase' as const,
        letterSpacing: '0.05em',
        marginBottom: spacing.md,
        fontWeight: typography.fontWeight.semibold,
      }}>
        Recent Activity
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.sm }}>
        {items.map(item => (
          <div key={item.id} style={{
            display: 'flex',
            alignItems: 'center',
            gap: spacing.md,
            padding: `${spacing.sm} 0`,
            borderBottom: `1px solid ${colors.border.secondary}`,
          }}>
            <div style={{
              width: 32,
              height: 32,
              borderRadius: radii.sm,
              background: `${typeColors[item.type]}15`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: typeColors[item.type],
              flexShrink: 0,
            }}>
              {typeIcons[item.type]}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: typography.fontSize.sm,
                color: colors.text.primary,
                fontWeight: typography.fontWeight.medium,
              }}>
                {item.description}
              </div>
              <div style={{
                fontSize: typography.fontSize.xs,
                color: colors.text.tertiary,
              }}>
                {item.time}
              </div>
            </div>
            {item.amount && (
              <div style={{
                fontSize: typography.fontSize.sm,
                fontWeight: typography.fontWeight.semibold,
                color: item.amount.startsWith('+') ? colors.status.gain : item.amount.startsWith('-') ? colors.status.loss : colors.text.secondary,
              }}>
                {item.amount}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
