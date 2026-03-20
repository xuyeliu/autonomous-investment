import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, Brain, ChevronDown, ChevronUp } from 'lucide-react';
import { colors, spacing, typography, radii } from '../../styles/tokens';

interface TradeProposalCardProps {
  trade?: Record<string, unknown>;
  onApprove?: () => void;
  onReject?: () => void;
  onViewReasoning?: () => void;
}

export default function TradeProposalCard({ trade, onApprove, onReject, onViewReasoning }: TradeProposalCardProps) {
  const action = (trade?.action as string) || 'buy';
  const ticker = (trade?.ticker as string) || 'NVDA';
  const name = (trade?.name as string) || 'NVIDIA Corporation';
  const rationale = (trade?.rationale as string) || 'Strong AI chip demand continues.';
  const confidence = (trade?.confidence as number) || 90;
  const potentialReturn = (trade?.potentialReturn as string) || '+8.5%';
  const timeframe = (trade?.timeframe as string) || '2-4 weeks';
  const status = (trade?.status as string) || 'pending';

  // P2: Toggle between simple and detailed view
  const [showDetails, setShowDetails] = useState(false);

  const actionColors: Record<string, string> = {
    buy: colors.status.gain,
    sell: colors.status.loss,
    hold: colors.status.warning,
  };
  const actionIcons: Record<string, React.ReactNode> = {
    buy: <TrendingUp size={14} />,
    sell: <TrendingDown size={14} />,
    hold: <Minus size={14} />,
  };
  const borderColor = actionColors[action] || colors.accent.primary;

  // P3: Plain-language summary for beginners
  const actionVerb = action === 'buy' ? 'go up' : action === 'sell' ? 'go down' : 'stay stable';
  const simpleSummary = `AI thinks ${ticker} will ${actionVerb} by ${potentialReturn.replace(/[+-]/, '')} in ${timeframe}. Confidence: ${confidence}% (${confidence >= 85 ? 'very strong' : confidence >= 75 ? 'strong' : 'moderate'} signal).`;

  return (
    <div style={{
      background: colors.bg.card,
      borderRadius: radii.lg,
      padding: spacing.lg,
      border: `1px solid ${colors.border.primary}`,
      borderLeft: `3px solid ${borderColor}`,
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: spacing.sm,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
          <span style={{
            background: `${borderColor}20`,
            color: borderColor,
            padding: `2px ${spacing.sm}`,
            borderRadius: radii.full,
            fontSize: typography.fontSize.xs,
            fontWeight: typography.fontWeight.semibold,
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            textTransform: 'uppercase' as const,
          }}>
            {actionIcons[action]} {action}
          </span>
          <span style={{
            fontSize: typography.fontSize.base,
            fontWeight: typography.fontWeight.bold,
            color: colors.text.primary,
          }}>
            {ticker}
          </span>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          color: colors.accent.primary,
          fontSize: typography.fontSize.xs,
        }}>
          <Brain size={12} />
          {confidence}%
        </div>
      </div>

      <div style={{
        fontSize: typography.fontSize.xs,
        color: colors.text.tertiary,
        marginBottom: spacing.sm,
      }}>
        {name}
      </div>

      {/* P2: Simple summary for beginners - always visible */}
      <div style={{
        fontSize: typography.fontSize.sm,
        color: colors.text.secondary,
        lineHeight: typography.lineHeight.relaxed,
        marginBottom: spacing.sm,
        padding: spacing.sm,
        background: `${borderColor}08`,
        borderRadius: radii.sm,
      }}>
        {simpleSummary}
      </div>

      {/* Expandable detailed view */}
      <button
        onClick={() => setShowDetails(!showDetails)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          fontSize: typography.fontSize.xs,
          color: colors.text.tertiary,
          background: 'transparent',
          cursor: 'pointer',
          padding: `2px 0`,
          marginBottom: spacing.sm,
        }}
      >
        {showDetails ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        {showDetails ? 'Hide details' : 'Show details'}
      </button>

      {showDetails && (
        <div style={{ marginBottom: spacing.md }}>
          <div style={{
            fontSize: typography.fontSize.sm,
            color: colors.text.secondary,
            lineHeight: typography.lineHeight.relaxed,
            marginBottom: spacing.md,
          }}>
            {rationale}
          </div>

          <div style={{
            display: 'flex',
            gap: spacing.lg,
          }}>
            <div>
              <div style={{ fontSize: typography.fontSize.xs, color: colors.text.tertiary }}>Return</div>
              <div style={{
                fontSize: typography.fontSize.sm,
                fontWeight: typography.fontWeight.semibold,
                color: potentialReturn.startsWith('+') ? colors.status.gain : colors.status.loss,
              }}>
                {potentialReturn}
              </div>
            </div>
            <div>
              <div style={{ fontSize: typography.fontSize.xs, color: colors.text.tertiary }}>Timeframe</div>
              <div style={{
                fontSize: typography.fontSize.sm,
                fontWeight: typography.fontWeight.semibold,
                color: colors.text.primary,
              }}>
                {timeframe}
              </div>
            </div>
            <div>
              <div style={{ fontSize: typography.fontSize.xs, color: colors.text.tertiary }}>Confidence</div>
              <div style={{
                fontSize: typography.fontSize.sm,
                fontWeight: typography.fontWeight.semibold,
                color: colors.accent.primary,
              }}>
                {confidence}%
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Reasoning link */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={onViewReasoning}
        style={{
          width: '100%',
          padding: `6px 0`,
          marginBottom: status === 'pending' ? spacing.sm : 0,
          background: 'transparent',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 4,
          fontSize: typography.fontSize.xs,
          color: colors.accent.primary,
          opacity: 0.85,
        }}
      >
        <Brain size={12} />
        View Full Reasoning
      </motion.button>

      {status === 'pending' && (
        <div style={{ display: 'flex', gap: spacing.sm }}>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onApprove}
            style={{
              flex: 1,
              padding: `${spacing.sm} ${spacing.md}`,
              borderRadius: radii.md,
              background: colors.accent.primary,
              color: colors.text.inverse,
              fontSize: typography.fontSize.sm,
              fontWeight: typography.fontWeight.semibold,
              cursor: 'pointer',
            }}
          >
            Approve
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onReject}
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
            }}
          >
            Skip
          </motion.button>
        </div>
      )}

      {status === 'approved' && (
        <div style={{
          padding: `${spacing.xs} ${spacing.md}`,
          background: `${colors.status.gain}15`,
          borderRadius: radii.md,
          color: colors.status.gain,
          fontSize: typography.fontSize.xs,
          fontWeight: typography.fontWeight.semibold,
          textAlign: 'center' as const,
        }}>
          Approved
        </div>
      )}
    </div>
  );
}
