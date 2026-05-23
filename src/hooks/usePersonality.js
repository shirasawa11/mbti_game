import { useCallback } from 'react'
import usePersonalityStore from '../store/personalityStore'
import useGameStore from '../store/gameStore'

export default function usePersonality() {
  const traits = usePersonalityStore((s) => s.traits)
  const choiceHistory = usePersonalityStore((s) => s.choiceHistory)
  const addChoice = usePersonalityStore((s) => s.addChoice)
  const getMBTIType = usePersonalityStore((s) => s.getMBTIType)
  const getDimensionScores = usePersonalityStore((s) => s.getDimensionScores)
  const setPhase = useGameStore((s) => s.setPhase)

  const processChoice = useCallback((choice, sceneText) => {
    addChoice(choice.id, choice.effects, sceneText || choice.text)
  }, [addChoice])

  const finishGame = useCallback(() => {
    setPhase('result')
  }, [setPhase])

  return {
    traits,
    choiceHistory,
    processChoice,
    getMBTIType,
    getDimensionScores,
    finishGame,
  }
}
