import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';
import { colors, typography } from '../styles/tokens';

interface SplashPageProps {
  onComplete: () => void;
}

export default function SplashPage({ onComplete }: SplashPageProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      key="splash"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: colors.bg.primary,
        gap: '24px',
      }}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          width: 80,
          height: 80,
          borderRadius: '24px',
          background: `linear-gradient(135deg, ${colors.accent.primary}, ${colors.accent.tertiary})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `0 0 60px rgba(0, 212, 170, 0.3)`,
        }}
      >
        <Bot size={40} color={colors.text.inverse} />
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        style={{ textAlign: 'center' as const }}
      >
        <div style={{
          fontSize: typography.fontSize['2xl'],
          fontWeight: typography.fontWeight.bold,
          color: colors.text.primary,
          marginBottom: '8px',
        }}>
          Autonomous Investment
        </div>
        <div style={{
          fontSize: typography.fontSize.sm,
          color: colors.text.tertiary,
        }}>
          Your AI Wealth Manager
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        style={{ position: 'absolute' as const, bottom: 48 }}
      >
        <div style={{ display: 'flex', gap: 6 }}>
          <span className="typing-dot" style={{ animationDelay: '0ms' }} />
          <span className="typing-dot" style={{ animationDelay: '150ms' }} />
          <span className="typing-dot" style={{ animationDelay: '300ms' }} />
        </div>
      </motion.div>
    </motion.div>
  );
}
