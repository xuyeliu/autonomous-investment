import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, TrendingUp, Newspaper, BarChart3, ChevronDown, ChevronUp, Brain, CheckCircle, AlertTriangle, Minus } from 'lucide-react';
import { colors, spacing, typography, radii } from '../../styles/tokens';

interface DataSource {
  name: string;
  type: 'fundamental' | 'market' | 'news' | 'technical';
  detail: string;
}

interface Signal {
  label: string;
  impact: 'high' | 'medium' | 'low';
  description: string;
}

interface Reasoning {
  dataSources: DataSource[];
  signals: Signal[];
  steps: string[];
  confidenceBreakdown: {
    fundamental: number;
    technical: number;
    sentiment: number;
    risk: number;
  };
}

interface DecisionReferenceCardProps {
  trade?: Record<string, unknown>;
}

const sourceIcons: Record<string, React.ReactNode> = {
  fundamental: <Database size={13} />,
  market: <BarChart3 size={13} />,
  news: <Newspaper size={13} />,
  technical: <TrendingUp size={13} />,
};

const sourceColors: Record<string, string> = {
  fundamental: '#0984E3',
  market: '#00D4AA',
  news: '#FFD93D',
  technical: '#A29BFE',
};

const impactColors: Record<string, string> = {
  high: colors.status.gain,
  medium: colors.status.warning,
  low: colors.text.tertiary,
};

const impactIcons: Record<string, React.ReactNode> = {
  high: <AlertTriangle size={12} />,
  medium: <Minus size={12} />,
  low: <CheckCircle size={12} />,
};

export default function DecisionReferenceCard({ trade }: DecisionReferenceCardProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>('signals');

  const ticker = (trade?.ticker as string) || 'NVDA';
  const action = (trade?.action as string) || 'buy';
  const confidence = (trade?.confidence as number) || 90;
  const reasoning = trade?.reasoning as Reasoning | undefined;

  if (!reasoning) return null;

  const actionColors: Record<string, string> = {
    buy: colors.status.gain,
    sell: colors.status.loss,
    hold: colors.status.warning,
  };

  const toggleSection = (section: string) => {
    setExpandedSection(prev => prev === section ? null : section);
  };

  const SectionHeader = ({ id, title, icon }: { id: string; title: string; icon: React.ReactNode }) => (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={() => toggleSection(id)}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: `${spacing.sm} 0`,
        background: 'transparent',
        cursor: 'pointer',
        color: colors.text.primary,
        borderTop: `1px solid ${colors.border.primary}`,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
        <span style={{ color: colors.accent.primary }}>{icon}</span>
        <span style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold }}>
          {title}
        </span>
      </div>
      {expandedSection === id ? <ChevronUp size={16} color={colors.text.tertiary} /> : <ChevronDown size={16} color={colors.text.tertiary} />}
    </motion.button>
  );

  return (
    <div style={{
      background: colors.bg.card,
      borderRadius: radii.lg,
      padding: spacing.lg,
      border: `1px solid ${colors.border.primary}`,
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: spacing.md,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
          <div style={{
            width: 32,
            height: 32,
            borderRadius: radii.sm,
            background: `linear-gradient(135deg, ${colors.accent.primary}30, ${colors.accent.secondary}30)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Brain size={18} color={colors.accent.primary} />
          </div>
          <div>
            <div style={{
              fontSize: typography.fontSize.sm,
              fontWeight: typography.fontWeight.bold,
              color: colors.text.primary,
            }}>
              Decision Reference
            </div>
            <div style={{
              fontSize: typography.fontSize.xs,
              color: colors.text.tertiary,
            }}>
              {ticker} — <span style={{ color: actionColors[action], textTransform: 'uppercase' }}>{action}</span>
            </div>
          </div>
        </div>
        <div style={{
          fontSize: typography.fontSize.xs,
          color: colors.accent.primary,
          display: 'flex',
          alignItems: 'center',
          gap: 4,
        }}>
          <Brain size={12} />
          {confidence}% confidence
        </div>
      </div>

      {/* Confidence Breakdown Bar */}
      <div style={{ marginBottom: spacing.md }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: spacing.xs,
        }}>
          {Object.entries(reasoning.confidenceBreakdown).map(([key, value]) => (
            <div key={key} style={{ textAlign: 'center' as const, flex: 1 }}>
              <div style={{
                fontSize: 10,
                color: colors.text.tertiary,
                textTransform: 'capitalize' as const,
                marginBottom: 2,
              }}>
                {key}
              </div>
              <div style={{
                fontSize: typography.fontSize.xs,
                fontWeight: typography.fontWeight.semibold,
                color: value >= 85 ? colors.status.gain : value >= 70 ? colors.status.warning : colors.status.loss,
              }}>
                {value}%
              </div>
            </div>
          ))}
        </div>
        <div style={{
          display: 'flex',
          gap: 2,
          height: 4,
          borderRadius: radii.full,
          overflow: 'hidden',
        }}>
          <div style={{ flex: reasoning.confidenceBreakdown.fundamental, background: '#0984E3', borderRadius: radii.full }} />
          <div style={{ flex: reasoning.confidenceBreakdown.technical, background: '#A29BFE', borderRadius: radii.full }} />
          <div style={{ flex: reasoning.confidenceBreakdown.sentiment, background: '#FFD93D', borderRadius: radii.full }} />
          <div style={{ flex: reasoning.confidenceBreakdown.risk, background: '#00D4AA', borderRadius: radii.full }} />
        </div>
      </div>

      {/* Key Signals */}
      <SectionHeader id="signals" title="Key Signals" icon={<AlertTriangle size={14} />} />
      <AnimatePresence>
        {expandedSection === 'signals' && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.sm, paddingBottom: spacing.sm }}>
              {reasoning.signals.map((signal, i) => (
                <div key={i} style={{
                  padding: spacing.sm,
                  background: colors.bg.tertiary,
                  borderRadius: radii.sm,
                  borderLeft: `2px solid ${impactColors[signal.impact]}`,
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 2,
                  }}>
                    <span style={{
                      fontSize: typography.fontSize.xs,
                      fontWeight: typography.fontWeight.semibold,
                      color: colors.text.primary,
                    }}>
                      {signal.label}
                    </span>
                    <span style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 3,
                      fontSize: 10,
                      color: impactColors[signal.impact],
                      textTransform: 'uppercase' as const,
                      fontWeight: typography.fontWeight.semibold,
                    }}>
                      {impactIcons[signal.impact]} {signal.impact}
                    </span>
                  </div>
                  <div style={{
                    fontSize: 11,
                    color: colors.text.secondary,
                    lineHeight: typography.lineHeight.relaxed,
                  }}>
                    {signal.description}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Data Sources */}
      <SectionHeader id="sources" title="Data Sources" icon={<Database size={14} />} />
      <AnimatePresence>
        {expandedSection === 'sources' && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.xs, paddingBottom: spacing.sm }}>
              {reasoning.dataSources.map((source, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: spacing.sm,
                  padding: spacing.sm,
                  background: colors.bg.tertiary,
                  borderRadius: radii.sm,
                }}>
                  <div style={{
                    width: 24,
                    height: 24,
                    borderRadius: radii.sm,
                    background: `${sourceColors[source.type]}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    color: sourceColors[source.type],
                    marginTop: 1,
                  }}>
                    {sourceIcons[source.type]}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: typography.fontSize.xs,
                      fontWeight: typography.fontWeight.semibold,
                      color: colors.text.primary,
                      marginBottom: 1,
                    }}>
                      {source.name}
                    </div>
                    <div style={{
                      fontSize: 11,
                      color: colors.text.secondary,
                      lineHeight: typography.lineHeight.relaxed,
                    }}>
                      {source.detail}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Analysis Steps */}
      <SectionHeader id="steps" title="Analysis Steps" icon={<CheckCircle size={14} />} />
      <AnimatePresence>
        {expandedSection === 'steps' && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, paddingBottom: spacing.sm }}>
              {reasoning.steps.map((step, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: spacing.sm,
                  padding: `${spacing.xs} 0`,
                }}>
                  <div style={{
                    width: 20,
                    height: 20,
                    borderRadius: radii.full,
                    background: i === reasoning.steps.length - 1 ? `${colors.accent.primary}20` : colors.bg.tertiary,
                    color: i === reasoning.steps.length - 1 ? colors.accent.primary : colors.text.tertiary,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 10,
                    fontWeight: typography.fontWeight.semibold,
                    flexShrink: 0,
                    marginTop: 1,
                  }}>
                    {i + 1}
                  </div>
                  <div style={{
                    fontSize: 11,
                    color: colors.text.secondary,
                    lineHeight: typography.lineHeight.relaxed,
                    flex: 1,
                  }}>
                    {step}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
