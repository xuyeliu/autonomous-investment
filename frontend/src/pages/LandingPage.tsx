import HeroSection from '../components/HeroSection';
import TrustBanner from '../components/TrustBanner';
import HowItWorksSection from '../components/HowItWorksSection';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { colors, spacing, typography, radii, shadows } from '../styles/tokens';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={{ background: colors.bg.primary, minHeight: '100vh' }}>
      <HeroSection />
      <TrustBanner />
      <HowItWorksSection />

      {/* Final CTA */}
      <section style={{
        padding: `${spacing.xxxl} ${spacing.lg}`,
        textAlign: 'center',
        background: colors.bg.primary,
      }}>
        <h2 style={{
          fontSize: typography.fontSize['3xl'],
          fontWeight: typography.fontWeight.bold,
          color: colors.text.primary,
          marginBottom: spacing.md,
        }}>
          Ready to Let AI Grow Your Wealth?
        </h2>
        <p style={{
          color: colors.text.secondary,
          fontSize: typography.fontSize.lg,
          marginBottom: spacing.xl,
          maxWidth: 480,
          margin: `0 auto ${spacing.xl}`,
        }}>
          Join thousands of investors who are already earning more with less effort.
        </p>
        <button
          onClick={() => navigate('/onboarding/deposit')}
          style={{
            background: colors.accent.primary,
            color: colors.text.inverse,
            border: 'none',
            borderRadius: radii.full,
            padding: `${spacing.md} ${spacing.xxl}`,
            fontSize: typography.fontSize.lg,
            fontWeight: typography.fontWeight.semibold,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: spacing.sm,
            boxShadow: shadows.glowStrong,
          }}
        >
          Get Started <ArrowRight size={20} />
        </button>

        <div style={{
          marginTop: spacing.xxxl,
          paddingTop: spacing.xl,
          borderTop: `1px solid ${colors.border.primary}`,
          color: colors.text.tertiary,
          fontSize: typography.fontSize.xs,
        }}>
          <p>Autonomous Investment — Smart wealth, simplified.</p>
          <p style={{ marginTop: spacing.xs }}>This is a demo product. Not financial advice. Past performance does not guarantee future results.</p>
        </div>
      </section>
    </div>
  );
}
