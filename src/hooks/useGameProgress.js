import { useCallback } from 'react'
import useGameStore from '../store/gameStore'
import { getChapter } from '../data/chapters'

export default function useGameProgress() {
  const currentChapter = useGameStore((s) => s.currentChapter)
  const currentSceneId = useGameStore((s) => s.currentSceneId)
  const setScene = useGameStore((s) => s.setScene)
  const nextChapter = useGameStore((s) => s.nextChapter)
  const setFlag = useGameStore((s) => s.setFlag)
  const flags = useGameStore((s) => s.flags)
  const resetGame = useGameStore((s) => s.resetGame)

  const startChapter = useCallback((chapterNum) => {
    const chapter = getChapter(chapterNum)
    if (chapter) {
      setScene(chapter.startScene)
    }
  }, [setScene])

  const getCurrentScene = useCallback(() => {
    if (!currentSceneId) return null
    const chapter = getChapter(currentChapter)
    return chapter?.scenes?.[currentSceneId] || null
  }, [currentSceneId, currentChapter])

  const resolveChoice = useCallback((choice) => {
    if (choice.flags) {
      Object.entries(choice.flags).forEach(([key, value]) => {
        setFlag(key, value)
      })
    }
    if (choice.nextScene) {
      const chapter = getChapter(currentChapter)
      if (chapter?.scenes?.[choice.nextScene]) {
        setScene(choice.nextScene)
        return true
      }
      nextChapter()
      const next = getChapter(currentChapter + 1)
      if (next) {
        setScene(next.startScene)
        return true
      }
      return false
    }
    nextChapter()
    const next = getChapter(currentChapter + 1)
    if (next) {
      setScene(next.startScene)
      return true
    }
    return false
  }, [currentChapter, setScene, setFlag, nextChapter])

  return {
    currentChapter,
    currentSceneId,
    flags,
    startChapter,
    getCurrentScene,
    resolveChoice,
    resetGame,
  }
}
