import { Shield, Lock, Award, Users } from 'lucide-react';
import { colors, spacing, typography, radii } from '../styles/tokens';

const signals = [
  { icon: <Shield size={28} />, title: 'SEC Regulated', desc: 'Fully compliant with financial regulations' },
  { icon: <Lock size={28} />, title: '256-bit Encryption', desc: 'Your data and funds are always secure' },
  { icon: <Award size={28} />, title: 'SIPC Protected', desc: 'Securities protected up to $500K' },
  { icon: <Users size={28} />, title: '100K+ Users', desc: 'Trusted by investors worldwide' },
];

export default function TrustBanner() {
  return (
    <section style={{
      padding: `${spacing.xxxl} ${spacing.lg}`,
      background: colors.bg.secondary,
    }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: spacing.lg,
        }}>
          {signals.map(s => (
            <div key={s.title} style={{
              textAlign: 'center',
              padding: spacing.lg,
            }}>
              <div style={{ color: colors.accent.primary, marginBottom: spacing.md }}>{s.icon}</div>
              <div style={{ color: colors.text.primary, fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.base, marginBottom: spacing.xs }}>
                {s.title}
              </div>
              <div style={{ color: colors.text.tertiary, fontSize: typography.fontSize.sm }}>
                {s.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
