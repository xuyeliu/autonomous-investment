import { useState, useEffect } from 'react';
import { colors, spacing, typography, radii } from '../../styles/tokens';

const STORAGE_KEY_PREFIX = 'atlas_settings_';

interface Toggle {
  key: string;
  label: string;
  description: string;
  defaultValue: boolean;
}

const toggles: Toggle[] = [
  { key: 'autoTrade', label: 'Auto-Trade', description: 'Let AI execute trades automatically', defaultValue: true },
  { key: 'notifications', label: 'Notifications', description: 'Get alerts for trades and opportunities', defaultValue: true },
  { key: 'dailyBriefing', label: 'Daily Briefing', description: 'Morning portfolio summary', defaultValue: true },
];

const riskOptions = ['Conservative', 'Balanced', 'Aggressive'];

function loadSettings(): Record<string, boolean> {
  const defaults: Record<string, boolean> = { autoTrade: true, notifications: true, dailyBriefing: true };
  for (const key of Object.keys(defaults)) {
    const stored = localStorage.getItem(STORAGE_KEY_PREFIX + key);
    if (stored !== null) {
      defaults[key] = stored === 'true';
    }
  }
  return defaults;
}

function loadRisk(): string {
  return localStorage.getItem(STORAGE_KEY_PREFIX + 'risk') || 'Balanced';
}

export default function SettingsCard() {
  const [settings, setSettings] = useState<Record<string, boolean>>(loadSettings);
  const [risk, setRisk] = useState(loadRisk);

  // P0 FIX: Persist settings to localStorage
  useEffect(() => {
    for (const [key, value] of Object.entries(settings)) {
      localStorage.setItem(STORAGE_KEY_PREFIX + key, String(value));
    }
  }, [settings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PREFIX + 'risk', risk);
  }, [risk]);

  // Listen for external risk changes (e.g. from chat command "set risk to aggressive")
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY_PREFIX + 'risk' && e.newValue) {
        setRisk(e.newValue);
      }
      for (const toggle of toggles) {
        if (e.key === STORAGE_KEY_PREFIX + toggle.key && e.newValue !== null) {
          setSettings(prev => ({ ...prev, [toggle.key]: e.newValue === 'true' }));
        }
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return (
    <div style={{
      background: colors.bg.card,
      borderRadius: radii.lg,
      padding: spacing.lg,
      border: `1px solid ${colors.border.primary}`,
    }}>
      <div style={{
        fontSize: typography.fontSize.xs,
        color: colors.text.tertiary,
        textTransform: 'uppercase' as const,
        letterSpacing: '0.05em',
        marginBottom: spacing.lg,
        fontWeight: typography.fontWeight.semibold,
      }}>
        Settings
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md, marginBottom: spacing.lg }}>
        {toggles.map(t => (
          <div key={t.key} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div>
              <div style={{ fontSize: typography.fontSize.sm, color: colors.text.primary, fontWeight: typography.fontWeight.medium }}>
                {t.label}
              </div>
              <div style={{ fontSize: typography.fontSize.xs, color: colors.text.tertiary }}>
                {t.description}
              </div>
            </div>
            <button
              onClick={() => setSettings(prev => ({ ...prev, [t.key]: !prev[t.key] }))}
              style={{
                width: 44,
                height: 24,
                borderRadius: radii.full,
                background: settings[t.key] ? colors.accent.primary : colors.bg.tertiary,
                position: 'relative' as const,
                cursor: 'pointer',
                transition: 'background 0.2s',
                border: `1px solid ${settings[t.key] ? colors.accent.primary : colors.border.primary}`,
                flexShrink: 0,
              }}
            >
              <div style={{
                width: 18,
                height: 18,
                borderRadius: '50%',
                background: colors.text.primary,
                position: 'absolute' as const,
                top: 2,
                left: settings[t.key] ? 22 : 2,
                transition: 'left 0.2s',
              }} />
            </button>
          </div>
        ))}
      </div>

      <div>
        <div style={{
          fontSize: typography.fontSize.sm,
          color: colors.text.primary,
          fontWeight: typography.fontWeight.medium,
          marginBottom: spacing.sm,
        }}>
          Risk Level
        </div>
        <div style={{ display: 'flex', gap: spacing.sm }}>
          {riskOptions.map(opt => (
            <button
              key={opt}
              onClick={() => setRisk(opt)}
              style={{
                flex: 1,
                padding: `${spacing.sm} ${spacing.sm}`,
                borderRadius: radii.md,
                background: risk === opt ? colors.accent.muted : colors.bg.tertiary,
                border: risk === opt ? `1px solid ${colors.accent.primary}` : `1px solid ${colors.border.primary}`,
                color: risk === opt ? colors.accent.primary : colors.text.secondary,
                fontSize: typography.fontSize.xs,
                fontWeight: typography.fontWeight.semibold,
                cursor: 'pointer',
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div style={{
        marginTop: spacing.lg,
        padding: spacing.sm,
        background: `${colors.text.tertiary}10`,
        borderRadius: radii.sm,
        fontSize: typography.fontSize.xs,
        color: colors.text.tertiary,
        lineHeight: typography.lineHeight.relaxed,
      }}>
        Past performance does not guarantee future results. All investments carry risk.
      </div>
    </div>
  );
}
