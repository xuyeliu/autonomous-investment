import { useState } from 'react';
import WalletBalanceCard from '../components/WalletBalanceCard';
import SectionHeader from '../components/SectionHeader';
import ActivityList from '../components/ActivityList';
import { portfolioSummary, depositHistory, recentActivity } from '../data/mock';
import { Building2, CreditCard, Clock, CheckCircle2, X, ArrowDownRight, ArrowUpRight, Trash2 } from 'lucide-react';
import { colors, spacing, typography, radii, shadows } from '../styles/tokens';

type ModalType = 'deposit' | 'withdraw' | null;

export default function WalletPage() {
  const [modal, setModal] = useState<ModalType>(null);
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('bank');
  const [submitted, setSubmitted] = useState(false);
  const [accounts, setAccounts] = useState([
    { id: '1', icon: 'building', name: 'Chase Checking', detail: '****4829', status: 'Verified' },
    { id: '2', icon: 'card', name: 'Visa Debit', detail: '****1234', status: 'Verified' },
  ]);
  const [showAddAccount, setShowAddAccount] = useState(false);
  const [newAccountName, setNewAccountName] = useState('');
  const [newAccountNumber, setNewAccountNumber] = useState('');
  const [newAccountType, setNewAccountType] = useState<'building' | 'card'>('building');

  const presets = modal === 'deposit' ? [500, 1000, 2500, 5000] : [250, 500, 1000, 2000];

  const handleSubmit = () => {
    if (!amount || Number(amount) <= 0) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setAmount('');
      setModal(null);
    }, 2500);
  };

  const handleAddAccount = () => {
    if (!newAccountName.trim() || newAccountNumber.length < 4) return;
    const last4 = newAccountNumber.slice(-4);
    setAccounts(prev => [...prev, {
      id: Date.now().toString(),
      icon: newAccountType,
      name: newAccountName,
      detail: `****${last4}`,
      status: 'Verified',
    }]);
    setNewAccountName('');
    setNewAccountNumber('');
    setShowAddAccount(false);
  };

  const removeAccount = (id: string) => {
    setAccounts(prev => prev.filter(a => a.id !== id));
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <h1 style={{
        fontSize: typography.fontSize['2xl'],
        fontWeight: typography.fontWeight.bold,
        color: colors.text.primary,
        marginBottom: spacing.xs,
      }}>Wallet</h1>
      <p style={{
        color: colors.text.secondary,
        fontSize: typography.fontSize.sm,
        marginBottom: spacing.xl,
      }}>
        Manage your funds and view transaction history.
      </p>

      <WalletBalanceCard
        cashBalance={portfolioSummary.cashBalance}
        investedBalance={portfolioSummary.investedBalance}
        totalValue={portfolioSummary.totalValue}
        onDeposit={() => setModal('deposit')}
        onWithdraw={() => setModal('withdraw')}
      />

      {/* Linked accounts */}
      <div style={{ marginTop: spacing.xl }}>
        <SectionHeader title="Linked Accounts" action="+ Add" onAction={() => setShowAddAccount(true)} />

        {/* Add account form */}
        {showAddAccount && (
          <div style={{
            background: colors.bg.card,
            borderRadius: radii.md,
            padding: spacing.lg,
            border: `1px solid ${colors.border.accent}`,
            marginBottom: spacing.md,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: spacing.md }}>
              <span style={{ color: colors.text.primary, fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold }}>Add New Account</span>
              <button onClick={() => setShowAddAccount(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: colors.text.tertiary }}>
                <X size={16} />
              </button>
            </div>

            <div style={{ display: 'flex', gap: spacing.md, marginBottom: spacing.md }}>
              {([
                { key: 'building' as const, label: 'Bank Account' },
                { key: 'card' as const, label: 'Debit Card' },
              ]).map(t => (
                <button
                  key={t.key}
                  onClick={() => setNewAccountType(t.key)}
                  style={{
                    flex: 1, padding: spacing.md,
                    background: newAccountType === t.key ? colors.accent.muted : 'transparent',
                    border: `1px solid ${newAccountType === t.key ? colors.accent.primary + '66' : colors.border.primary}`,
                    borderRadius: radii.md, cursor: 'pointer',
                    color: newAccountType === t.key ? colors.accent.primary : colors.text.secondary,
                    fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.medium,
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <input
              placeholder="Account name (e.g. Wells Fargo Savings)"
              value={newAccountName}
              onChange={e => setNewAccountName(e.target.value)}
              style={{
                width: '100%', padding: spacing.md,
                background: colors.bg.tertiary, border: `1px solid ${colors.border.primary}`,
                borderRadius: radii.md, color: colors.text.primary,
                fontSize: typography.fontSize.sm, marginBottom: spacing.md,
                outline: 'none', boxSizing: 'border-box',
              }}
            />
            <input
              placeholder="Account number"
              value={newAccountNumber}
              onChange={e => setNewAccountNumber(e.target.value.replace(/\D/g, ''))}
              style={{
                width: '100%', padding: spacing.md,
                background: colors.bg.tertiary, border: `1px solid ${colors.border.primary}`,
                borderRadius: radii.md, color: colors.text.primary,
                fontSize: typography.fontSize.sm, marginBottom: spacing.md,
                outline: 'none', boxSizing: 'border-box',
              }}
            />
            <button
              onClick={handleAddAccount}
              disabled={!newAccountName.trim() || newAccountNumber.length < 4}
              style={{
                width: '100%', padding: spacing.md,
                background: newAccountName.trim() && newAccountNumber.length >= 4 ? colors.accent.primary : colors.text.tertiary + '44',
                color: newAccountName.trim() && newAccountNumber.length >= 4 ? colors.text.inverse : colors.text.tertiary,
                border: 'none', borderRadius: radii.md,
                fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold,
                cursor: newAccountName.trim() && newAccountNumber.length >= 4 ? 'pointer' : 'not-allowed',
              }}
            >
              Link Account
            </button>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.sm }}>
          {accounts.map(account => (
            <div key={account.id} style={{
              background: colors.bg.card,
              borderRadius: radii.md,
              padding: spacing.md,
              border: `1px solid ${colors.border.primary}`,
              display: 'flex', alignItems: 'center', gap: spacing.md,
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: radii.sm,
                background: colors.accent.muted,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: colors.accent.primary,
              }}>
                {account.icon === 'building' ? <Building2 size={20} /> : <CreditCard size={20} />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: colors.text.primary, fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.medium }}>{account.name}</div>
                <div style={{ color: colors.text.tertiary, fontSize: typography.fontSize.xs }}>{account.detail}</div>
              </div>
              <span style={{
                display: 'flex', alignItems: 'center', gap: spacing.xs,
                color: colors.status.gain, fontSize: typography.fontSize.xs,
              }}>
                <CheckCircle2 size={14} /> {account.status}
              </span>
              <button
                onClick={() => removeAccount(account.id)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: colors.text.tertiary, padding: '4px',
                }}
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Deposit history */}
      <div style={{ marginTop: spacing.xl }}>
        <SectionHeader title="Deposit History" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.sm }}>
          {depositHistory.map(d => (
            <div key={d.id} style={{
              background: colors.bg.card,
              borderRadius: radii.md,
              padding: spacing.md,
              border: `1px solid ${colors.border.primary}`,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: spacing.md }}>
                <div style={{
                  width: 40, height: 40, borderRadius: radii.sm,
                  background: 'rgba(9, 132, 227, 0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: colors.accent.tertiary,
                }}>
                  <Clock size={18} />
                </div>
                <div>
                  <div style={{ color: colors.text.primary, fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.medium }}>
                    ${d.amount.toLocaleString()} Deposit
                  </div>
                  <div style={{ color: colors.text.tertiary, fontSize: typography.fontSize.xs }}>
                    {d.method} — {new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>
              </div>
              <span style={{
                color: colors.status.gain,
                fontSize: typography.fontSize.xs,
                fontWeight: typography.fontWeight.semibold,
                background: `${colors.status.gain}22`,
                padding: `2px ${spacing.sm}`,
                borderRadius: radii.full,
                textTransform: 'capitalize',
              }}>{d.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent transactions */}
      <div style={{ marginTop: spacing.xl }}>
        <SectionHeader title="Recent Transactions" />
        <ActivityList activities={recentActivity} />
      </div>

      {/* Deposit / Withdraw Modal */}
      {modal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000,
          backdropFilter: 'blur(4px)',
        }}
          onClick={() => { setModal(null); setAmount(''); setSubmitted(false); }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: colors.bg.card,
              borderRadius: radii.xl,
              padding: spacing.xl,
              width: 400, maxWidth: '90vw',
              border: `1px solid ${colors.border.primary}`,
              boxShadow: shadows.xl,
            }}
          >
            {submitted ? (
              <div style={{ textAlign: 'center', padding: spacing.xl }}>
                <div style={{
                  width: 64, height: 64, borderRadius: '50%',
                  background: `${colors.status.gain}22`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto', marginBottom: spacing.lg,
                }}>
                  <CheckCircle2 size={32} color={colors.status.gain} />
                </div>
                <div style={{ color: colors.text.primary, fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.semibold, marginBottom: spacing.sm }}>
                  {modal === 'deposit' ? 'Deposit' : 'Withdrawal'} Initiated
                </div>
                <div style={{ color: colors.text.secondary, fontSize: typography.fontSize.sm }}>
                  ${Number(amount).toLocaleString()} via {selectedMethod === 'bank' ? 'Bank Transfer' : 'Debit Card'}
                </div>
                <div style={{ color: colors.text.tertiary, fontSize: typography.fontSize.xs, marginTop: spacing.sm }}>
                  Processing time: {selectedMethod === 'bank' ? '1-3 business days' : 'Instant'}
                </div>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.xl }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
                    {modal === 'deposit' ? <ArrowDownRight size={20} color={colors.accent.primary} /> : <ArrowUpRight size={20} color={colors.status.warning} />}
                    <h2 style={{ color: colors.text.primary, fontSize: typography.fontSize.xl, fontWeight: typography.fontWeight.bold, margin: 0 }}>
                      {modal === 'deposit' ? 'Deposit Funds' : 'Withdraw Funds'}
                    </h2>
                  </div>
                  <button onClick={() => { setModal(null); setAmount(''); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: colors.text.tertiary }}>
                    <X size={20} />
                  </button>
                </div>

                {/* Amount input */}
                <div style={{ marginBottom: spacing.lg }}>
                  <label style={{ color: colors.text.secondary, fontSize: typography.fontSize.xs, marginBottom: spacing.sm, display: 'block' }}>Amount</label>
                  <div style={{ position: 'relative' }}>
                    <span style={{
                      position: 'absolute', left: spacing.md, top: '50%', transform: 'translateY(-50%)',
                      color: colors.text.tertiary, fontSize: typography.fontSize.xl,
                    }}>$</span>
                    <input
                      type="text"
                      value={amount}
                      onChange={e => {
                        const v = e.target.value.replace(/[^0-9.]/g, '');
                        setAmount(v);
                      }}
                      placeholder="0.00"
                      style={{
                        width: '100%', padding: `${spacing.md} ${spacing.md} ${spacing.md} ${spacing.xl}`,
                        background: colors.bg.tertiary, border: `1px solid ${colors.border.primary}`,
                        borderRadius: radii.md, color: colors.text.primary,
                        fontSize: typography.fontSize.xl, fontWeight: typography.fontWeight.bold,
                        outline: 'none', boxSizing: 'border-box',
                      }}
                    />
                  </div>
                  {modal === 'withdraw' && (
                    <div style={{ color: colors.text.tertiary, fontSize: typography.fontSize.xs, marginTop: spacing.xs }}>
                      Available: ${portfolioSummary.cashBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </div>
                  )}
                </div>

                {/* Presets */}
                <div style={{ display: 'flex', gap: spacing.sm, marginBottom: spacing.lg, flexWrap: 'wrap' }}>
                  {presets.map(p => (
                    <button
                      key={p}
                      onClick={() => setAmount(p.toString())}
                      style={{
                        flex: 1, minWidth: 70,
                        padding: `${spacing.sm} ${spacing.md}`,
                        background: amount === p.toString() ? colors.accent.muted : colors.bg.tertiary,
                        border: `1px solid ${amount === p.toString() ? colors.accent.primary + '66' : colors.border.primary}`,
                        borderRadius: radii.md, cursor: 'pointer',
                        color: amount === p.toString() ? colors.accent.primary : colors.text.secondary,
                        fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.medium,
                      }}
                    >
                      ${p.toLocaleString()}
                    </button>
                  ))}
                </div>

                {/* Method selector */}
                <div style={{ marginBottom: spacing.xl }}>
                  <label style={{ color: colors.text.secondary, fontSize: typography.fontSize.xs, marginBottom: spacing.sm, display: 'block' }}>Payment Method</label>
                  <div style={{ display: 'flex', gap: spacing.md }}>
                    {[
                      { key: 'bank', label: 'Bank Transfer', sub: '1-3 days', icon: <Building2 size={18} /> },
                      { key: 'card', label: 'Debit Card', sub: 'Instant', icon: <CreditCard size={18} /> },
                    ].map(m => (
                      <button
                        key={m.key}
                        onClick={() => setSelectedMethod(m.key)}
                        style={{
                          flex: 1, padding: spacing.md,
                          background: selectedMethod === m.key ? colors.accent.muted : colors.bg.tertiary,
                          border: `1px solid ${selectedMethod === m.key ? colors.accent.primary + '66' : colors.border.primary}`,
                          borderRadius: radii.md, cursor: 'pointer',
                          textAlign: 'left',
                        }}
                      >
                        <div style={{ color: selectedMethod === m.key ? colors.accent.primary : colors.text.tertiary, marginBottom: spacing.xs }}>{m.icon}</div>
                        <div style={{ color: selectedMethod === m.key ? colors.text.primary : colors.text.secondary, fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.medium }}>{m.label}</div>
                        <div style={{ color: colors.text.tertiary, fontSize: typography.fontSize.xs }}>{m.sub}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit */}
                <button
                  onClick={handleSubmit}
                  disabled={!amount || Number(amount) <= 0 || (modal === 'withdraw' && Number(amount) > portfolioSummary.cashBalance)}
                  style={{
                    width: '100%', padding: spacing.md,
                    background: amount && Number(amount) > 0 && !(modal === 'withdraw' && Number(amount) > portfolioSummary.cashBalance) ? colors.accent.primary : colors.text.tertiary + '44',
                    color: amount && Number(amount) > 0 ? colors.text.inverse : colors.text.tertiary,
                    border: 'none', borderRadius: radii.md,
                    fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.semibold,
                    cursor: amount && Number(amount) > 0 ? 'pointer' : 'not-allowed',
                  }}
                >
                  {modal === 'deposit' ? 'Deposit' : 'Withdraw'} {amount ? `$${Number(amount).toLocaleString()}` : ''}
                </button>

                {modal === 'withdraw' && Number(amount) > portfolioSummary.cashBalance && (
                  <div style={{ color: colors.status.loss, fontSize: typography.fontSize.xs, marginTop: spacing.sm, textAlign: 'center' }}>
                    Insufficient cash balance
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
