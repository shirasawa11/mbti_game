import { useCallback, useRef } from 'react'

// UI SFX — subtle atmospheric sounds matching the maze's dark aesthetic.
// Designed to be audible over BGM without being distracting.

let audioCtx = null
function ctx() {
  if (!audioCtx) {
    try { audioCtx = new (window.AudioContext || window.webkitAudioContext)() } catch { return null }
  }
  if (audioCtx.state === 'suspended') audioCtx.resume()
  return audioCtx
}

// Soft stone-tap click — like touching a maze wall
function stoneTap(vol = 0.1) {
  const c = ctx()
  if (!c) return
  const now = c.currentTime

  // Short noise burst → filtered to sound like a solid tap
  const len = Math.floor(c.sampleRate * 0.06)
  const buf = c.createBuffer(1, len, c.sampleRate)
  const d = buf.getChannelData(0)
  for (let i = 0; i < len; i++) {
    const t = i / len
    d[i] = (Math.random() * 2 - 1) * Math.exp(-t * 20) * 0.6
  }
  const src = c.createBufferSource()
  src.buffer = buf

  const filter = c.createBiquadFilter()
  filter.type = 'bandpass'
  filter.frequency.value = 1200
  filter.Q.value = 0.8

  const g = c.createGain()
  g.gain.setValueAtTime(vol, now)
  g.gain.exponentialRampToValueAtTime(0.001, now + 0.06)

  src.connect(filter)
  filter.connect(g)
  g.connect(c.destination)
  src.start(now)
  src.stop(now + 0.06)
}

// Deeper stone-tap — same feel as hover but with more weight, for confirming a choice
function stonePress(vol = 0.12) {
  const c = ctx()
  if (!c) return
  const now = c.currentTime

  const len = Math.floor(c.sampleRate * 0.1)
  const buf = c.createBuffer(1, len, c.sampleRate)
  const d = buf.getChannelData(0)
  for (let i = 0; i < len; i++) {
    const t = i / len
    d[i] = (Math.random() * 2 - 1) * Math.exp(-t * 15) * 0.7
  }
  const src = c.createBufferSource()
  src.buffer = buf

  const filter = c.createBiquadFilter()
  filter.type = 'bandpass'
  filter.frequency.value = 600
  filter.Q.value = 0.6

  const g = c.createGain()
  g.gain.setValueAtTime(vol, now)
  g.gain.exponentialRampToValueAtTime(0.001, now + 0.1)

  src.connect(filter)
  filter.connect(g)
  g.connect(c.destination)
  src.start(now)
  src.stop(now + 0.1)
}

const sounds = {
  choiceHover:  () => stoneTap(0.08),
  choiceSelect: () => stonePress(0.12),
}

export default function useSfx() {
  const mutedRef = useRef(false)
  const setMuted = useCallback((m) => { mutedRef.current = m }, [])
  const play = useCallback((name) => {
    if (mutedRef.current) return
    const fn = sounds[name]
    if (fn) fn()
  }, [])
  return [play, setMuted]
}
