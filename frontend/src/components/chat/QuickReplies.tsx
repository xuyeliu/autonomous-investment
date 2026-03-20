import { colors, spacing, typography, radii } from '../../styles/tokens';
import type { QuickReply } from '../../chat/types';

interface QuickRepliesProps {
  replies: QuickReply[];
  onSelect: (reply: QuickReply) => void;
}

export default function QuickReplies({ replies, onSelect }: QuickRepliesProps) {
  return (
    <div style={{
      display: 'flex',
      gap: spacing.sm,
      overflowX: 'auto',
      paddingBottom: spacing.sm,
      scrollbarWidth: 'none',
    }}>
      {replies.map((reply) => (
        <button
          key={reply.value}
          onClick={() => onSelect(reply)}
          style={{
            whiteSpace: 'nowrap',
            padding: `${spacing.sm} ${spacing.md}`,
            borderRadius: radii.full,
            background: 'transparent',
            border: `1px solid ${colors.border.accent}`,
            color: colors.accent.primary,
            fontSize: typography.fontSize.xs,
            fontWeight: typography.fontWeight.medium,
            cursor: 'pointer',
            flexShrink: 0,
            transition: 'background 0.2s',
          }}
        >
          {reply.label}
        </button>
      ))}
    </div>
  );
}
