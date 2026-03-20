import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import SplashPage from './pages/SplashPage';
import ChatPage from './pages/ChatPage';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <AnimatePresence mode="wait">
      {showSplash ? (
        <SplashPage key="splash" onComplete={() => setShowSplash(false)} />
      ) : (
        <ChatPage key="chat" />
      )}
    </AnimatePresence>
  );
}
