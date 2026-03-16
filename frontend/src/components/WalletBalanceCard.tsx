import { Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { colors, spacing, typography, radii } from '../styles/tokens';

interface WalletBalanceCardProps {
  cashBalance: number;
  investedBalance: number;
  totalValue: number;
  onDeposit?: () => void;
  onWithdraw?: () => void;
}

export default function WalletBalanceCard({ cashBalance, investedBalance, totalValue, onDeposit, onWithdraw }: WalletBalanceCardProps) {
  return (
    <div style={{
      background: `linear-gradient(135deg, ${colors.bg.elevated} 0%, ${colors.bg.card} 100%)`,
      borderRadius: radii.xl,
      padding: spacing.xl,
      border: `1px solid ${colors.border.primary}`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.lg }}>
        <Wallet size={20} color={colors.accent.primary} />
        <span style={{ color: colors.text.secondary, fontSize: typography.fontSize.sm }}>Account Balance</span>
      </div>

      <div style={{
        fontSize: typography.fontSize['4xl'],
        fontWeight: typography.fontWeight.extrabold,
        color: colors.text.primary,
        letterSpacing: '-1px',
        marginBottom: spacing.lg,
      }}>
        ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
      </div>

      <div style={{ display: 'flex', gap: spacing.md }}>
        <div style={{
          flex: 1, background: colors.bg.tertiary,
          borderRadius: radii.md, padding: spacing.md,
        }}>
          <div style={{ color: colors.text.tertiary, fontSize: typography.fontSize.xs, marginBottom: spacing.xs }}>Cash</div>
          <div style={{ color: colors.text.primary, fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.semibold }}>
            ${cashBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
        </div>
        <div style={{
          flex: 1, background: colors.bg.tertiary,
          borderRadius: radii.md, padding: spacing.md,
        }}>
          <div style={{ color: colors.text.tertiary, fontSize: typography.fontSize.xs, marginBottom: spacing.xs }}>Invested</div>
          <div style={{ color: colors.text.primary, fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.semibold }}>
            ${investedBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: spacing.md, marginTop: spacing.lg }}>
        <button
          onClick={onDeposit}
          style={{
            flex: 1, background: colors.accent.primary, color: colors.text.inverse,
            border: 'none', borderRadius: radii.md,
            padding: `${spacing.md} ${spacing.lg}`,
            fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: spacing.sm,
          }}
        >
          <ArrowDownRight size={16} /> Deposit
        </button>
        <button
          onClick={onWithdraw}
          style={{
            flex: 1, background: 'transparent', color: colors.text.primary,
            border: `1px solid ${colors.border.primary}`, borderRadius: radii.md,
            padding: `${spacing.md} ${spacing.lg}`,
            fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.medium,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: spacing.sm,
          }}
        >
          <ArrowUpRight size={16} /> Withdraw
        </button>
      </div>
    </div>
  );
}
