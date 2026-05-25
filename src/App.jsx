import { AnimatePresence } from 'framer-motion'
import useGameStore from './store/gameStore'
import HomePage from './pages/HomePage'
import IntroPage from './pages/IntroPage'
import GamePage from './pages/GamePage'
import ResultPage from './pages/ResultPage'
import BgmPlayer, { useBgmSync } from './components/ui/BgmPlayer'

function BgmManager() {
  useBgmSync()
  return <BgmPlayer />
}

export default function App() {
  const gamePhase = useGameStore((s) => s.gamePhase)

  const renderPage = () => {
    switch (gamePhase) {
      case 'home':
        return <HomePage />
      case 'intro':
        return <IntroPage />
      case 'playing':
        return <GamePage />
      case 'result':
        return <ResultPage />
      default:
        return <HomePage />
    }
  }

  return (
    <div className="h-full w-full max-w-lg mx-auto relative overflow-hidden">
      <AnimatePresence mode="wait">
        {renderPage()}
      </AnimatePresence>
      <BgmManager />
    </div>
  )
}
