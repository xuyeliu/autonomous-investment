import { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign } from 'lucide-react';
import { colors, spacing, typography, radii } from '../../styles/tokens';

interface DepositCardProps {
  onSelect: (amount: number) => void;
  prefillAmount?: number;
}

const presets = [500, 1000, 2500, 5000];

function parseAmount(raw: string): number {
  // P0 FIX: Strip $, commas, whitespace, then parseFloat instead of parseInt
  const cleaned = raw.replace(/[$,\s]/g, '');
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
}

export default function DepositCard({ onSelect, prefillAmount }: DepositCardProps) {
  const [selected, setSelected] = useState<number | null>(prefillAmount ?? null);
  const [custom, setCustom] = useState(prefillAmount && !presets.includes(prefillAmount) ? String(prefillAmount) : '');
  const [error, setError] = useState('');

  const handleCustomChange = (value: string) => {
    setCustom(value);
    setSelected(null);
    setError('');
  };

  const getAmount = (): number => {
    return selected || parseAmount(custom);
  };

  const validate = (amount: number): string => {
    if (amount <= 0) return 'Please enter a valid amount';
    if (amount < 1) return 'Minimum deposit is $1';
    if (amount > 1000000) return 'Maximum deposit is $1,000,000';
    return '';
  };

  const handleConfirm = () => {
    const amount = getAmount();
    const err = validate(amount);
    if (err) {
      setError(err);
      return;
    }
    onSelect(amount);
  };

  const amount = getAmount();
  const isValid = amount > 0 && !validate(amount);

  return (
    <div style={{
      background: colors.bg.card,
      borderRadius: radii.lg,
      padding: spacing.lg,
      border: `1px solid ${colors.border.primary}`,
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: spacing.sm,
        marginBottom: spacing.lg,
      }}>
        <DollarSign size={18} color={colors.accent.primary} />
        <span style={{
          fontSize: typography.fontSize.sm,
          fontWeight: typography.fontWeight.semibold,
          color: colors.text.primary,
        }}>
          Choose your starting amount
        </span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: spacing.sm,
        marginBottom: spacing.md,
      }}>
        {presets.map(amt => (
          <motion.button
            key={amt}
            whileTap={{ scale: 0.95 }}
            onClick={() => { setSelected(amt); setCustom(''); setError(''); }}
            style={{
              padding: spacing.md,
              borderRadius: radii.md,
              background: selected === amt ? colors.accent.muted : colors.bg.tertiary,
              border: selected === amt ? `1px solid ${colors.accent.primary}` : `1px solid ${colors.border.primary}`,
              color: selected === amt ? colors.accent.primary : colors.text.primary,
              fontSize: typography.fontSize.base,
              fontWeight: typography.fontWeight.semibold,
              cursor: 'pointer',
              textAlign: 'center' as const,
            }}
          >
            ${amt.toLocaleString()}
          </motion.button>
        ))}
      </div>

      <input
        type="text"
        inputMode="decimal"
        placeholder="Custom amount (e.g. $2,500)"
        value={custom}
        onChange={(e) => handleCustomChange(e.target.value)}
        style={{
          width: '100%',
          padding: spacing.md,
          borderRadius: radii.md,
          background: colors.bg.tertiary,
          border: `1px solid ${error ? colors.status.loss : colors.border.primary}`,
          color: colors.text.primary,
          fontSize: typography.fontSize.sm,
          outline: 'none',
          marginBottom: error ? spacing.xs : spacing.md,
        }}
      />

      {error && (
        <div style={{
          fontSize: typography.fontSize.xs,
          color: colors.status.loss,
          marginBottom: spacing.md,
          paddingLeft: spacing.xs,
        }}>
          {error}
        </div>
      )}

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={handleConfirm}
        disabled={!isValid}
        style={{
          width: '100%',
          padding: spacing.md,
          borderRadius: radii.md,
          background: isValid ? colors.accent.primary : colors.bg.tertiary,
          color: isValid ? colors.text.inverse : colors.text.tertiary,
          fontSize: typography.fontSize.sm,
          fontWeight: typography.fontWeight.semibold,
          cursor: isValid ? 'pointer' : 'default',
        }}
      >
        Invest ${(amount || 0).toLocaleString('en-US', { minimumFractionDigits: amount % 1 !== 0 ? 2 : 0 })}
      </motion.button>
    </div>
  );
}
