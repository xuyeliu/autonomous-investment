import { Download, Sliders, Bot, TrendingUp } from 'lucide-react';
import { colors, spacing, typography, radii } from '../styles/tokens';

const steps = [
  { icon: <Download size={28} />, title: 'Deposit', desc: 'Fund your account in seconds with bank transfer or card.' },
  { icon: <Sliders size={28} />, title: 'Set Preferences', desc: 'Pick sectors you like and set your risk comfort level.' },
  { icon: <Bot size={28} />, title: 'AI Invests', desc: 'Our AI analyzes markets 24/7 and makes smart trades for you.' },
  { icon: <TrendingUp size={28} />, title: 'Watch It Grow', desc: 'Track your portfolio performance and withdraw anytime.' },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" style={{
      padding: `${spacing.xxxl} ${spacing.lg}`,
      background: colors.bg.primary,
    }}>
      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{
          fontSize: typography.fontSize['3xl'],
          fontWeight: typography.fontWeight.bold,
          color: colors.text.primary,
          marginBottom: spacing.sm,
        }}>How It Works</h2>
        <p style={{
          color: colors.text.secondary,
          fontSize: typography.fontSize.lg,
          marginBottom: spacing.xxl,
        }}>Four simple steps to smarter investing</p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: spacing.lg,
        }}>
          {steps.map((s, i) => (
            <div key={s.title} style={{
              background: colors.bg.card,
              borderRadius: radii.lg,
              padding: spacing.xl,
              border: `1px solid ${colors.border.primary}`,
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute', top: spacing.md, right: spacing.md,
                color: colors.accent.muted, fontSize: typography.fontSize['3xl'],
                fontWeight: typography.fontWeight.extrabold,
                lineHeight: 1,
              }}>{i + 1}</div>
              <div style={{
                width: 56, height: 56, borderRadius: radii.md,
                background: colors.accent.muted,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: spacing.md,
                color: colors.accent.primary,
              }}>{s.icon}</div>
              <h3 style={{
                color: colors.text.primary,
                fontSize: typography.fontSize.base,
                fontWeight: typography.fontWeight.semibold,
                marginBottom: spacing.sm,
              }}>{s.title}</h3>
              <p style={{
                color: colors.text.secondary,
                fontSize: typography.fontSize.sm,
                lineHeight: typography.lineHeight.relaxed,
              }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
