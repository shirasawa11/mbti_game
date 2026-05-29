import { useEffect } from 'react'
import useGameStore from '../store/gameStore'
import usePersonalityStore from '../store/personalityStore'
import useAudioStore from '../store/audioStore'

const PG_KEY = 'mbti-save'
const PP_KEY = 'mbti-trait'
const AU_KEY = 'mbti-audio'

// Load saved data into stores — call once on app mount
export function loadSaves() {
  try {
    const pg = localStorage.getItem(PG_KEY)
    if (pg) {
      const d = JSON.parse(pg)
      const gs = useGameStore.getState()
      // Only restore if the saved state is valid
      if (d.ch != null && d.ph) {
        useGameStore.setState({
          currentChapter: d.ch,
          currentSceneId: d.sc ?? null,
          visitedScenes: d.vs ?? [],
          gamePhase: 'home', // Always show home on reload
          flags: d.fl ?? {},
        })
      }
    }
  } catch {}

  try {
    const pp = localStorage.getItem(PP_KEY)
    if (pp) {
      const d = JSON.parse(pp)
      if (d.tr) {
        usePersonalityStore.setState({ traits: d.tr, choiceHistory: d.ch ?? [] })
      }
    }
  } catch {}

  try {
    const au = localStorage.getItem(AU_KEY)
    if (au) {
      const d = JSON.parse(au)
      useAudioStore.setState({ volume: d.v ?? 0.5, muted: d.m ?? false })
    }
  } catch {}
}

// Subscribe to store changes and persist — debounced
export default function useSaveGame() {
  useEffect(() => {
    let timer = null
    const flush = () => {
      const gs = useGameStore.getState()
      const ps = usePersonalityStore.getState()
      const as = useAudioStore.getState()
      try {
        localStorage.setItem(PG_KEY, JSON.stringify({
          ch: gs.currentChapter, sc: gs.currentSceneId,
          vs: gs.visitedScenes, ph: gs.gamePhase, fl: gs.flags,
        }))
      } catch {}
      try {
        localStorage.setItem(PP_KEY, JSON.stringify({
          tr: ps.traits, ch: ps.choiceHistory,
        }))
      } catch {}
      try {
        localStorage.setItem(AU_KEY, JSON.stringify({ v: as.volume, m: as.muted }))
      } catch {}
    }

    const unsub1 = useGameStore.subscribe(() => {
      clearTimeout(timer)
      timer = setTimeout(flush, 500)
    })
    const unsub2 = usePersonalityStore.subscribe(() => {
      clearTimeout(timer)
      timer = setTimeout(flush, 500)
    })

    // Also save on page unload
    const onUnload = () => flush()
    window.addEventListener('beforeunload', onUnload)

    return () => {
      unsub1(); unsub2()
      window.removeEventListener('beforeunload', onUnload)
      clearTimeout(timer)
    }
  }, [])
}
