import { useState, useRef, useEffect } from 'react';
import { Bell, User, TrendingUp, X, Check } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { notifications as initialNotifications } from '../data/mock';
import { colors, spacing, typography, radii, shadows } from '../styles/tokens';

const navItems = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Trades', path: '/trades' },
  { label: 'Performance', path: '/performance' },
  { label: 'Wallet', path: '/wallet' },
];

export default function TopNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifs, setNotifs] = useState(initialNotifications);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifs.filter(n => !n.read).length;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAsRead = (id: string) => {
    setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllRead = () => {
    setNotifs(prev => prev.map(n => ({ ...n, read: true })));
  };

  const dismissNotif = (id: string) => {
    setNotifs(prev => prev.filter(n => n.id !== id));
  };

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0,
      height: 64,
      background: colors.bg.secondary,
      borderBottom: `1px solid ${colors.border.primary}`,
      display: 'flex', alignItems: 'center',
      padding: `0 ${spacing.lg}`,
      zIndex: 100,
      backdropFilter: 'blur(12px)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm, cursor: 'pointer' }} onClick={() => navigate('/')}>
        <TrendingUp size={24} color={colors.accent.primary} />
        <span style={{
          fontSize: typography.fontSize.xl,
          fontWeight: typography.fontWeight.bold,
          color: colors.text.primary,
          letterSpacing: '-0.5px',
        }}>Autonomous Investment</span>
      </div>

      <div style={{ display: 'flex', gap: spacing.xl, marginLeft: spacing.xxxl }}>
        {navItems.map(item => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: location.pathname === item.path ? colors.accent.primary : colors.text.secondary,
              fontSize: typography.fontSize.sm,
              fontWeight: location.pathname === item.path ? typography.fontWeight.semibold : typography.fontWeight.medium,
              padding: `${spacing.sm} 0`,
              borderBottom: location.pathname === item.path ? `2px solid ${colors.accent.primary}` : '2px solid transparent',
              transition: 'all 0.2s',
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: spacing.md }}>
        {/* Notification bell with dropdown */}
        <div ref={dropdownRef} style={{ position: 'relative' }}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              position: 'relative', padding: spacing.sm,
            }}
          >
            <Bell size={20} color={showNotifications ? colors.accent.primary : colors.text.secondary} />
            {unreadCount > 0 && (
              <span style={{
                position: 'absolute', top: 2, right: 2,
                width: 8, height: 8, borderRadius: '50%',
                background: colors.status.loss,
              }} />
            )}
          </button>

          {showNotifications && (
            <div style={{
              position: 'absolute', top: '100%', right: 0,
              width: 340, marginTop: spacing.sm,
              background: colors.bg.card,
              border: `1px solid ${colors.border.primary}`,
              borderRadius: radii.lg,
              boxShadow: shadows.xl,
              overflow: 'hidden',
              zIndex: 200,
            }}>
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: `${spacing.md} ${spacing.lg}`,
                borderBottom: `1px solid ${colors.border.primary}`,
              }}>
                <span style={{ color: colors.text.primary, fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.sm }}>
                  Notifications {unreadCount > 0 && `(${unreadCount})`}
                </span>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      color: colors.accent.primary, fontSize: typography.fontSize.xs,
                      display: 'flex', alignItems: 'center', gap: '4px',
                    }}
                  >
                    <Check size={12} /> Mark all read
                  </button>
                )}
              </div>

              <div style={{ maxHeight: 300, overflowY: 'auto' }}>
                {notifs.length === 0 ? (
                  <div style={{ padding: spacing.xl, textAlign: 'center', color: colors.text.tertiary, fontSize: typography.fontSize.sm }}>
                    No notifications
                  </div>
                ) : (
                  notifs.map(n => (
                    <div
                      key={n.id}
                      onClick={() => markAsRead(n.id)}
                      style={{
                        padding: `${spacing.md} ${spacing.lg}`,
                        borderBottom: `1px solid ${colors.border.secondary}`,
                        cursor: 'pointer',
                        background: n.read ? 'transparent' : `${colors.accent.primary}08`,
                        display: 'flex', gap: spacing.md, alignItems: 'flex-start',
                        transition: 'background 0.2s',
                      }}
                    >
                      {!n.read && (
                        <div style={{
                          width: 8, height: 8, borderRadius: '50%',
                          background: colors.accent.primary, flexShrink: 0,
                          marginTop: 6,
                        }} />
                      )}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                          color: colors.text.primary, fontSize: typography.fontSize.sm,
                          fontWeight: n.read ? typography.fontWeight.normal : typography.fontWeight.semibold,
                        }}>{n.title}</div>
                        <div style={{
                          color: colors.text.tertiary, fontSize: typography.fontSize.xs,
                          marginTop: '2px',
                          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                        }}>{n.body}</div>
                        <div style={{ color: colors.text.tertiary, fontSize: typography.fontSize.xs, marginTop: '4px' }}>{n.time}</div>
                      </div>
                      <button
                        onClick={e => { e.stopPropagation(); dismissNotif(n.id); }}
                        style={{
                          background: 'none', border: 'none', cursor: 'pointer',
                          color: colors.text.tertiary, padding: '2px', flexShrink: 0,
                        }}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <button onClick={() => navigate('/settings')} style={{
          width: 36, height: 36, borderRadius: '50%',
          background: colors.accent.muted,
          border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <User size={18} color={colors.accent.primary} />
        </button>
      </div>
    </nav>
  );
}
