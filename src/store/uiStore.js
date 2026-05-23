import { create } from 'zustand'

const useUiStore = create((set) => ({
  isTransitioning: false,
  transitionType: 'fade',
  screenShake: false,

  startTransition: (type = 'fade') => set({ isTransitioning: true, transitionType: type }),

  endTransition: () => set({ isTransitioning: false, transitionType: 'fade' }),

  triggerShake: () => {
    set({ screenShake: true })
    setTimeout(() => set({ screenShake: false }), 400)
  },

  reset: () => set({ isTransitioning: false, transitionType: 'fade', screenShake: false }),
}))

export default useUiStore
