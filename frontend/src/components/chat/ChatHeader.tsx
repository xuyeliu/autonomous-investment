import { Bot, Settings } from 'lucide-react';
import { colors, spacing, typography, radii } from '../../styles/tokens';

interface ChatHeaderProps {
  onSettingsClick?: () => void;
}

export default function ChatHeader({ onSettingsClick }: ChatHeaderProps) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      padding: `${spacing.md} ${spacing.lg}`,
      background: colors.bg.secondary,
      borderBottom: `1px solid ${colors.border.primary}`,
      position: 'sticky',
      top: 0,
      zIndex: 10,
    }}>
      <div style={{
        width: 40,
        height: 40,
        borderRadius: radii.full,
        background: `linear-gradient(135deg, ${colors.accent.primary}, ${colors.accent.tertiary})`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.md,
        flexShrink: 0,
        animation: 'avatar-pulse 3s ease-in-out infinite',
      }}>
        <Bot size={22} color={colors.text.inverse} />
      </div>

      <div style={{ flex: 1 }}>
        <div style={{
          fontSize: typography.fontSize.base,
          fontWeight: typography.fontWeight.semibold,
          color: colors.text.primary,
          display: 'flex',
          alignItems: 'center',
          gap: spacing.sm,
        }}>
          Autonomous Investment
          <span style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: colors.status.gain,
            display: 'inline-block',
            boxShadow: `0 0 6px ${colors.status.gain}`,
          }} />
        </div>
        <div style={{
          fontSize: typography.fontSize.xs,
          color: colors.text.tertiary,
        }}>
          Your AI Wealth Manager
        </div>
      </div>

      <button
        onClick={onSettingsClick}
        style={{
          padding: spacing.sm,
          borderRadius: radii.md,
          color: colors.text.tertiary,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Settings size={20} />
      </button>
    </div>
  );
}
