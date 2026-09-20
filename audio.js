/**
 * Procedural Audio Synthesizer for 20-20-20 Eye Relaxation App
 * Uses Web Audio API to create gentle mindfulness chime harmonics.
 * No external media files required — 100% offline & zero latency.
 */

let audioCtx = null;
let soundEnabled = true;
let soundVolume = 0.7;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

/**
 * Play a resonant singing bowl / meditation chime
 * @param {'startBreak' | 'endBreak' | 'chime'} type
 */
export function playChime(type = 'startBreak') {
  if (!soundEnabled || soundVolume <= 0) return;

  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(soundVolume * 0.4, now);
  masterGain.connect(ctx.destination);

  // Frequencies for soothing, tranquil chords
  // startBreak: Ascending soft Tibetan bowl chime (e.g. 528Hz Solfeggio / D5)
  // endBreak: Welcoming return chime (A4 + E5)
  const frequencies = type === 'startBreak' 
    ? [528, 792, 1056, 1584] // Solfeggio transformation tone & harmonics
    : [440, 660, 880, 1320];  // Harmonic A4 meditative chord

  const duration = type === 'startBreak' ? 2.5 : 2.0;

  frequencies.forEach((freq, index) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = index === 0 ? 'sine' : 'triangle';
    osc.frequency.setValueAtTime(freq, now);

    // Initial attack and smooth natural exponential decay
    const amp = 1 / (index + 1.2);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(amp, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(masterGain);

    osc.start(now);
    osc.stop(now + duration);
  });
}

export function setSoundEnabled(enabled) {
  soundEnabled = !!enabled;
}

export function isSoundEnabled() {
  return soundEnabled;
}

export function setSoundVolume(volume) {
  soundVolume = Math.max(0, Math.min(1, parseFloat(volume) || 0));
}

export function getSoundVolume() {
  return soundVolume;
}

// Unlock audio context on initial user interaction
export function initAudioUnlock() {
  const unlock = () => {
    getAudioContext();
    window.removeEventListener('click', unlock);
    window.removeEventListener('keydown', unlock);
    window.removeEventListener('touchstart', unlock);
  };
  window.addEventListener('click', unlock, { once: true });
  window.addEventListener('keydown', unlock, { once: true });
  window.addEventListener('touchstart', unlock, { once: true });
}
