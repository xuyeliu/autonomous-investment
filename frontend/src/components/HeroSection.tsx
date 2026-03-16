import { ArrowRight, Shield, Zap, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { colors, spacing, typography, radii, shadows } from '../styles/tokens';

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: `${spacing.xxxl} ${spacing.lg}`,
      position: 'relative',
      overflow: 'hidden',
      background: `radial-gradient(ellipse at 50% 0%, rgba(0,212,170,0.08) 0%, ${colors.bg.primary} 70%)`,
    }}>
      {/* Glow orb */}
      <div style={{
        position: 'absolute',
        width: 600, height: 600,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,212,170,0.1) 0%, transparent 70%)',
        top: '-200px',
        left: '50%',
        transform: 'translateX(-50%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: spacing.sm,
        background: colors.accent.muted,
        borderRadius: radii.full,
        padding: `${spacing.xs} ${spacing.md}`,
        marginBottom: spacing.xl,
        border: `1px solid ${colors.border.accent}`,
      }}>
        <Zap size={14} color={colors.accent.primary} />
        <span style={{ color: colors.accent.primary, fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.medium }}>
          AI-Powered Investing
        </span>
      </div>

      <h1 style={{
        fontSize: 'clamp(36px, 6vw, 64px)',
        fontWeight: typography.fontWeight.extrabold,
        color: colors.text.primary,
        lineHeight: typography.lineHeight.tight,
        maxWidth: 800,
        marginBottom: spacing.lg,
        letterSpacing: '-1px',
      }}>
        Your AI<br />
        <span style={{ color: colors.accent.primary }}>Wealth Engine</span>
      </h1>

      <p style={{
        fontSize: 'clamp(16px, 2vw, 20px)',
        color: colors.text.secondary,
        maxWidth: 560,
        marginBottom: spacing.xxl,
        lineHeight: typography.lineHeight.relaxed,
      }}>
        Let artificial intelligence grow your money. No expertise needed. Just deposit, set your preferences, and watch your wealth grow.
      </p>

      <div style={{ display: 'flex', gap: spacing.md, flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          onClick={() => navigate('/onboarding/deposit')}
          style={{
            background: colors.accent.primary,
            color: colors.text.inverse,
            border: 'none',
            borderRadius: radii.full,
            padding: `${spacing.md} ${spacing.xl}`,
            fontSize: typography.fontSize.base,
            fontWeight: typography.fontWeight.semibold,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: spacing.sm,
            boxShadow: shadows.glowStrong,
            transition: 'transform 0.2s',
          }}
        >
          Start Investing <ArrowRight size={18} />
        </button>
        <button
          onClick={() => {
            document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
          }}
          style={{
            background: 'transparent',
            color: colors.text.primary,
            border: `1px solid ${colors.border.primary}`,
            borderRadius: radii.full,
            padding: `${spacing.md} ${spacing.xl}`,
            fontSize: typography.fontSize.base,
            fontWeight: typography.fontWeight.medium,
            cursor: 'pointer',
          }}
        >
          See How It Works
        </button>
      </div>

      <div style={{
        display: 'flex',
        gap: spacing.xl,
        marginTop: spacing.xxl,
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}>
        {[
          { icon: <Shield size={16} />, text: 'Bank-Level Security' },
          { icon: <TrendingUp size={16} />, text: 'AI-Optimized Returns' },
          { icon: <Zap size={16} />, text: 'Instant Setup' },
        ].map(item => (
          <div key={item.text} style={{
            display: 'flex', alignItems: 'center', gap: spacing.sm,
            color: colors.text.tertiary, fontSize: typography.fontSize.sm,
          }}>
            <span style={{ color: colors.accent.primary }}>{item.icon}</span>
            {item.text}
          </div>
        ))}
      </div>
    </section>
  );
}
