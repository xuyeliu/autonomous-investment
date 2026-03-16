import { ArrowUpRight, ArrowDownRight, DollarSign, Bot, TrendingUp } from 'lucide-react';
import { colors, spacing, typography, radii } from '../styles/tokens';

interface Activity {
  id: string;
  type: 'trade' | 'deposit' | 'dividend' | 'ai';
  description: string;
  detail: string;
  time: string;
  amount: string;
}

const typeIcons = {
  trade: TrendingUp,
  deposit: DollarSign,
  dividend: DollarSign,
  ai: Bot,
};

const typeBg = {
  trade: 'rgba(0, 212, 170, 0.12)',
  deposit: 'rgba(9, 132, 227, 0.12)',
  dividend: 'rgba(255, 217, 61, 0.12)',
  ai: 'rgba(162, 155, 254, 0.12)',
};

const typeColor = {
  trade: colors.accent.primary,
  deposit: colors.accent.tertiary,
  dividend: colors.status.warning,
  ai: '#A29BFE',
};

export default function ActivityList({ activities }: { activities: Activity[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.xs }}>
      {activities.map(a => {
        const Icon = typeIcons[a.type];
        return (
          <div key={a.id} style={{
            display: 'flex', alignItems: 'center', gap: spacing.md,
            padding: `${spacing.md} ${spacing.md}`,
            borderRadius: radii.md,
            background: colors.bg.card,
            border: `1px solid ${colors.border.secondary}`,
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: radii.md,
              background: typeBg[a.type],
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Icon size={18} color={typeColor[a.type]} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ color: colors.text.primary, fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.medium }}>{a.description}</div>
              <div style={{ color: colors.text.tertiary, fontSize: typography.fontSize.xs }}>{a.detail}</div>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{
                color: a.amount.startsWith('+') ? colors.status.gain : a.amount.startsWith('-') ? colors.status.loss : colors.text.secondary,
                fontSize: typography.fontSize.sm,
                fontWeight: typography.fontWeight.semibold,
              }}>{a.amount}</div>
              <div style={{ color: colors.text.tertiary, fontSize: typography.fontSize.xs }}>{a.time}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
