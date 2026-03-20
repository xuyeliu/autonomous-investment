import { motion } from 'framer-motion';
import { Brain, Search, UserCheck, HelpCircle, Scale, Layers } from 'lucide-react';
import { colors, spacing, typography, radii } from '../../styles/tokens';

const pipeline = [
  {
    icon: <Search size={16} />,
    title: 'Deep Research',
    description: 'Exhaustively scans SEC filings, earnings calls, sell-side research, news, social sentiment, and real-time market data — the same sources a top analyst would read, but across 4,200+ equities simultaneously.',
    color: '#0984E3',
  },
  {
    icon: <UserCheck size={16} />,
    title: 'Think Like an Expert Investor',
    description: 'Applies the mental models of institutional investors: evaluating business moats, management quality, competitive dynamics, and macro tailwinds — not just numbers, but the story behind them.',
    color: '#A29BFE',
  },
  {
    icon: <HelpCircle size={16} />,
    title: 'Ask the Right Questions',
    description: 'For every candidate, the AI stress-tests with critical questions: Is growth sustainable or priced in? What could go wrong? Where is the consensus blind spot? What\'s the asymmetric upside?',
    color: '#FFD93D',
  },
  {
    icon: <Scale size={16} />,
    title: 'Make the Right Judgement',
    description: 'Synthesizes research, expert perspective, and critical questions into a conviction-weighted decision — balancing opportunity against risk, with a clear confidence score and rationale.',
    color: '#00D4AA',
  },
  {
    icon: <Layers size={16} />,
    title: 'Investing Foundation Model',
    description: 'All decisions are grounded in proven investment principles: margin of safety, diversification, position sizing, and disciplined risk management. The model learns from decades of market history, not just recent trends.',
    color: '#FF6B6B',
  },
];

const principles = [
  'Margin of Safety',
  'Concentrated Conviction',
  'Asymmetric Risk/Reward',
  'Mean Reversion Awareness',
  'Position Sizing Discipline',
  'Narrative + Numbers',
];

export default function AIReasoningCard() {
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
        gap: spacing.sm,
        marginBottom: spacing.md,
      }}>
        <div style={{
          width: 36,
          height: 36,
          borderRadius: radii.md,
          background: `linear-gradient(135deg, ${colors.accent.primary}30, ${colors.accent.secondary}30)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Brain size={20} color={colors.accent.primary} />
        </div>
        <div>
          <div style={{
            fontSize: typography.fontSize.base,
            fontWeight: typography.fontWeight.bold,
            color: colors.text.primary,
          }}>
            How AI Invests
          </div>
          <div style={{
            fontSize: typography.fontSize.xs,
            color: colors.text.tertiary,
          }}>
            Research-driven, expert-grade decision making
          </div>
        </div>
      </div>

      {/* Pipeline */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
        marginBottom: spacing.lg,
      }}>
        {pipeline.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: spacing.sm,
              padding: `${spacing.sm} 0`,
            }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 0,
              }}>
                <div style={{
                  width: 28,
                  height: 28,
                  borderRadius: radii.full,
                  background: `${step.color}20`,
                  color: step.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {step.icon}
                </div>
                {i < pipeline.length - 1 && (
                  <div style={{
                    width: 1,
                    height: 16,
                    background: colors.border.primary,
                    marginTop: 4,
                  }} />
                )}
              </div>
              <div style={{ flex: 1, paddingTop: 2 }}>
                <div style={{
                  fontSize: typography.fontSize.sm,
                  fontWeight: typography.fontWeight.semibold,
                  color: colors.text.primary,
                  marginBottom: 2,
                }}>
                  {step.title}
                </div>
                <div style={{
                  fontSize: 11,
                  color: colors.text.secondary,
                  lineHeight: typography.lineHeight.relaxed,
                }}>
                  {step.description}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Foundation Principles */}
      <div style={{
        borderTop: `1px solid ${colors.border.primary}`,
        paddingTop: spacing.md,
      }}>
        <div style={{
          fontSize: typography.fontSize.xs,
          fontWeight: typography.fontWeight.semibold,
          color: colors.text.tertiary,
          marginBottom: spacing.sm,
          textTransform: 'uppercase' as const,
          letterSpacing: '0.5px',
        }}>
          Foundation Principles
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: spacing.xs,
        }}>
          {principles.map((p, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: `4px ${spacing.sm}`,
              background: colors.bg.tertiary,
              borderRadius: radii.sm,
              fontSize: 11,
            }}>
              <div style={{
                width: 4,
                height: 4,
                borderRadius: radii.full,
                background: colors.accent.primary,
                flexShrink: 0,
              }} />
              <span style={{ color: colors.text.secondary }}>{p}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        marginTop: spacing.md,
        padding: spacing.sm,
        background: `${colors.accent.primary}10`,
        borderRadius: radii.sm,
        fontSize: 11,
        color: colors.text.tertiary,
        lineHeight: typography.lineHeight.relaxed,
        textAlign: 'center' as const,
      }}>
        Every recommendation shows the full reasoning chain — tap "View Reasoning" on any trade card.
      </div>
    </div>
  );
}
