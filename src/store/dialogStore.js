import { create } from 'zustand'

const useDialogStore = create((set, get) => ({
  dialogQueue: [],
  currentDialogIndex: 0,
  isTyping: false,
  currentSpeaker: null,
  showChoices: false,
  currentChoices: [],

  pushDialog: (scene) => {
    set({
      dialogQueue: scene.dialogs,
      currentDialogIndex: 0,
      isTyping: true,
      currentSpeaker: scene.dialogs[0]?.speaker || null,
      showChoices: false,
      currentChoices: scene.choices || [],
    })
  },

  advanceDialog: () => {
    const { dialogQueue, currentDialogIndex } = get()
    const nextIndex = currentDialogIndex + 1
    if (nextIndex < dialogQueue.length) {
      set({
        currentDialogIndex: nextIndex,
        isTyping: true,
        currentSpeaker: dialogQueue[nextIndex].speaker,
      })
    } else {
      set({ showChoices: true, isTyping: false })
    }
  },

  completeTyping: () => set({ isTyping: false }),

  clearDialog: () => set({
    dialogQueue: [],
    currentDialogIndex: 0,
    isTyping: false,
    currentSpeaker: null,
    showChoices: false,
    currentChoices: [],
  }),
}))

export default useDialogStore
