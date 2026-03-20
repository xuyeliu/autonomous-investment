import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';
import { colors, spacing, radii } from '../../styles/tokens';

export default function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      style={{
        display: 'flex',
        justifyContent: 'flex-start',
        padding: `${spacing.xs} ${spacing.lg}`,
        gap: spacing.sm,
      }}
    >
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

      <div style={{
        background: colors.bg.card,
        borderRadius: '20px 20px 20px 4px',
        padding: `${spacing.md} ${spacing.lg}`,
        display: 'flex',
        gap: 6,
        alignItems: 'center',
        border: `1px solid ${colors.border.primary}`,
      }}>
        <span className="typing-dot" style={{ animationDelay: '0ms' }} />
        <span className="typing-dot" style={{ animationDelay: '150ms' }} />
        <span className="typing-dot" style={{ animationDelay: '300ms' }} />
      </div>
    </motion.div>
  );
}
