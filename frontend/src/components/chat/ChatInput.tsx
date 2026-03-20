import { useState, useRef } from 'react';
import { Send, Plus, X, PieChart, TrendingUp, BarChart3, Repeat, Wallet, ArrowDownCircle, History, Settings, HelpCircle, Brain } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { colors, spacing, typography, radii } from '../../styles/tokens';
import type { QuickReply } from '../../chat/types';
import QuickReplies from './QuickReplies';

const menuOptions = [
  { icon: <PieChart size={18} />,     label: 'Portfolio',    value: 'Show my portfolio' },
  { icon: <TrendingUp size={18} />,   label: 'Performance',  value: 'Show performance chart' },
  { icon: <BarChart3 size={18} />,    label: 'Allocation',   value: 'Show allocation' },
  { icon: <Repeat size={18} />,       label: 'Trades',       value: 'Show trade suggestions' },
  { icon: <ArrowDownCircle size={18}/>, label: 'Deposit',    value: 'Add money' },
  { icon: <Wallet size={18} />,       label: 'Wallet',       value: 'Show wallet' },
  { icon: <History size={18} />,      label: 'Activity',     value: 'Show activity' },
  { icon: <Settings size={18} />,     label: 'Settings',     value: 'Show settings' },
  { icon: <HelpCircle size={18} />,   label: 'Help',         value: 'What can you do?' },
];

interface ChatInputProps {
  onSend: (text: string) => void;
  quickReplies: QuickReply[];
  onQuickReply: (reply: QuickReply) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, quickReplies, onQuickReply, disabled }: ChatInputProps) {
  const [text, setText] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setText('');
    setMenuOpen(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleMenuOption = (value: string) => {
    setMenuOpen(false);
    onSend(value);
  };

  return (
    <div style={{
      borderTop: `1px solid ${colors.border.primary}`,
      background: colors.bg.secondary,
      padding: `${spacing.sm} ${spacing.lg} ${spacing.lg}`,
      position: 'relative' as const,
    }}>
      {/* Action menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute' as const,
              bottom: '100%',
              left: 0,
              right: 0,
              background: colors.bg.secondary,
              borderTop: `1px solid ${colors.border.primary}`,
              padding: `${spacing.md} ${spacing.lg}`,
            }}
          >
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: spacing.sm,
            }}>
              {menuOptions.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => handleMenuOption(opt.value)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 6,
                    padding: spacing.md,
                    borderRadius: radii.md,
                    background: colors.bg.tertiary,
                    border: `1px solid ${colors.border.primary}`,
                    color: colors.text.secondary,
                    cursor: 'pointer',
                    transition: 'background 0.15s, border-color 0.15s, color 0.15s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = colors.accent.muted;
                    e.currentTarget.style.borderColor = colors.accent.primary;
                    e.currentTarget.style.color = colors.accent.primary;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = colors.bg.tertiary;
                    e.currentTarget.style.borderColor = colors.border.primary;
                    e.currentTarget.style.color = colors.text.secondary;
                  }}
                >
                  {opt.icon}
                  <span style={{ fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.medium }}>
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick replies */}
      {quickReplies.length > 0 && !menuOpen && (
        <QuickReplies replies={quickReplies} onSelect={onQuickReply} />
      )}

      {/* Input row */}
      <div style={{
        display: 'flex',
        gap: spacing.sm,
        alignItems: 'center',
      }}>
        <button
          onClick={() => setMenuOpen(prev => !prev)}
          style={{
            width: 44,
            height: 44,
            borderRadius: radii.full,
            background: menuOpen ? colors.accent.muted : colors.bg.tertiary,
            border: menuOpen ? `1px solid ${colors.accent.primary}` : `1px solid ${colors.border.primary}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: menuOpen ? colors.accent.primary : colors.text.tertiary,
            flexShrink: 0,
            transition: 'all 0.2s',
          }}
        >
          {menuOpen ? <X size={20} /> : <Plus size={20} />}
        </button>

        <button
          onClick={() => { setMenuOpen(false); onSend('Show AI reasoning'); }}
          disabled={disabled}
          style={{
            width: 44,
            height: 44,
            borderRadius: radii.full,
            background: `${colors.accent.primary}15`,
            border: `1px solid ${colors.accent.primary}40`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: colors.accent.primary,
            flexShrink: 0,
            cursor: disabled ? 'default' : 'pointer',
            transition: 'all 0.2s',
            opacity: disabled ? 0.5 : 1,
          }}
          title="AI Reasoning"
        >
          <Brain size={20} />
        </button>

        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={(e) => { setText(e.target.value); setMenuOpen(false); }}
          onKeyDown={handleKeyDown}
          placeholder="Message AI..."
          disabled={disabled}
          style={{
            flex: 1,
            background: colors.bg.tertiary,
            border: `1px solid ${colors.border.primary}`,
            borderRadius: radii.full,
            padding: `${spacing.md} ${spacing.lg}`,
            color: colors.text.primary,
            fontSize: typography.fontSize.sm,
            outline: 'none',
          }}
        />
        <button
          onClick={handleSend}
          disabled={!text.trim() || disabled}
          style={{
            width: 44,
            height: 44,
            borderRadius: radii.full,
            background: text.trim() ? colors.accent.primary : colors.bg.tertiary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: text.trim() ? colors.text.inverse : colors.text.tertiary,
            flexShrink: 0,
            transition: 'background 0.2s, color 0.2s',
          }}
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
