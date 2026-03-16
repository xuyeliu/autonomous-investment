import { useState } from 'react';
import { Bot, Shield, Zap, Activity, Target, AlertTriangle, BarChart3, Save, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';
import AutoTradeToggle from '../components/AutoTradeToggle';
import SectionHeader from '../components/SectionHeader';
import StatCard from '../components/StatCard';
import { aiStatus } from '../data/mock';
import { colors, spacing, typography, radii, shadows } from '../styles/tokens';

type AgentMode = 'conservative' | 'balanced' | 'aggressive';

const modeConfig: Record<AgentMode, { label: string; desc: string; color: string; icon: React.ReactNode }> = {
  conservative: { label: 'Conservative', desc: 'Lower risk, steady returns. Focuses on blue-chip stocks and bonds.', color: '#0984E3', icon: <Shield size={20} /> },
  balanced: { label: 'Balanced', desc: 'Moderate risk and reward. Diversified across sectors.', color: '#00D4AA', icon: <Target size={20} /> },
  aggressive: { label: 'Aggressive', desc: 'Higher risk, higher potential returns. Growth and momentum plays.', color: '#FF6B6B', icon: <Zap size={20} /> },
};

export default function AIAgentPage() {
  const [autoTrade, setAutoTrade] = useState(aiStatus.isActive);
  const [mode, setMode] = useState<AgentMode>(aiStatus.mode as AgentMode);
  const [maxTrade, setMaxTrade] = useState(aiStatus.safeguards.maxTradeSize);
  const [dailyLimit, setDailyLimit] = useState(aiStatus.safeguards.dailyTradeLimit);
  const [stopLoss, setStopLoss] = useState(aiStatus.safeguards.stopLossPercent);
  const [editingLimits, setEditingLimits] = useState(false);
  const [savedLimits, setSavedLimits] = useState({ maxTrade, dailyLimit, stopLoss });
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [expandedStep, setExpandedStep] = useState<string | null>(null);

  const hasLimitChanges = maxTrade !== savedLimits.maxTrade || dailyLimit !== savedLimits.dailyLimit || stopLoss !== savedLimits.stopLoss;

  const handleSaveLimits = () => {
    setSavedLimits({ maxTrade, dailyLimit, stopLoss });
    setEditingLimits(false);
    setShowSaveConfirm(true);
    setTimeout(() => setShowSaveConfirm(false), 2500);
  };

  const handleResetLimits = () => {
    setMaxTrade(savedLimits.maxTrade);
    setDailyLimit(savedLimits.dailyLimit);
    setStopLoss(savedLimits.stopLoss);
  };

  const steps = [
    { icon: <BarChart3 size={20} />, title: 'Market Analysis', desc: 'Continuously scans market data, news, and patterns to identify opportunities.', detail: 'The AI processes over 10,000 data points daily including price movements, volume changes, news sentiment, SEC filings, and social media trends to build a comprehensive market picture.' },
    { icon: <Target size={20} />, title: 'Signal Generation', desc: 'Generates buy/sell/hold signals based on multiple AI models and strategies.', detail: 'Uses an ensemble of 5 different AI models including momentum analysis, fundamental scoring, sentiment analysis, technical patterns, and macro-economic indicators to generate high-confidence signals.' },
    { icon: <Shield size={20} />, title: 'Risk Management', desc: 'Every trade goes through risk checks to protect your portfolio.', detail: 'Before any trade is executed, it must pass position sizing checks, portfolio concentration limits, correlation analysis, and your configured stop-loss thresholds.' },
    { icon: <Zap size={20} />, title: 'Execution', desc: 'Approved trades are executed at optimal timing and pricing.', detail: 'Smart order routing finds the best execution price. Orders are timed to minimize market impact and slippage, often splitting larger orders into smaller blocks.' },
  ];

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <h1 style={{
        fontSize: typography.fontSize['2xl'],
        fontWeight: typography.fontWeight.bold,
        color: colors.text.primary,
        marginBottom: spacing.xs,
      }}>AI Trading Agent</h1>
      <p style={{
        color: colors.text.secondary,
        fontSize: typography.fontSize.sm,
        marginBottom: spacing.xl,
      }}>
        Your AI agent analyzes markets 24/7 and can trade automatically within your set limits.
      </p>

      <AutoTradeToggle enabled={autoTrade} onToggle={setAutoTrade} />

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: spacing.md, marginTop: spacing.xl }}>
        <StatCard label="Trades This Week" value={aiStatus.tradesThisWeek.toString()} icon={<Activity size={16} />} />
        <StatCard label="Win Rate" value={`${aiStatus.winRate}%`} change="Last 30 days" changeType="gain" icon={<Target size={16} />} />
        <StatCard label="Mode" value={modeConfig[mode].label} icon={<BarChart3 size={16} />} />
      </div>

      {/* Mode Selector */}
      <div style={{ marginTop: spacing.xl }}>
        <SectionHeader title="Trading Mode" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: spacing.md }}>
          {(Object.entries(modeConfig) as [AgentMode, typeof modeConfig[AgentMode]][]).map(([key, cfg]) => {
            const active = mode === key;
            return (
              <button
                key={key}
                onClick={() => setMode(key)}
                style={{
                  background: active ? `${cfg.color}15` : colors.bg.card,
                  border: `1px solid ${active ? cfg.color + '66' : colors.border.primary}`,
                  borderRadius: radii.lg,
                  padding: spacing.lg,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                  boxShadow: active ? `0 0 20px ${cfg.color}22` : 'none',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {active && (
                  <div style={{
                    position: 'absolute', top: spacing.sm, right: spacing.sm,
                    width: 8, height: 8, borderRadius: '50%',
                    background: cfg.color,
                  }} />
                )}
                <div style={{
                  width: 40, height: 40, borderRadius: radii.sm,
                  background: `${cfg.color}22`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: cfg.color, marginBottom: spacing.md,
                }}>{cfg.icon}</div>
                <div style={{
                  color: active ? colors.text.primary : colors.text.secondary,
                  fontSize: typography.fontSize.sm,
                  fontWeight: typography.fontWeight.semibold,
                  marginBottom: spacing.xs,
                }}>{cfg.label}</div>
                <div style={{
                  color: colors.text.tertiary,
                  fontSize: typography.fontSize.xs,
                  lineHeight: typography.lineHeight.relaxed,
                }}>{cfg.desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* How the AI works - expandable */}
      <div style={{ marginTop: spacing.xl }}>
        <SectionHeader title="How Your AI Agent Works" />
        <div style={{
          background: colors.bg.card,
          borderRadius: radii.lg,
          padding: spacing.xl,
          border: `1px solid ${colors.border.primary}`,
        }}>
          {steps.map(step => {
            const expanded = expandedStep === step.title;
            return (
              <button
                key={step.title}
                onClick={() => setExpandedStep(expanded ? null : step.title)}
                style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  background: 'transparent', border: 'none', cursor: 'pointer',
                  padding: `${spacing.md} 0`,
                  borderBottom: `1px solid ${colors.border.secondary}`,
                }}
              >
                <div style={{ display: 'flex', gap: spacing.md, alignItems: 'flex-start' }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: radii.sm,
                    background: colors.accent.muted,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: colors.accent.primary, flexShrink: 0,
                  }}>{step.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ color: colors.text.primary, fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.sm }}>{step.title}</div>
                      {expanded ? <ChevronUp size={16} color={colors.text.tertiary} /> : <ChevronDown size={16} color={colors.text.tertiary} />}
                    </div>
                    <div style={{ color: colors.text.secondary, fontSize: typography.fontSize.sm }}>{step.desc}</div>
                    {expanded && (
                      <div style={{
                        marginTop: spacing.md,
                        padding: spacing.md,
                        background: colors.bg.tertiary,
                        borderRadius: radii.md,
                        color: colors.text.secondary,
                        fontSize: typography.fontSize.xs,
                        lineHeight: typography.lineHeight.relaxed,
                      }}>
                        {step.detail}
                      </div>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Safeguards - editable */}
      <div style={{ marginTop: spacing.xl }}>
        <SectionHeader
          title="Safety Limits"
          action={editingLimits ? undefined : 'Edit'}
          onAction={() => setEditingLimits(true)}
        />

        {/* Save confirmation toast */}
        {showSaveConfirm && (
          <div style={{
            background: `${colors.status.gain}22`,
            border: `1px solid ${colors.status.gain}44`,
            borderRadius: radii.md,
            padding: spacing.md,
            marginBottom: spacing.md,
            display: 'flex', alignItems: 'center', gap: spacing.sm,
            color: colors.status.gain,
            fontSize: typography.fontSize.sm,
            fontWeight: typography.fontWeight.medium,
          }}>
            <Save size={16} /> Safety limits updated successfully
          </div>
        )}

        <div style={{
          background: colors.bg.card,
          borderRadius: radii.lg,
          padding: spacing.xl,
          border: `1px solid ${colors.border.primary}`,
          display: 'flex', flexDirection: 'column', gap: spacing.lg,
        }}>
          {/* Max trade size */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: editingLimits ? spacing.md : 0 }}>
              <div>
                <div style={{ color: colors.text.primary, fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.medium }}>Max trade size</div>
                <div style={{ color: colors.text.tertiary, fontSize: typography.fontSize.xs }}>Maximum dollar amount per trade</div>
              </div>
              <span style={{
                color: colors.accent.primary,
                fontSize: typography.fontSize.base,
                fontWeight: typography.fontWeight.semibold,
              }}>${maxTrade}</span>
            </div>
            {editingLimits && (
              <div>
                <input
                  type="range" min={100} max={5000} step={100} value={maxTrade}
                  onChange={e => setMaxTrade(Number(e.target.value))}
                  style={{ width: '100%', accentColor: colors.accent.primary }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', color: colors.text.tertiary, fontSize: typography.fontSize.xs }}>
                  <span>$100</span><span>$5,000</span>
                </div>
              </div>
            )}
          </div>

          <div style={{ borderBottom: `1px solid ${colors.border.secondary}` }} />

          {/* Daily trade limit */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: editingLimits ? spacing.md : 0 }}>
              <div>
                <div style={{ color: colors.text.primary, fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.medium }}>Daily trade limit</div>
                <div style={{ color: colors.text.tertiary, fontSize: typography.fontSize.xs }}>Maximum trades per day</div>
              </div>
              <span style={{
                color: colors.accent.primary,
                fontSize: typography.fontSize.base,
                fontWeight: typography.fontWeight.semibold,
              }}>{dailyLimit} trades</span>
            </div>
            {editingLimits && (
              <div>
                <input
                  type="range" min={1} max={20} step={1} value={dailyLimit}
                  onChange={e => setDailyLimit(Number(e.target.value))}
                  style={{ width: '100%', accentColor: colors.accent.primary }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', color: colors.text.tertiary, fontSize: typography.fontSize.xs }}>
                  <span>1</span><span>20</span>
                </div>
              </div>
            )}
          </div>

          <div style={{ borderBottom: `1px solid ${colors.border.secondary}` }} />

          {/* Stop-loss threshold */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: editingLimits ? spacing.md : 0 }}>
              <div>
                <div style={{ color: colors.text.primary, fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.medium }}>Stop-loss threshold</div>
                <div style={{ color: colors.text.tertiary, fontSize: typography.fontSize.xs }}>Auto-sell if position drops this much</div>
              </div>
              <span style={{
                color: stopLoss >= 15 ? colors.status.loss : stopLoss >= 10 ? colors.status.warning : colors.accent.primary,
                fontSize: typography.fontSize.base,
                fontWeight: typography.fontWeight.semibold,
              }}>{stopLoss}%</span>
            </div>
            {editingLimits && (
              <div>
                <input
                  type="range" min={2} max={25} step={1} value={stopLoss}
                  onChange={e => setStopLoss(Number(e.target.value))}
                  style={{ width: '100%', accentColor: stopLoss >= 15 ? colors.status.loss : stopLoss >= 10 ? colors.status.warning : colors.accent.primary }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', color: colors.text.tertiary, fontSize: typography.fontSize.xs }}>
                  <span>2%</span><span>25%</span>
                </div>
              </div>
            )}
          </div>

          {/* Edit mode buttons */}
          {editingLimits && (
            <div style={{ display: 'flex', gap: spacing.md }}>
              <button
                onClick={handleSaveLimits}
                disabled={!hasLimitChanges}
                style={{
                  flex: 1,
                  background: hasLimitChanges ? colors.accent.primary : colors.text.tertiary + '44',
                  color: hasLimitChanges ? colors.text.inverse : colors.text.tertiary,
                  border: 'none', borderRadius: radii.md,
                  padding: `${spacing.md} ${spacing.lg}`,
                  fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold,
                  cursor: hasLimitChanges ? 'pointer' : 'not-allowed',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: spacing.sm,
                }}
              >
                <Save size={16} /> Save Changes
              </button>
              <button
                onClick={() => { handleResetLimits(); setEditingLimits(false); }}
                style={{
                  background: 'transparent',
                  color: colors.text.secondary,
                  border: `1px solid ${colors.border.primary}`, borderRadius: radii.md,
                  padding: `${spacing.md} ${spacing.lg}`,
                  fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.medium,
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: spacing.sm,
                }}
              >
                <RotateCcw size={16} /> Cancel
              </button>
            </div>
          )}

          <div style={{
            display: 'flex', alignItems: 'center', gap: spacing.sm,
            background: `${colors.status.warning}11`,
            borderRadius: radii.md,
            padding: spacing.md,
          }}>
            <AlertTriangle size={16} color={colors.status.warning} />
            <span style={{ color: colors.text.secondary, fontSize: typography.fontSize.xs }}>
              You can adjust these limits anytime. The AI will never exceed your safety parameters.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
