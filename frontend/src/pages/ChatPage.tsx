import { AnimatePresence } from 'framer-motion';
import { colors } from '../styles/tokens';
import { useChatEngine } from '../chat/useChatEngine';
import ChatHeader from '../components/chat/ChatHeader';
import MessageBubble from '../components/chat/MessageBubble';
import TypingIndicator from '../components/chat/TypingIndicator';
import ChatInput from '../components/chat/ChatInput';
import DateDivider from '../components/chat/DateDivider';

export default function ChatPage() {
  const { messages, isTyping, quickReplies, scrollRef, handleUserMessage, handleQuickReply, handleCardAction } = useChatEngine();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      background: colors.bg.primary,
      maxWidth: 600,
      margin: '0 auto',
    }}>
      <ChatHeader
        onSettingsClick={() => handleUserMessage('Show settings')}
      />

      <div
        ref={scrollRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          paddingTop: '8px',
          paddingBottom: '8px',
        }}
      >
        <DateDivider label="Today" />

        {messages.map(message => (
          <MessageBubble
            key={message.id}
            message={message}
            onCardAction={handleCardAction}
          />
        ))}

        <AnimatePresence>
          {isTyping && <TypingIndicator />}
        </AnimatePresence>
      </div>

      <ChatInput
        onSend={handleUserMessage}
        quickReplies={quickReplies}
        onQuickReply={handleQuickReply}
        disabled={isTyping}
      />
    </div>
  );
}
