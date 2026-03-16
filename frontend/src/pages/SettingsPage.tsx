import { useState } from 'react';
import { User, Bell, Shield, Bot, CreditCard, LogOut, ChevronRight, Moon, Smartphone, X, Check, Flame, Scale } from 'lucide-react';
import { colors, spacing, typography, radii, shadows } from '../styles/tokens';

interface SettingItemProps {
  icon: React.ReactNode;
  label: string;
  detail?: string;
  onClick?: () => void;
  toggle?: boolean;
  toggleValue?: boolean;
  onToggle?: (v: boolean) => void;
}

function SettingItem({ icon, label, detail, onClick, toggle, toggleValue, onToggle }: SettingItemProps) {
  return (
    <button
      onClick={toggle ? () => onToggle?.(!toggleValue) : onClick}
      style={{
        width: '100%',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: spacing.md,
        padding: `${spacing.md} 0`,
        borderBottom: `1px solid ${colors.border.secondary}`,
        textAlign: 'left',
      }}
    >
      <div style={{
        width: 36, height: 36, borderRadius: radii.sm,
        background: colors.accent.muted,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: colors.accent.primary, flexShrink: 0,
      }}>{icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ color: colors.text.primary, fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.medium }}>{label}</div>
        {detail && <div style={{ color: colors.text.tertiary, fontSize: typography.fontSize.xs }}>{detail}</div>}
      </div>
      {toggle ? (
        <div style={{
          width: 44, height: 24, borderRadius: 12,
          background: toggleValue ? colors.accent.primary : colors.text.tertiary + '44',
          position: 'relative', transition: 'background 0.3s', flexShrink: 0,
        }}>
          <div style={{
            width: 18, height: 18, borderRadius: '50%', background: '#fff',
            position: 'absolute', top: 3,
            left: toggleValue ? 23 : 3,
            transition: 'left 0.3s',
          }} />
        </div>
      ) : (
        <ChevronRight size={18} color={colors.text.tertiary} />
      )}
    </button>
  );
}

type RiskLevel = 'conservative' | 'balanced' | 'aggressive';

const riskOptions: { key: RiskLevel; label: string; desc: string; icon: React.ReactNode; color: string }[] = [
  { key: 'conservative', label: 'Conservative', desc: 'Lower risk, 6-10% expected return', icon: <Shield size={20} />, color: '#0984E3' },
  { key: 'balanced', label: 'Balanced', desc: 'Moderate risk, 10-18% expected return', icon: <Scale size={20} />, color: '#00D4AA' },
  { key: 'aggressive', label: 'Aggressive', desc: 'Higher risk, 18-30% expected return', icon: <Flame size={20} />, color: '#FF6B6B' },
];

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [autoTrading, setAutoTrading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [biometric, setBiometric] = useState(false);
  const [showRiskModal, setShowRiskModal] = useState(false);
  const [risk, setRisk] = useState<RiskLevel>('balanced');
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [displayName, setDisplayName] = useState('Demo User');
  const [email, setEmail] = useState('demo@autonomous.investment');
  const [editName, setEditName] = useState(displayName);
  const [editEmail, setEditEmail] = useState(email);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);

  const handleSaveProfile = () => {
    setDisplayName(editName);
    setEmail(editEmail);
    setProfileSaved(true);
    setTimeout(() => {
      setProfileSaved(false);
      setShowProfileModal(false);
    }, 1500);
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <h1 style={{
        fontSize: typography.fontSize['2xl'],
        fontWeight: typography.fontWeight.bold,
        color: colors.text.primary,
        marginBottom: spacing.xl,
      }}>Settings</h1>

      {/* Profile card */}
      <div
        onClick={() => { setEditName(displayName); setEditEmail(email); setShowProfileModal(true); }}
        style={{
          background: colors.bg.card,
          borderRadius: radii.lg,
          padding: spacing.xl,
          border: `1px solid ${colors.border.primary}`,
          display: 'flex', alignItems: 'center', gap: spacing.md,
          marginBottom: spacing.xl,
          cursor: 'pointer',
          transition: 'border-color 0.2s',
        }}
      >
        <div style={{
          width: 56, height: 56, borderRadius: '50%',
          background: colors.accent.muted,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <User size={28} color={colors.accent.primary} />
        </div>
        <div>
          <div style={{ color: colors.text.primary, fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.semibold }}>
            {displayName}
          </div>
          <div style={{ color: colors.text.tertiary, fontSize: typography.fontSize.sm }}>
            {email}
          </div>
        </div>
        <ChevronRight size={18} color={colors.text.tertiary} style={{ marginLeft: 'auto' }} />
      </div>

      {/* Sections */}
      <div style={{
        background: colors.bg.card,
        borderRadius: radii.lg,
        padding: `${spacing.sm} ${spacing.lg}`,
        border: `1px solid ${colors.border.primary}`,
        marginBottom: spacing.lg,
      }}>
        <SettingItem icon={<Bell size={18} />} label="Push Notifications" detail="Trade alerts and updates" toggle toggleValue={notifications} onToggle={setNotifications} />
        <SettingItem icon={<Bot size={18} />} label="AI Auto-Trading" detail="Let AI execute trades automatically" toggle toggleValue={autoTrading} onToggle={setAutoTrading} />
        <SettingItem icon={<Moon size={18} />} label="Dark Mode" detail="Always on" toggle toggleValue={darkMode} onToggle={setDarkMode} />
        <SettingItem icon={<Smartphone size={18} />} label="Biometric Login" detail="Use fingerprint or Face ID" toggle toggleValue={biometric} onToggle={setBiometric} />
      </div>

      <div style={{
        background: colors.bg.card,
        borderRadius: radii.lg,
        padding: `${spacing.sm} ${spacing.lg}`,
        border: `1px solid ${colors.border.primary}`,
        marginBottom: spacing.lg,
      }}>
        <SettingItem icon={<Shield size={18} />} label="Security" detail="Password, 2FA, sessions" />
        <SettingItem icon={<CreditCard size={18} />} label="Linked Accounts" detail="Manage banks and cards" />
        <SettingItem
          icon={<User size={18} />}
          label="Risk Preference"
          detail={`Currently: ${riskOptions.find(r => r.key === risk)?.label}`}
          onClick={() => setShowRiskModal(true)}
        />
      </div>

      <div style={{
        background: colors.bg.card,
        borderRadius: radii.lg,
        padding: `${spacing.sm} ${spacing.lg}`,
        border: `1px solid ${colors.border.primary}`,
        marginBottom: spacing.lg,
      }}>
        <SettingItem icon={<LogOut size={18} />} label="Sign Out" onClick={() => setShowLogoutConfirm(true)} />
      </div>

      <div style={{
        textAlign: 'center',
        color: colors.text.tertiary,
        fontSize: typography.fontSize.xs,
        marginTop: spacing.xl,
      }}>
        <p>Autonomous Investment v1.0.0</p>
        <p style={{ marginTop: spacing.xs }}>Terms of Service · Privacy Policy · Disclosures</p>
      </div>

      {/* Risk Preference Modal */}
      {showRiskModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000, backdropFilter: 'blur(4px)',
        }} onClick={() => setShowRiskModal(false)}>
          <div onClick={e => e.stopPropagation()} style={{
            background: colors.bg.card,
            borderRadius: radii.xl,
            padding: spacing.xl,
            width: 420, maxWidth: '90vw',
            border: `1px solid ${colors.border.primary}`,
            boxShadow: shadows.xl,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.xl }}>
              <h2 style={{ color: colors.text.primary, fontSize: typography.fontSize.xl, fontWeight: typography.fontWeight.bold, margin: 0 }}>Risk Preference</h2>
              <button onClick={() => setShowRiskModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: colors.text.tertiary }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}>
              {riskOptions.map(opt => {
                const active = risk === opt.key;
                return (
                  <button
                    key={opt.key}
                    onClick={() => { setRisk(opt.key); setTimeout(() => setShowRiskModal(false), 300); }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: spacing.md,
                      padding: spacing.lg,
                      background: active ? `${opt.color}15` : colors.bg.tertiary,
                      border: `1px solid ${active ? opt.color + '66' : colors.border.primary}`,
                      borderRadius: radii.lg,
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s',
                    }}
                  >
                    <div style={{
                      width: 44, height: 44, borderRadius: radii.md,
                      background: `${opt.color}22`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: opt.color, flexShrink: 0,
                    }}>{opt.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ color: colors.text.primary, fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold }}>{opt.label}</div>
                      <div style={{ color: colors.text.tertiary, fontSize: typography.fontSize.xs }}>{opt.desc}</div>
                    </div>
                    {active && (
                      <div style={{
                        width: 24, height: 24, borderRadius: '50%',
                        background: opt.color,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        <Check size={14} color="#fff" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Profile Edit Modal */}
      {showProfileModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000, backdropFilter: 'blur(4px)',
        }} onClick={() => setShowProfileModal(false)}>
          <div onClick={e => e.stopPropagation()} style={{
            background: colors.bg.card,
            borderRadius: radii.xl,
            padding: spacing.xl,
            width: 400, maxWidth: '90vw',
            border: `1px solid ${colors.border.primary}`,
            boxShadow: shadows.xl,
          }}>
            {profileSaved ? (
              <div style={{ textAlign: 'center', padding: spacing.xl }}>
                <div style={{
                  width: 64, height: 64, borderRadius: '50%',
                  background: `${colors.status.gain}22`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto', marginBottom: spacing.lg,
                }}>
                  <Check size={32} color={colors.status.gain} />
                </div>
                <div style={{ color: colors.text.primary, fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.semibold }}>
                  Profile Updated
                </div>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.xl }}>
                  <h2 style={{ color: colors.text.primary, fontSize: typography.fontSize.xl, fontWeight: typography.fontWeight.bold, margin: 0 }}>Edit Profile</h2>
                  <button onClick={() => setShowProfileModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: colors.text.tertiary }}>
                    <X size={20} />
                  </button>
                </div>

                <div style={{ marginBottom: spacing.lg }}>
                  <label style={{ color: colors.text.secondary, fontSize: typography.fontSize.xs, marginBottom: spacing.sm, display: 'block' }}>Display Name</label>
                  <input
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                    style={{
                      width: '100%', padding: spacing.md,
                      background: colors.bg.tertiary, border: `1px solid ${colors.border.primary}`,
                      borderRadius: radii.md, color: colors.text.primary,
                      fontSize: typography.fontSize.sm, outline: 'none', boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div style={{ marginBottom: spacing.xl }}>
                  <label style={{ color: colors.text.secondary, fontSize: typography.fontSize.xs, marginBottom: spacing.sm, display: 'block' }}>Email</label>
                  <input
                    value={editEmail}
                    onChange={e => setEditEmail(e.target.value)}
                    style={{
                      width: '100%', padding: spacing.md,
                      background: colors.bg.tertiary, border: `1px solid ${colors.border.primary}`,
                      borderRadius: radii.md, color: colors.text.primary,
                      fontSize: typography.fontSize.sm, outline: 'none', boxSizing: 'border-box',
                    }}
                  />
                </div>

                <button
                  onClick={handleSaveProfile}
                  disabled={!editName.trim() || !editEmail.trim()}
                  style={{
                    width: '100%', padding: spacing.md,
                    background: editName.trim() && editEmail.trim() ? colors.accent.primary : colors.text.tertiary + '44',
                    color: editName.trim() && editEmail.trim() ? colors.text.inverse : colors.text.tertiary,
                    border: 'none', borderRadius: radii.md,
                    fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold,
                    cursor: editName.trim() && editEmail.trim() ? 'pointer' : 'not-allowed',
                  }}
                >
                  Save Profile
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000, backdropFilter: 'blur(4px)',
        }} onClick={() => setShowLogoutConfirm(false)}>
          <div onClick={e => e.stopPropagation()} style={{
            background: colors.bg.card,
            borderRadius: radii.xl,
            padding: spacing.xl,
            width: 360, maxWidth: '90vw',
            border: `1px solid ${colors.border.primary}`,
            boxShadow: shadows.xl,
            textAlign: 'center',
          }}>
            <div style={{
              width: 56, height: 56, borderRadius: '50%',
              background: `${colors.status.loss}22`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto', marginBottom: spacing.lg,
            }}>
              <LogOut size={24} color={colors.status.loss} />
            </div>
            <h3 style={{ color: colors.text.primary, fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.semibold, marginBottom: spacing.sm }}>
              Sign Out?
            </h3>
            <p style={{ color: colors.text.secondary, fontSize: typography.fontSize.sm, marginBottom: spacing.xl }}>
              Are you sure you want to sign out of your account?
            </p>
            <div style={{ display: 'flex', gap: spacing.md }}>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                style={{
                  flex: 1, padding: spacing.md,
                  background: 'transparent', color: colors.text.primary,
                  border: `1px solid ${colors.border.primary}`, borderRadius: radii.md,
                  fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.medium,
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => { setShowLogoutConfirm(false); window.location.href = '/'; }}
                style={{
                  flex: 1, padding: spacing.md,
                  background: colors.status.loss, color: '#fff',
                  border: 'none', borderRadius: radii.md,
                  fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold,
                  cursor: 'pointer',
                }}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
