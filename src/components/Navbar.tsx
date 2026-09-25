import React from 'react';
import { soundManager } from '../utils/soundEffects';
import {
  Sparkles,
  Compass,
  Map,
  BookmarkCheck,
  Camera,
  Image as ImageIcon
} from 'lucide-react';

interface Props {
  activeView: 'discover' | 'soul-of-india' | 'underrated' | 'map' | 'google-places' | 'journey';
  onChangeView: (view: 'discover' | 'soul-of-india' | 'underrated' | 'map' | 'google-places' | 'journey') => void;
  savedCount: number;
  onOpenAIModal?: () => void;
  onScrollToPreferences?: () => void;
}

export const Navbar: React.FC<Props> = ({
  activeView,
  onChangeView,
  savedCount,
  onOpenAIModal,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/75 backdrop-blur-xl border-b border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-4">
        
        {/* LOGO & BRAND */}
        <button
          onClick={() => {
            soundManager.playTap();
            onChangeView('discover');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 text-left group cursor-pointer"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-300 p-0.5 shadow-lg shadow-amber-500/20 flex items-center justify-center transform group-hover:scale-105 transition">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Compass className="w-5 h-5 text-amber-400 group-hover:rotate-45 transition duration-500" />
            </div>
          </div>
          <div>
            <span className="text-base sm:text-lg font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400">
              BHARATVERSE
            </span>
            <span className="block text-[10px] font-semibold tracking-widest uppercase text-amber-400/80 -mt-0.5">
              Discover Your India
            </span>
          </div>
        </button>

        {/* NAVIGATION LINKS */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800 backdrop-blur-md">
          <button
            onClick={() => {
              soundManager.playTap();
              onChangeView('discover');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeView === 'discover'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            Discover
          </button>

          {/* SOUL OF INDIA (AUTHENTIC LOCAL EXPERIENCES) */}
          <button
            onClick={() => {
              soundManager.playTap();
              onChangeView('soul-of-india');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeView === 'soul-of-india'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Soul of India</span>
            <span className="text-[9px] px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
              Culture
            </span>
          </button>

          {/* UNDERRATED GEMS (SERPAPI LIVE INTELLIGENCE) */}
          <button
            onClick={() => {
              soundManager.playTap();
              onChangeView('underrated');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeView === 'underrated'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Underrated Gems</span>
            <span className="text-[9px] px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
              SerpApi
            </span>
          </button>

          <button
            onClick={() => {
              soundManager.playTap();
              onChangeView('map');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeView === 'map'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
            }`}
          >
            <Map className="w-3.5 h-3.5" />
            Explore India
          </button>

          {/* GOOGLE PLACES & IMAGES TAB */}
          <button
            onClick={() => {
              soundManager.playTap();
              onChangeView('google-places');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeView === 'google-places'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
            }`}
          >
            <Camera className="w-3.5 h-3.5 text-sky-400" />
            <span>Google Places & Photos</span>
            <span className="text-[9px] px-1 py-0.2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
              Live
            </span>
          </button>

          <button
            onClick={() => {
              soundManager.playTap();
              onChangeView('journey');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all relative cursor-pointer ${
              activeView === 'journey'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
            }`}
          >
            <BookmarkCheck className="w-3.5 h-3.5" />
            My Journey
            {savedCount > 0 && (
              <span className={`text-[10px] font-black px-1.5 py-0.2 rounded-full ${
                activeView === 'journey' ? 'bg-slate-950 text-amber-300' : 'bg-amber-500 text-slate-950'
              }`}>
                {savedCount}
              </span>
            )}
          </button>
        </nav>

        {/* RIGHT ACTIONS: SAVED QUICK ACCESS & MOBILE LINKS */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Soul of India button for mobile */}
          <button
            onClick={() => {
              soundManager.playTap();
              onChangeView('soul-of-india');
            }}
            className={`md:hidden p-2 rounded-xl border text-xs font-semibold flex items-center gap-1 transition ${
              activeView === 'soul-of-india'
                ? 'bg-amber-500 text-slate-950 border-amber-400'
                : 'bg-slate-900 border-slate-800 text-amber-300'
            }`}
            title="Soul of India (Culture)"
          >
            <Sparkles className="w-4 h-4" />
          </button>
          {/* Quick Underrated button for mobile */}
          <button
            onClick={() => {
              soundManager.playTap();
              onChangeView('underrated');
            }}
            className={`md:hidden p-2 rounded-xl border text-xs font-semibold flex items-center gap-1 transition ${
              activeView === 'underrated'
                ? 'bg-amber-500 text-slate-950 border-amber-400'
                : 'bg-slate-900 border-slate-800 text-amber-400'
            }`}
            title="Underrated Gems (SerpApi)"
          >
            <Sparkles className="w-4 h-4" />
          </button>
          {/* Quick Google Places button for mobile */}
          <button
            onClick={() => {
              soundManager.playTap();
              onChangeView('google-places');
            }}
            className={`md:hidden p-2 rounded-xl border text-xs font-semibold flex items-center gap-1 transition ${
              activeView === 'google-places'
                ? 'bg-amber-500 text-slate-950 border-amber-400'
                : 'bg-slate-900 border-slate-800 text-sky-400'
            }`}
            title="Google Places & Photos"
          >
            <Camera className="w-4 h-4" />
          </button>

          {/* Mobile view switch for Journey */}
          <button
            onClick={() => {
              soundManager.playTap();
              onChangeView('journey');
            }}
            className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 relative cursor-pointer"
            title="My Saved Journey"
          >
            <BookmarkCheck className="w-4 h-4 text-amber-400" />
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-slate-950 font-black text-[9px] flex items-center justify-center">
                {savedCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
