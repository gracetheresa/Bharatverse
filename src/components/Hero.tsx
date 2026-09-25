import React, { useState } from 'react';
import { soundManager } from '../utils/soundEffects';
import {
  Sparkles,
  ArrowRight,
  Compass,
  Send,
  Loader2,
  MapPin,
  TrendingUp,
  ShieldCheck,
  Box,
  Camera,
  Map
} from 'lucide-react';

interface Props {
  onStartExploring: () => void;
  onNaturalLanguageQuery: (prompt: string) => Promise<void>;
  isLoadingNLP: boolean;
  onOpenGooglePlaces?: () => void;
  onOpenUnderratedGems?: () => void;
  onOpenSoulOfIndia?: () => void;
}

export const Hero: React.FC<Props> = ({
  onStartExploring,
  onNaturalLanguageQuery,
  isLoadingNLP,
  onOpenGooglePlaces,
  onOpenUnderratedGems,
  onOpenSoulOfIndia,
}) => {
  const [nlInput, setNlInput] = useState('');

  const samplePrompts = [
    'I have ₹5,000 and two days. I want somewhere peaceful near Hyderabad.',
    'Weekend road trip from Bengaluru with friends under ₹8,000 for trekking.',
    'Spiritual and cultural 3-day retreat near Delhi with my family.',
    'Romantic coastal getaway under ₹12,000 with quiet beaches.'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nlInput.trim() || isLoadingNLP) return;
    soundManager.playTap();
    onNaturalLanguageQuery(nlInput.trim());
  };

  const handleSelectSample = (sample: string) => {
    setNlInput(sample);
    soundManager.playTap();
    onNaturalLanguageQuery(sample);
  };

  return (
    <section className="relative w-full pt-12 pb-20 sm:pt-20 sm:pb-28 overflow-hidden">
      {/* Background Indian Motif & Atmospheric Glow */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Warm radial glows */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-amber-500/15 via-orange-600/10 to-transparent blur-3xl rounded-full" />
        <div className="absolute top-1/3 left-10 w-96 h-96 bg-emerald-600/5 blur-3xl rounded-full" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-600/8 blur-3xl rounded-full" />

        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(245,158,11,0.08)_1px,transparent_1px)] [background-size:32px_32px] opacity-70" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
        
        {/* Top Tag Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold backdrop-blur-md mb-6 shadow-lg shadow-amber-500/5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '8s' }} />
          <span>India’s 1st Interactive 3D Travel Discovery Platform</span>
        </div>

        {/* Cinematic Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.12]">
          Step Beyond the Ordinary.{' '}
          <span className="block mt-1 sm:mt-2 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400">
            Discover Your India in 3D.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-5 sm:mt-6 text-base sm:text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
          Personalized journeys tailored to your budget, starting city, pace, and spirit. 
          Preview mist-covered forest ridges, sacred temple ghats, and hidden valleys through 
          fluid, interactive 3D spatial environments.
        </p>

        {/* NATURAL LANGUAGE QUERY BOX */}
        <div className="mt-8 sm:mt-10 max-w-3xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="relative flex items-center rounded-2xl bg-slate-900/80 border border-amber-500/35 p-2 shadow-2xl backdrop-blur-xl focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-500/20 transition-all"
          >
            <div className="pl-3 pr-2 text-amber-400 shrink-0">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>

            <input
              type="text"
              value={nlInput}
              onChange={(e) => setNlInput(e.target.value)}
              placeholder="Tell us: 'I have ₹5,000 and 2 days. Peaceful place near Hyderabad...'"
              className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none px-2 py-2"
              disabled={isLoadingNLP}
            />

            <button
              type="submit"
              disabled={isLoadingNLP || !nlInput.trim()}
              className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 transition disabled:opacity-50 shrink-0 cursor-pointer"
            >
              {isLoadingNLP ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Matching...</span>
                </>
              ) : (
                <>
                  <span>AI Match</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Suggestion Chips */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-slate-400 text-[11px] mr-1 hidden sm:inline">Try asking:</span>
            {samplePrompts.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectSample(p)}
                className="text-[11px] px-3 py-1 rounded-full bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-amber-300 border border-slate-700/60 transition truncate max-w-[280px] sm:max-w-none shadow-sm cursor-pointer"
              >
                "{p}"
              </button>
            ))}
          </div>
        </div>

        {/* OR DIVIDER & PRIMARY CTA */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={() => {
              soundManager.playTap();
              onStartExploring();
            }}
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xl shadow-amber-500/25 transform hover:-translate-y-0.5 transition cursor-pointer"
          >
            <Compass className="w-5 h-5" />
            <span>Customize Trip Preferences</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {onOpenSoulOfIndia && (
            <button
              onClick={() => {
                soundManager.playTap();
                onOpenSoulOfIndia();
              }}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500/25 via-orange-500/25 to-amber-500/25 hover:from-amber-500/35 hover:to-orange-500/35 text-amber-300 hover:text-white border border-amber-500/50 font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl shadow-amber-500/15 transition cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>Soul of India</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/30 text-amber-200 border border-amber-500/40 font-black">
                Local Culture
              </span>
            </button>
          )}

          {onOpenUnderratedGems && (
            <button
              onClick={() => {
                soundManager.playTap();
                onOpenUnderratedGems();
              }}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20 hover:from-amber-500/30 hover:to-orange-500/30 text-amber-300 hover:text-white border border-amber-500/40 font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl shadow-amber-500/10 transition cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>Underrated Gems</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/30 text-amber-200 border border-amber-500/40 font-black">
                SerpApi Live
              </span>
            </button>
          )}

          {onOpenGooglePlaces && (
            <button
              onClick={() => {
                soundManager.playTap();
                onOpenGooglePlaces();
              }}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-sky-300 hover:text-white border border-sky-500/30 font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl shadow-sky-500/10 transition cursor-pointer"
            >
              <Camera className="w-5 h-5 text-sky-400" />
              <span>Google Places & Photos</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-black">
                Live
              </span>
            </button>
          )}
        </div>

        {/* TRUST & FEATURE BADGES */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto text-left">
          <div className="p-3.5 rounded-2xl bg-slate-900/50 backdrop-blur-md border border-slate-800">
            <Box className="w-5 h-5 text-amber-400 mb-1.5" />
            <h4 className="text-xs font-bold text-white">3D Spatial Previews</h4>
            <p className="text-[11px] text-slate-400 mt-0.5">Orbit, zoom, and inspect terrain & shrines</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/50 backdrop-blur-md border border-slate-800">
            <TrendingUp className="w-5 h-5 text-amber-400 mb-1.5" />
            <h4 className="text-xs font-bold text-white">Strict Budget Fitting</h4>
            <p className="text-[11px] text-slate-400 mt-0.5">Accurate INR cost breakdowns per trip</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/50 backdrop-blur-md border border-slate-800">
            <MapPin className="w-5 h-5 text-amber-400 mb-1.5" />
            <h4 className="text-xs font-bold text-white">Curated Indian Gems</h4>
            <p className="text-[11px] text-slate-400 mt-0.5">From Vikarabad ridges to high Spiti gompas</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/50 backdrop-blur-md border border-slate-800">
            <ShieldCheck className="w-5 h-5 text-amber-400 mb-1.5" />
            <h4 className="text-xs font-bold text-white">Zero Guesswork</h4>
            <p className="text-[11px] text-slate-400 mt-0.5">Deterministic scores + verified local facts</p>
          </div>
        </div>

      </div>
    </section>
  );
};
