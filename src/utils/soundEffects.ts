// Pure Web Audio API procedural sound synthesis for ambient mountain breeze and UI feedback
class SoundController {
  private ctx: AudioContext | null = null;
  private ambientGain: GainNode | null = null;
  private noiseNode: AudioNode | null = null;
  private isAmbientPlaying = false;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Soft UI tap/click feedback
  playTap() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, this.ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.08); // A5

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.09);
    } catch {
      // Audio not permitted or supported; silent fail
    }
  }

  // Warm chime for hotspot discovery
  playChime() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 arpeggio

      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        gain.gain.setValueAtTime(0.06, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 0.5);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.55);
      });
    } catch {
      // Ignore
    }
  }

  // Toggle procedural mountain breeze
  toggleAmbient(enable?: boolean): boolean {
    try {
      this.initCtx();
      if (!this.ctx) return false;

      const shouldPlay = enable !== undefined ? enable : !this.isAmbientPlaying;
      if (shouldPlay && !this.isAmbientPlaying) {
        // Create brown/pink noise buffer for wind breeze
        const bufferSize = this.ctx.sampleRate * 2;
        const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
          b6 = white * 0.115926;
        }

        const whiteNoise = this.ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(320, this.ctx.currentTime);

        this.ambientGain = this.ctx.createGain();
        this.ambientGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
        this.ambientGain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 1.5);

        whiteNoise.connect(filter);
        filter.connect(this.ambientGain);
        this.ambientGain.connect(this.ctx.destination);

        whiteNoise.start();
        this.noiseNode = whiteNoise;
        this.isAmbientPlaying = true;
      } else if (!shouldPlay && this.isAmbientPlaying) {
        if (this.ambientGain && this.ctx) {
          this.ambientGain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.5);
          setTimeout(() => {
            if (this.noiseNode && 'stop' in this.noiseNode) {
              (this.noiseNode as AudioBufferSourceNode).stop();
            }
            this.noiseNode = null;
            this.isAmbientPlaying = false;
          }, 500);
        } else {
          this.isAmbientPlaying = false;
        }
      }
      return this.isAmbientPlaying;
    } catch {
      return false;
    }
  }

  isPlayingAmbient(): boolean {
    return this.isAmbientPlaying;
  }
}

export const soundManager = new SoundController();
