import type { CardData } from '../../chat/types';
import WelcomeCard from './WelcomeCard';
import DailyBriefingCard from './DailyBriefingCard';
import PortfolioCard from './PortfolioCard';
import PerformanceChartCard from './PerformanceChartCard';
import TradeProposalCard from './TradeProposalCard';
import TradeConfirmationCard from './TradeConfirmationCard';
import DecisionReferenceCard from './DecisionReferenceCard';
import AIReasoningCard from './AIReasoningCard';
import DepositCard from './DepositCard';
import ThemePickerCard from './ThemePickerCard';
import RiskPickerCard from './RiskPickerCard';
import ActivityCard from './ActivityCard';
import WalletCard from './WalletCard';
import SettingsCard from './SettingsCard';
import AllocationCard from '../AllocationCard';
import { allocationData } from '../../data/mock';

interface CardRendererProps {
  card: CardData;
  onAction?: (action: string, data?: unknown) => void;
}

export default function CardRenderer({ card, onAction }: CardRendererProps) {
  switch (card.type) {
    case 'welcome':
      return <WelcomeCard />;
    case 'daily-briefing':
      return <DailyBriefingCard />;
    case 'portfolio':
      return <PortfolioCard />;
    case 'performance-chart':
      return <PerformanceChartCard />;
    case 'allocation':
      return <AllocationCard data={allocationData} />;
    case 'trade-proposal':
      return <TradeProposalCard
        trade={card.props?.trade as Record<string, unknown>}
        onApprove={() => onAction?.('approve-trade', card.props?.trade)}
        onReject={() => onAction?.('reject-trade', card.props?.trade)}
        onViewReasoning={() => onAction?.('view-reasoning', card.props?.trade)}
      />;
    case 'trade-confirmation':
      return <TradeConfirmationCard trade={card.props?.trade as Record<string, unknown>} />;
    case 'decision-reference':
      return <DecisionReferenceCard trade={card.props?.trade as Record<string, unknown>} />;
    case 'ai-reasoning':
      return <AIReasoningCard />;
    case 'deposit':
      return <DepositCard
        onSelect={(amount) => onAction?.('deposit', amount)}
        prefillAmount={card.props?.prefillAmount as number | undefined}
      />;
    case 'theme-picker':
      return <ThemePickerCard
        onDone={(themes) => onAction?.('themes-selected', themes)}
        onSmartDefault={() => onAction?.('smart-default')}
      />;
    case 'risk-picker':
      return <RiskPickerCard onSelect={(level) => onAction?.('risk-selected', level)} />;
    case 'activity':
      return <ActivityCard />;
    case 'wallet':
      return <WalletCard onDeposit={() => onAction?.('deposit-start')} />;
    case 'settings':
      return <SettingsCard />;
    default:
      return null;
  }
}
