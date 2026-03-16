import { Routes, Route, useLocation } from 'react-router-dom'
import TopNavigation from './components/TopNavigation'
import BottomTabBar from './components/BottomTabBar'
import LandingPage from './pages/LandingPage'
import DepositPage from './pages/DepositPage'
import ThemesPage from './pages/ThemesPage'
import RiskPage from './pages/RiskPage'
import DashboardPage from './pages/DashboardPage'
import TradesPage from './pages/TradesPage'
import AIAgentPage from './pages/AIAgentPage'
import PerformancePage from './pages/PerformancePage'
import WalletPage from './pages/WalletPage'
import SettingsPage from './pages/SettingsPage'
import { colors, spacing } from './styles/tokens'

// Pages where the app shell (nav bars) should be hidden
const noShellPaths = ['/', '/onboarding/deposit', '/onboarding/themes', '/onboarding/risk']

export default function App() {
  const location = useLocation()
  const showShell = !noShellPaths.includes(location.pathname)

  return (
    <div style={{
      minHeight: '100vh',
      background: colors.bg.primary,
      color: colors.text.primary,
    }}>
      {showShell && <TopNavigation />}

      <main style={{
        paddingTop: showShell ? '80px' : 0,
        paddingBottom: showShell ? '88px' : 0,
        paddingLeft: showShell ? spacing.lg : 0,
        paddingRight: showShell ? spacing.lg : 0,
      }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/onboarding/deposit" element={<DepositPage />} />
          <Route path="/onboarding/themes" element={<ThemesPage />} />
          <Route path="/onboarding/risk" element={<RiskPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/trades" element={<TradesPage />} />
          <Route path="/ai-agent" element={<AIAgentPage />} />
          <Route path="/performance" element={<PerformancePage />} />
          <Route path="/wallet" element={<WalletPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </main>

      {showShell && <BottomTabBar />}
    </div>
  )
}
