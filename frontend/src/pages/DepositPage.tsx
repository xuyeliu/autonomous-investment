import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, CreditCard, Building2, ArrowRight, Check } from 'lucide-react';
import { colors, spacing, typography, radii, shadows } from '../styles/tokens';

const presetAmounts = [500, 1000, 2500, 5000, 10000];

export default function DepositPage() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('1000');
  const [method, setMethod] = useState<'bank' | 'card'>('bank');
  const [step, setStep] = useState(1);

  const handleContinue = () => {
    if (step === 1) setStep(2);
    else if (step === 2) setStep(3);
    else navigate('/onboarding/themes');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: colors.bg.primary,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${spacing.xxxl} ${spacing.lg}`,
    }}>
      {/* Progress bar */}
      <div style={{
        display: 'flex', gap: spacing.sm, marginBottom: spacing.xxl,
        width: '100%', maxWidth: 400,
      }}>
        {[1, 2, 3].map(s => (
          <div key={s} style={{
            flex: 1, height: 4, borderRadius: 2,
            background: s <= step ? colors.accent.primary : colors.border.primary,
            transition: 'background 0.3s',
          }} />
        ))}
      </div>

      <div style={{ maxWidth: 480, width: '100%' }}>
        {step === 1 && (
          <>
            <h1 style={{
              fontSize: typography.fontSize['3xl'],
              fontWeight: typography.fontWeight.bold,
              color: colors.text.primary,
              marginBottom: spacing.sm,
            }}>Fund Your Account</h1>
            <p style={{
              color: colors.text.secondary,
              fontSize: typography.fontSize.base,
              marginBottom: spacing.xl,
            }}>Choose how much you'd like to start with. You can always add more later.</p>

            {/* Amount input */}
            <div style={{
              background: colors.bg.card,
              borderRadius: radii.lg,
              padding: spacing.xl,
              border: `1px solid ${colors.border.primary}`,
              marginBottom: spacing.lg,
              textAlign: 'center',
            }}>
              <div style={{ color: colors.text.tertiary, fontSize: typography.fontSize.sm, marginBottom: spacing.md }}>
                Deposit Amount
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: spacing.lg }}>
                <span style={{ color: colors.text.tertiary, fontSize: typography.fontSize['3xl'], marginRight: spacing.xs }}>$</span>
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ''))}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: colors.text.primary,
                    fontSize: typography.fontSize['5xl'],
                    fontWeight: typography.fontWeight.extrabold,
                    textAlign: 'center',
                    outline: 'none',
                    width: '200px',
                    letterSpacing: '-2px',
                  }}
                />
              </div>
              <div style={{ display: 'flex', gap: spacing.sm, justifyContent: 'center', flexWrap: 'wrap' }}>
                {presetAmounts.map(a => (
                  <button
                    key={a}
                    onClick={() => setAmount(a.toString())}
                    style={{
                      background: amount === a.toString() ? colors.accent.muted : colors.bg.tertiary,
                      border: `1px solid ${amount === a.toString() ? colors.accent.primary : colors.border.primary}`,
                      borderRadius: radii.full,
                      padding: `${spacing.xs} ${spacing.md}`,
                      color: amount === a.toString() ? colors.accent.primary : colors.text.secondary,
                      fontSize: typography.fontSize.sm,
                      cursor: 'pointer',
                      fontWeight: typography.fontWeight.medium,
                    }}
                  >
                    ${a.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h1 style={{
              fontSize: typography.fontSize['3xl'],
              fontWeight: typography.fontWeight.bold,
              color: colors.text.primary,
              marginBottom: spacing.sm,
            }}>Payment Method</h1>
            <p style={{
              color: colors.text.secondary,
              fontSize: typography.fontSize.base,
              marginBottom: spacing.xl,
            }}>Choose how you'd like to fund your account.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md, marginBottom: spacing.lg }}>
              {[
                { id: 'bank' as const, label: 'Bank Transfer', desc: 'Free, 1-2 business days', icon: <Building2 size={24} /> },
                { id: 'card' as const, label: 'Debit Card', desc: 'Instant, small fee applies', icon: <CreditCard size={24} /> },
              ].map(m => (
                <button
                  key={m.id}
                  onClick={() => setMethod(m.id)}
                  style={{
                    background: method === m.id ? colors.bg.elevated : colors.bg.card,
                    border: `2px solid ${method === m.id ? colors.accent.primary : colors.border.primary}`,
                    borderRadius: radii.lg,
                    padding: spacing.lg,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: spacing.md,
                    textAlign: 'left',
                  }}
                >
                  <div style={{
                    width: 48, height: 48, borderRadius: radii.md,
                    background: method === m.id ? colors.accent.muted : colors.bg.tertiary,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: method === m.id ? colors.accent.primary : colors.text.tertiary,
                  }}>
                    {m.icon}
                  </div>
                  <div>
                    <div style={{ color: colors.text.primary, fontWeight: typography.fontWeight.semibold }}>{m.label}</div>
                    <div style={{ color: colors.text.tertiary, fontSize: typography.fontSize.sm }}>{m.desc}</div>
                  </div>
                  {method === m.id && (
                    <div style={{ marginLeft: 'auto' }}>
                      <Check size={20} color={colors.accent.primary} />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div style={{ textAlign: 'center', marginBottom: spacing.xl }}>
              <div style={{
                width: 80, height: 80, borderRadius: '50%',
                background: colors.accent.muted,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: `0 auto ${spacing.lg}`,
              }}>
                <Check size={40} color={colors.accent.primary} />
              </div>
              <h1 style={{
                fontSize: typography.fontSize['3xl'],
                fontWeight: typography.fontWeight.bold,
                color: colors.text.primary,
                marginBottom: spacing.sm,
              }}>Deposit Confirmed</h1>
              <p style={{
                color: colors.text.secondary,
                fontSize: typography.fontSize.base,
              }}>
                ${parseFloat(amount || '0').toLocaleString()} will be deposited via {method === 'bank' ? 'bank transfer' : 'debit card'}.
              </p>
            </div>

            <div style={{
              background: colors.bg.card,
              borderRadius: radii.lg,
              padding: spacing.lg,
              border: `1px solid ${colors.border.primary}`,
              marginBottom: spacing.lg,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: spacing.md }}>
                <span style={{ color: colors.text.secondary, fontSize: typography.fontSize.sm }}>Amount</span>
                <span style={{ color: colors.text.primary, fontWeight: typography.fontWeight.semibold }}>
                  ${parseFloat(amount || '0').toLocaleString()}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: spacing.md }}>
                <span style={{ color: colors.text.secondary, fontSize: typography.fontSize.sm }}>Method</span>
                <span style={{ color: colors.text.primary, fontWeight: typography.fontWeight.medium }}>
                  {method === 'bank' ? 'Bank Transfer' : 'Debit Card'}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: colors.text.secondary, fontSize: typography.fontSize.sm }}>Processing</span>
                <span style={{ color: colors.accent.primary, fontWeight: typography.fontWeight.medium }}>
                  {method === 'bank' ? '1-2 days' : 'Instant'}
                </span>
              </div>
            </div>
          </>
        )}

        <button
          onClick={handleContinue}
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
            marginBottom: spacing.lg,
          }}
        >
          {step < 3 ? 'Continue' : 'Choose Investments'} <ArrowRight size={18} />
        </button>

        {/* Trust cues */}
        <div style={{
          display: 'flex', justifyContent: 'center', gap: spacing.lg,
          color: colors.text.tertiary, fontSize: typography.fontSize.xs,
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: spacing.xs }}>
            <Shield size={14} color={colors.accent.primary} /> SIPC Protected
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: spacing.xs }}>
            <Lock size={14} color={colors.accent.primary} /> 256-bit SSL
          </span>
        </div>
      </div>
    </div>
  );
}
