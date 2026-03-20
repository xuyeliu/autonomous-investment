import { motion } from 'framer-motion';
import { Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { colors, spacing, typography, radii } from '../../styles/tokens';
import { portfolioSummary } from '../../data/mock';

interface WalletCardProps {
  onDeposit?: () => void;
}

export default function WalletCard({ onDeposit }: WalletCardProps) {
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
        <Wallet size={18} color={colors.accent.primary} />
        <span style={{
          fontSize: typography.fontSize.xs,
          color: colors.text.tertiary,
          textTransform: 'uppercase' as const,
          letterSpacing: '0.05em',
          fontWeight: typography.fontWeight.semibold,
        }}>
          Wallet
        </span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: spacing.md,
        marginBottom: spacing.lg,
      }}>
        <div>
          <div style={{ fontSize: typography.fontSize.xs, color: colors.text.tertiary, marginBottom: 2 }}>Cash Balance</div>
          <div style={{ fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.bold, color: colors.text.primary }}>
            ${portfolioSummary.cashBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
        </div>
        <div>
          <div style={{ fontSize: typography.fontSize.xs, color: colors.text.tertiary, marginBottom: 2 }}>Invested</div>
          <div style={{ fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.bold, color: colors.text.primary }}>
            ${portfolioSummary.investedBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: spacing.sm }}>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onDeposit}
          style={{
            flex: 1,
            padding: `${spacing.sm} ${spacing.md}`,
            borderRadius: radii.md,
            background: colors.accent.primary,
            color: colors.text.inverse,
            fontSize: typography.fontSize.sm,
            fontWeight: typography.fontWeight.semibold,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: spacing.xs,
          }}
        >
          <ArrowDownRight size={14} /> Deposit
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          style={{
            flex: 1,
            padding: `${spacing.sm} ${spacing.md}`,
            borderRadius: radii.md,
            background: colors.bg.tertiary,
            color: colors.text.secondary,
            fontSize: typography.fontSize.sm,
            fontWeight: typography.fontWeight.semibold,
            cursor: 'pointer',
            border: `1px solid ${colors.border.primary}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: spacing.xs,
          }}
        >
          <ArrowUpRight size={14} /> Withdraw
        </motion.button>
      </div>
    </div>
  );
}
