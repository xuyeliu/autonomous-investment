import { motion } from 'framer-motion';
import { Shield, TrendingUp, Zap } from 'lucide-react';
import { colors, spacing, typography, radii } from '../../styles/tokens';

export default function WelcomeCard() {
  const features = [
    { icon: <TrendingUp size={16} />, text: 'AI-powered portfolio management' },
    { icon: <Shield size={16} />, text: 'Bank-level security & SIPC insured' },
    { icon: <Zap size={16} />, text: 'Real-time trade execution' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      style={{
        background: `linear-gradient(135deg, ${colors.bg.card}, ${colors.bg.elevated})`,
        borderRadius: radii.lg,
        padding: spacing.lg,
        border: `1px solid ${colors.border.accent}`,
        boxShadow: `0 0 30px rgba(0, 212, 170, 0.08)`,
      }}
    >
      <div style={{
        fontSize: typography.fontSize.lg,
        fontWeight: typography.fontWeight.bold,
        color: colors.text.primary,
        marginBottom: spacing.sm,
      }}>
        Welcome to Autonomous Investment
      </div>
      <div style={{
        fontSize: typography.fontSize.sm,
        color: colors.text.secondary,
        marginBottom: spacing.lg,
        lineHeight: typography.lineHeight.relaxed,
      }}>
        I'm your personal AI wealth manager. I'll handle your investments, find opportunities, and keep your portfolio optimized — all through this conversation.
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}>
        {features.map((f, i) => (
          <div key={i} style={{
            display: 'flex',
            alignItems: 'center',
            gap: spacing.md,
          }}>
            <div style={{
              width: 32,
              height: 32,
              borderRadius: radii.sm,
              background: colors.accent.muted,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: colors.accent.primary,
              flexShrink: 0,
            }}>
              {f.icon}
            </div>
            <span style={{
              fontSize: typography.fontSize.sm,
              color: colors.text.secondary,
            }}>
              {f.text}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
