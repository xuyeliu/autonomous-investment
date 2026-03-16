import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import RiskSelector from '../components/RiskSelector';
import { colors, spacing, typography, radii, shadows } from '../styles/tokens';

export default function RiskPage() {
  const navigate = useNavigate();
  const [risk, setRisk] = useState('balanced');

  return (
    <div style={{
      minHeight: '100vh',
      background: colors.bg.primary,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${spacing.xxxl} ${spacing.lg}`,
    }}>
      {/* Progress */}
      <div style={{
        display: 'flex', gap: spacing.sm, marginBottom: spacing.xxl,
        width: '100%', maxWidth: 400,
      }}>
        {[1, 2, 3].map(s => (
          <div key={s} style={{
            flex: 1, height: 4, borderRadius: 2,
            background: colors.accent.primary,
          }} />
        ))}
      </div>

      <div style={{ maxWidth: 560, width: '100%' }}>
        <h1 style={{
          fontSize: typography.fontSize['3xl'],
          fontWeight: typography.fontWeight.bold,
          color: colors.text.primary,
          marginBottom: spacing.sm,
        }}>Set Your Risk Level</h1>
        <p style={{
          color: colors.text.secondary,
          fontSize: typography.fontSize.base,
          marginBottom: spacing.xl,
        }}>
          How much risk are you comfortable with? Higher risk means higher potential returns, but also more volatility.
        </p>

        <RiskSelector selected={risk} onChange={setRisk} />

        <button
          onClick={() => navigate('/dashboard')}
          style={{
            width: '100%',
            background: colors.accent.primary,
            color: colors.text.inverse,
            border: 'none',
            borderRadius: radii.md,
            padding: spacing.md,
            fontSize: typography.fontSize.base,
            fontWeight: typography.fontWeight.semibold,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: spacing.sm,
            marginTop: spacing.xl,
            boxShadow: shadows.glowStrong,
          }}
        >
          <Sparkles size={18} /> Launch My AI Portfolio
        </button>
      </div>
    </div>
  );
}
