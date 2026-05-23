import { create } from 'zustand'

const initialTraits = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 }

const usePersonalityStore = create((set, get) => ({
  traits: { ...initialTraits },
  choiceHistory: [],

  addChoice: (choiceId, effects, sceneText) => {
    const state = get()
    const newTraits = { ...state.traits }
    Object.entries(effects).forEach(([key, value]) => {
      if (newTraits[key] !== undefined) {
        newTraits[key] += value
      }
    })
    set({
      traits: newTraits,
      choiceHistory: [
        ...state.choiceHistory,
        { id: choiceId, effects, sceneText, timestamp: Date.now() },
      ],
    })
  },

  getMBTIType: () => {
    const { traits } = get()
    return [
      traits.E >= traits.I ? 'E' : 'I',
      traits.S >= traits.N ? 'S' : 'N',
      traits.T >= traits.F ? 'T' : 'F',
      traits.J >= traits.P ? 'J' : 'P',
    ].join('')
  },

  getDimensionScores: () => {
    const { traits } = get()
    return {
      EI: { E: traits.E, I: traits.I, dominant: traits.E >= traits.I ? 'E' : 'I', ratio: traits.E + traits.I > 0 ? Math.round((Math.max(traits.E, traits.I) / (traits.E + traits.I)) * 100) : 50 },
      SN: { S: traits.S, N: traits.N, dominant: traits.S >= traits.N ? 'S' : 'N', ratio: traits.S + traits.N > 0 ? Math.round((Math.max(traits.S, traits.N) / (traits.S + traits.N)) * 100) : 50 },
      TF: { T: traits.T, F: traits.F, dominant: traits.T >= traits.F ? 'T' : 'F', ratio: traits.T + traits.F > 0 ? Math.round((Math.max(traits.T, traits.F) / (traits.T + traits.F)) * 100) : 50 },
      JP: { J: traits.J, P: traits.P, dominant: traits.J >= traits.P ? 'J' : 'P', ratio: traits.J + traits.P > 0 ? Math.round((Math.max(traits.J, traits.P) / (traits.J + traits.P)) * 100) : 50 },
    }
  },

  reset: () => set({ traits: { ...initialTraits }, choiceHistory: [] }),
}))

export default usePersonalityStore
