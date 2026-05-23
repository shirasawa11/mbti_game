import { create } from 'zustand'

const useGameStore = create((set, get) => ({
  currentChapter: 1,
  currentSceneId: null,
  visitedScenes: [],
  gamePhase: 'home',
  flags: {},

  setScene: (sceneId) => {
    const { visitedScenes } = get()
    if (!visitedScenes.includes(sceneId)) {
      set({ visitedScenes: [...visitedScenes, sceneId] })
    }
    set({ currentSceneId: sceneId })
  },

  nextChapter: () => {
    const next = get().currentChapter + 1
    set({ currentChapter: Math.min(next, 5) })
  },

  setPhase: (phase) => set({ gamePhase: phase }),

  setFlag: (key, value) => set({ flags: { ...get().flags, [key]: value } }),

  resetGame: () => set({
    currentChapter: 1,
    currentSceneId: null,
    visitedScenes: [],
    gamePhase: 'playing',
    flags: {},
  }),
}))

export default useGameStore
