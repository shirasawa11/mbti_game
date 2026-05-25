import { useEffect, useRef } from 'react'
import useAudioStore from '../../store/audioStore'
import useGameStore from '../../store/gameStore'
import { getChapter } from '../../data/chapters'

const BASE = import.meta.env.BASE_URL || '/'
const FADE_DURATION = 2000
const FADE_STEP = 50
const DIALOG_LEAD = 400

const PHASE_TRACKS = {
  home: 'home',
  result: 'result',
}

function getTrackSrc(trackName) {
  return `${BASE}audio/${trackName}.mp3`
}

function rampVolume(audioEl, from, to, duration, onDone) {
  const steps = Math.floor(duration / FADE_STEP)
  const delta = (to - from) / steps
  let current = from
  let step = 0

  const id = setInterval(() => {
    step++
    current += delta
    if (step >= steps) {
      audioEl.volume = to
      clearInterval(id)
      if (onDone) onDone()
    } else {
      audioEl.volume = current
    }
  }, FADE_STEP)
  return id
}

export default function BgmPlayer() {
  const track = useAudioStore((s) => s.currentTrack)
  const bgmActive = useAudioStore((s) => s.bgmActive)
  const volume = useAudioStore((s) => s.volume)
  const muted = useAudioStore((s) => s.muted)

  const audioA = useRef(null)
  const audioB = useRef(null)
  const activeRef = useRef('a')
  const playTimeoutRef = useRef(null)
  const rampIntervalsRef = useRef([])
  const unlockedRef = useRef(false)

  const bgmActiveRef = useRef(false)
  bgmActiveRef.current = bgmActive
  const trackRef = useRef(null)
  trackRef.current = track

  const targetVol = muted ? 0 : volume

  useEffect(() => {
    const a = new Audio()
    const b = new Audio()
    a.loop = true
    b.loop = true
    a.volume = 0
    b.volume = 0
    a.preload = 'auto'
    b.preload = 'auto'
    audioA.current = a
    audioB.current = b

    return () => {
      a.pause()
      b.pause()
      a.src = ''
      b.src = ''
    }
  }, [])

  // Unlock autoplay on first user gesture (pointerdown fires before click)
  useEffect(() => {
    const unlock = () => {
      if (unlockedRef.current) return
      unlockedRef.current = true
      document.removeEventListener('pointerdown', unlock)
      document.removeEventListener('keydown', unlock)

      if (bgmActiveRef.current && trackRef.current) {
        playTrack(getTrackSrc(trackRef.current))
      }
    }
    document.addEventListener('pointerdown', unlock)
    document.addEventListener('keydown', unlock)
    return () => {
      document.removeEventListener('pointerdown', unlock)
      document.removeEventListener('keydown', unlock)
    }
  }, [])

  function cancelAllRamps() {
    rampIntervalsRef.current.forEach((id) => clearInterval(id))
    rampIntervalsRef.current = []
  }

  function cancelPending() {
    if (playTimeoutRef.current) {
      clearTimeout(playTimeoutRef.current)
      playTimeoutRef.current = null
    }
    cancelAllRamps()
  }

  function trackedRamp(audioEl, from, to, duration, onDone) {
    const id = rampVolume(audioEl, from, to, duration, () => {
      rampIntervalsRef.current = rampIntervalsRef.current.filter((x) => x !== id)
      if (onDone) onDone()
    })
    rampIntervalsRef.current.push(id)
  }

  function playTrack(src) {
    if (!bgmActiveRef.current) return
    cancelPending()

    const oldEl = activeRef.current === 'a' ? audioA.current : audioB.current
    const newEl = activeRef.current === 'a' ? audioB.current : audioA.current
    const newActive = activeRef.current === 'a' ? 'b' : 'a'

    if (oldEl.src && oldEl.src.includes(src) && oldEl.volume > 0) {
      trackedRamp(oldEl, oldEl.volume, targetVol, FADE_DURATION)
      return
    }

    newEl.src = src
    newEl.volume = 0

    const start = () => {
      newEl.removeEventListener('canplay', start)
      newEl.play().then(() => {
        // Delay so dialog text / background image appears before music swells
        playTimeoutRef.current = setTimeout(() => {
          playTimeoutRef.current = null
          if (!bgmActiveRef.current) return // Abort if no longer active
          trackedRamp(oldEl, oldEl.volume, 0, FADE_DURATION, () => oldEl.pause())
          trackedRamp(newEl, 0, targetVol, FADE_DURATION)
          activeRef.current = newActive
        }, DIALOG_LEAD)
      }).catch(() => {})
    }

    if (newEl.readyState >= 2) {
      start()
    } else {
      newEl.addEventListener('canplay', start, { once: true })
    }
  }

  function stopMusic() {
    cancelPending()
    const active = activeRef.current === 'a' ? audioA.current : audioB.current
    if (!active || active.volume <= 0) return
    trackedRamp(active, active.volume, 0, FADE_DURATION, () => active.pause())
  }

  // Gate playback on bgmActive AND track
  useEffect(() => {
    if (bgmActive && track) {
      if (unlockedRef.current) {
        playTrack(getTrackSrc(track))
      } else {
        const preloadEl = activeRef.current === 'a' ? audioB.current : audioA.current
        preloadEl.src = getTrackSrc(track)
        preloadEl.volume = 0
      }
    } else {
      stopMusic()
    }
  }, [bgmActive, track])

  // Sync volume
  useEffect(() => {
    const active = activeRef.current === 'a' ? audioA.current : audioB.current
    if (active && bgmActive) {
      active.volume = targetVol
    }
  }, [volume, muted, bgmActive])

  return null
}

// Sync desired track + bgmActive based on game phase
export function useBgmSync() {
  const gamePhase = useGameStore((s) => s.gamePhase)
  const currentChapter = useGameStore((s) => s.currentChapter)
  const setTrack = useAudioStore((s) => s.setTrack)
  const setActive = useAudioStore((s) => s.setActive)

  useEffect(() => {
    if (gamePhase === 'playing') {
      const chapter = getChapter(currentChapter)
      setTrack(chapter?.bgm || `chapter${currentChapter}`)
    } else if (gamePhase === 'home' || gamePhase === 'result') {
      setTrack(PHASE_TRACKS[gamePhase])
      setActive(true)
    } else {
      setTrack(null)
      setActive(false)
    }
  }, [gamePhase, currentChapter])
}
