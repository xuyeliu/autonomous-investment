import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, SkipForward } from 'lucide-react';
import ThemePicker from '../components/ThemePicker';
import { colors, spacing, typography, radii } from '../styles/tokens';

export default function ThemesPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string[]>([]);

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
            background: s <= 2 ? colors.accent.primary : colors.border.primary,
          }} />
        ))}
      </div>

      <div style={{ maxWidth: 600, width: '100%' }}>
        <h1 style={{
          fontSize: typography.fontSize['3xl'],
          fontWeight: typography.fontWeight.bold,
          color: colors.text.primary,
          marginBottom: spacing.sm,
        }}>What Interests You?</h1>
        <p style={{
          color: colors.text.secondary,
          fontSize: typography.fontSize.base,
          marginBottom: spacing.xl,
        }}>
          Pick sectors you're excited about. Our AI will factor these into your portfolio. This is optional — you can skip and let the AI decide.
        </p>

        <ThemePicker selected={selected} onChange={setSelected} />

        <div style={{
          display: 'flex', gap: spacing.md, marginTop: spacing.xl,
        }}>
          <button
            onClick={() => navigate('/onboarding/risk')}
            style={{
              flex: 1,
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
            }}
          >
            Continue <ArrowRight size={18} />
          </button>
          <button
            onClick={() => navigate('/onboarding/risk')}
            style={{
              background: 'transparent',
              color: colors.text.tertiary,
              border: `1px solid ${colors.border.primary}`,
              borderRadius: radii.md,
              padding: `${spacing.md} ${spacing.lg}`,
              fontSize: typography.fontSize.sm,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: spacing.xs,
            }}
          >
            <SkipForward size={16} /> Skip
          </button>
        </div>
      </div>
    </div>
  );
}
