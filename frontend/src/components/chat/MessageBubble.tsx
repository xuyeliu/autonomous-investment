import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';
import { colors, spacing, typography, radii } from '../../styles/tokens';
import type { ChatMessage } from '../../chat/types';
import CardRenderer from '../cards/CardRenderer';

interface MessageBubbleProps {
  message: ChatMessage;
  onCardAction?: (action: string, data?: unknown) => void;
}

export default function MessageBubble({ message, onCardAction }: MessageBubbleProps) {
  const isAI = message.sender === 'ai';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={{
        display: 'flex',
        justifyContent: isAI ? 'flex-start' : 'flex-end',
        padding: `${spacing.xs} ${spacing.lg}`,
        gap: spacing.sm,
      }}
    >
      {isAI && (
        <div style={{
          width: 28,
          height: 28,
          borderRadius: radii.full,
          background: `linear-gradient(135deg, ${colors.accent.primary}, ${colors.accent.tertiary})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          marginTop: spacing.xs,
        }}>
          <Bot size={14} color={colors.text.inverse} />
        </div>
      )}

      <div style={{
        maxWidth: 480,
        display: 'flex',
        flexDirection: 'column',
        gap: spacing.sm,
      }}>
        {message.text && (
          <div style={{
            background: isAI ? colors.bg.card : colors.accent.muted,
            borderRadius: isAI ? '20px 20px 20px 4px' : '20px 20px 4px 20px',
            padding: `${spacing.md} ${spacing.lg}`,
            color: colors.text.primary,
            fontSize: typography.fontSize.sm,
            lineHeight: typography.lineHeight.relaxed,
            border: isAI ? `1px solid ${colors.border.primary}` : `1px solid ${colors.border.accent}`,
          }}>
            {message.text}
          </div>
        )}

        {message.card && (
          <div style={{
            borderRadius: radii.lg,
            overflow: 'hidden',
          }}>
            <CardRenderer card={message.card} onAction={onCardAction} />
          </div>
        )}
      </div>
    </motion.div>
  );
}
