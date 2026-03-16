import { Home, BarChart3, TrendingUp, Wallet, Settings } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { colors, spacing, typography } from '../styles/tokens';

const tabs = [
  { label: 'Home', icon: Home, path: '/dashboard' },
  { label: 'Trades', icon: BarChart3, path: '/trades' },
  { label: 'Invest', icon: TrendingUp, path: '/performance' },
  { label: 'Wallet', icon: Wallet, path: '/wallet' },
  { label: 'Settings', icon: Settings, path: '/settings' },
];

export default function BottomTabBar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      height: 72,
      background: colors.bg.secondary,
      borderTop: `1px solid ${colors.border.primary}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      padding: `0 ${spacing.sm}`,
      zIndex: 100,
    }}>
      {tabs.map(tab => {
        const active = location.pathname === tab.path;
        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 4,
              padding: spacing.sm,
              color: active ? colors.accent.primary : colors.text.tertiary,
              transition: 'color 0.2s',
            }}
          >
            <tab.icon size={22} />
            <span style={{ fontSize: '11px', fontWeight: active ? 600 : 400 }}>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
