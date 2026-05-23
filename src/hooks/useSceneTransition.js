import { useState, useCallback } from 'react'
import useUiStore from '../store/uiStore'

export default function useSceneTransition() {
  const { startTransition, endTransition, isTransitioning } = useUiStore()
  const [transitionPhase, setTransitionPhase] = useState('in')

  const transition = useCallback((type = 'fade', duration = 600) => {
    return new Promise((resolve) => {
      startTransition(type)
      setTransitionPhase('out')
      setTimeout(() => {
        setTransitionPhase('in')
        setTimeout(() => {
          endTransition()
          resolve()
        }, 50)
      }, duration / 2)
    })
  }, [startTransition, endTransition])

  return { transition, isTransitioning, transitionPhase }
}
