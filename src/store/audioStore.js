import { create } from 'zustand'

const useAudioStore = create((set, get) => ({
  currentTrack: null,
  bgmActive: false,
  volume: 0.5,
  muted: false,

  setTrack: (track) => set({ currentTrack: track }),
  setActive: (active) => set({ bgmActive: active }),
  setVolume: (v) => set({ volume: Math.max(0, Math.min(1, v)) }),
  toggleMute: () => set((s) => ({ muted: !s.muted })),
}))

export default useAudioStore
