/**
 * ¡SABORES HISPANOS! - AUDIO ENGINE (Web Audio API)
 * Procedural Synthesizer for Kahoot-style sounds without external file dependencies.
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = localStorage.getItem('sabores_muted') === 'true';
    this.musicTimer = null;
    this.musicStep = 0;
    this.isPlayingMusic = false;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    localStorage.setItem('sabores_muted', this.muted);
    if (this.muted) {
      this.stopLobbyMusic();
    }
    return this.muted;
  }

  isMuted() {
    return this.muted;
  }

  // Soft button click
  playPop() {
    if (this.muted) return;
    this.init();
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch (e) {
      // Audio error safe fallback
    }
  }

  // Countdown tick
  playTick(urgent = false) {
    if (this.muted) return;
    this.init();
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = urgent ? 'square' : 'triangle';
      const freq = urgent ? 880 : 520;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(urgent ? 0.22 : 0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.06);
    } catch (e) {}
  }

  // Answer is Correct! (Joyful major chord fanfare)
  playCorrect() {
    if (this.muted) return;
    this.init();
    try {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.07);

        gain.gain.setValueAtTime(0.18, this.ctx.currentTime + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.07 + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + idx * 0.07);
        osc.stop(this.ctx.currentTime + idx * 0.07 + 0.35);
      });
    } catch (e) {}
  }

  // Answer is Wrong / Timeout (Kahoot womp-womp tone)
  playWrong() {
    if (this.muted) return;
    this.init();
    try {
      const notes = [320, 290, 240, 200];
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.11);

        gain.gain.setValueAtTime(0.15, this.ctx.currentTime + idx * 0.11);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.11 + 0.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + idx * 0.11);
        osc.stop(this.ctx.currentTime + idx * 0.11 + 0.2);
      });
    } catch (e) {}
  }

  // Screen transition whoosh
  playWhoosh() {
    if (this.muted) return;
    this.init();
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(200, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(900, this.ctx.currentTime + 0.15);
      osc.frequency.exponentialRampToValueAtTime(150, this.ctx.currentTime + 0.28);

      gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.28);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.28);
    } catch (e) {}
  }

  // Grand Podium Celebration Fanfare
  playPodiumFanfare() {
    if (this.muted) return;
    this.init();
    try {
      const melody = [
        { note: 523.25, time: 0, dur: 0.15 },    // C5
        { note: 523.25, time: 0.18, dur: 0.15 }, // C5
        { note: 523.25, time: 0.36, dur: 0.15 }, // C5
        { note: 659.25, time: 0.54, dur: 0.3 },  // E5
        { note: 783.99, time: 0.88, dur: 0.25 }, // G5
        { note: 1046.50, time: 1.15, dur: 0.6 }  // C6
      ];

      melody.forEach(item => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(item.note, this.ctx.currentTime + item.time);

        gain.gain.setValueAtTime(0.25, this.ctx.currentTime + item.time);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + item.time + item.dur);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + item.time);
        osc.stop(this.ctx.currentTime + item.time + item.dur);
      });
    } catch (e) {}
  }

  // Background Kahoot-style upbeat lobby synth beat
  startLobbyMusic() {
    if (this.muted || this.isPlayingMusic) return;
    this.init();
    this.isPlayingMusic = true;
    this.musicStep = 0;

    const baseNotes = [261.63, 329.63, 392.00, 523.25, 440.00, 392.00, 349.23, 392.00];

    const playStep = () => {
      if (!this.isPlayingMusic || this.muted) return;
      try {
        const note = baseNotes[this.musicStep % baseNotes.length];
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(note, this.ctx.currentTime);

        gain.gain.setValueAtTime(0.035, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.22);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.22);

        this.musicStep++;
        this.musicTimer = setTimeout(playStep, 240);
      } catch (e) {}
    };

    playStep();
  }

  stopLobbyMusic() {
    this.isPlayingMusic = false;
    if (this.musicTimer) {
      clearTimeout(this.musicTimer);
      this.musicTimer = null;
    }
  }
}

// Global Sound Instance
const sounds = new SoundEngine();
