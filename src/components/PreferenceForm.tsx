import React, { useState } from 'react';
import { Category, TravelGroup, UserPreferences } from '../types/travel';
import { soundManager } from '../utils/soundEffects';
import {
  MapPin,
  Users,
  Compass,
  Sparkles,
  ArrowRight,
  Accessibility,
  Check,
  AlertCircle
} from 'lucide-react';

interface Props {
  initialPreferences: UserPreferences;
  onSubmit: (preferences: UserPreferences) => void;
  isLoading?: boolean;
}

const CITY_PRESETS = [
  'Hyderabad',
  'Bengaluru',
  'Mumbai',
  'Delhi',
  'Chennai',
  'Pune',
  'Kochi',
  'Jaipur',
  'Visakhapatnam',
  'Kolkata'
];

const GROUP_OPTIONS: { label: TravelGroup; desc: string; icon: string }[] = [
  { label: 'Solo', desc: 'Independent explorer', icon: '🎒' },
  { label: 'Couple', desc: 'Romantic & relaxed', icon: '✨' },
  { label: 'Friends', desc: 'Squad & adventure', icon: '🔥' },
  { label: 'Family', desc: 'All ages & comfort', icon: '🏡' },
  { label: 'Senior Friendly', desc: 'Gentle pace & access', icon: '🌿' },
];

const DURATION_OPTIONS = [
  { days: 1, label: '1 Day', sub: 'Quick day escape' },
  { days: 2, label: '2 Days', sub: 'Classic weekend' },
  { days: 3, label: '3-4 Days', sub: 'Long weekend break' },
  { days: 6, label: '5-7 Days', sub: 'Deep exploration' },
];

const INTEREST_OPTIONS: { category: Category; icon: string }[] = [
  { category: 'Nature & Hills', icon: '⛰️' },
  { category: 'Heritage & History', icon: '🏛️' },
  { category: 'Spiritual & Sacred', icon: '🪔' },
  { category: 'Adventure & Trekking', icon: '🧗' },
  { category: 'Culinary & Food', icon: '🍛' },
  { category: 'Coastal & Beaches', icon: '🌊' },
  { category: 'Art & Architecture', icon: '🎨' },
  { category: 'Wildlife & Forests', icon: '🐅' },
];

const DISTANCE_OPTIONS = [
  { maxKm: 150, label: 'Within 150 km', sub: 'Day trip / drive' },
  { maxKm: 400, label: 'Within 400 km', sub: 'Short road trip' },
  { maxKm: 800, label: 'Within 800 km', sub: 'Overnight train / bus' },
  { maxKm: 2500, label: 'Across India', sub: 'Any flight / distance' },
];

export const PreferenceForm: React.FC<Props> = ({
  initialPreferences,
  onSubmit,
  isLoading = false,
}) => {
  const [preferences, setPreferences] = useState<UserPreferences>(initialPreferences);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleInterestToggle = (category: Category) => {
    soundManager.playTap();
    setPreferences((prev) => {
      const exists = prev.interests.includes(category);
      if (exists) {
        return { ...prev, interests: prev.interests.filter((c) => c !== category) };
      } else {
        return { ...prev, interests: [...prev.interests, category] };
      }
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!preferences.startingLocation.trim()) {
      setErrorMsg('Please enter or select your starting location.');
      return;
    }
    if (preferences.maxBudget < 1000) {
      setErrorMsg('Please specify a reasonable travel budget.');
      return;
    }
    setErrorMsg(null);
    soundManager.playTap();
    onSubmit(preferences);
  };

  return (
    <div id="preferences-section" className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <form
        onSubmit={handleFormSubmit}
        className="rounded-3xl bg-slate-900/75 border border-amber-500/25 p-6 sm:p-10 shadow-2xl backdrop-blur-2xl space-y-8"
      >
        {/* SECTION TITLE */}
        <div className="border-b border-slate-800 pb-5">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Compass className="w-4 h-4 text-amber-400" />
            <span>Trip Preference Architect</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Tailor Your Perfect Indian Journey
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Answer a few quick questions to match destinations to your precise budget, travel pace, and interests.
          </p>
        </div>

        {/* 1. STARTING LOCATION */}
        <div className="space-y-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-amber-400" />
            <span>1. Where are you starting from?</span>
          </label>

          <div className="relative">
            <input
              type="text"
              value={preferences.startingLocation}
              onChange={(e) => {
                setPreferences({ ...preferences, startingLocation: e.target.value });
                setErrorMsg(null);
              }}
              placeholder="e.g. Hyderabad, Bengaluru, Mumbai, Delhi..."
              className="w-full rounded-2xl bg-slate-950/80 border border-slate-700/80 px-4 py-3 text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition"
            />
          </div>

          {/* Quick Hub Presets */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className="text-[11px] text-slate-400 self-center mr-1">Popular:</span>
            {CITY_PRESETS.map((city) => (
              <button
                key={city}
                type="button"
                onClick={() => {
                  soundManager.playTap();
                  setPreferences({ ...preferences, startingLocation: city });
                  setErrorMsg(null);
                }}
                className={`text-xs px-2.5 py-1 rounded-lg transition-all ${
                  preferences.startingLocation.toLowerCase() === city.toLowerCase()
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm shadow-amber-500/20'
                    : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* 2. BUDGET (INR) */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <span>2. Maximum Budget per Person</span>
            </label>
            <span className="text-base sm:text-lg font-black text-amber-300 bg-amber-500/10 px-3 py-1 rounded-xl border border-amber-500/30">
              ₹{preferences.maxBudget.toLocaleString('en-IN')}
            </span>
          </div>

          <input
            type="range"
            min={2000}
            max={30000}
            step={500}
            value={preferences.maxBudget}
            onChange={(e) => setPreferences({ ...preferences, maxBudget: Number(e.target.value) })}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />

          <div className="flex justify-between text-[11px] text-slate-400">
            <span>₹2,000 (Pocket Saver)</span>
            <span>₹10,000 (Comfort)</span>
            <span>₹30,000+ (Luxury)</span>
          </div>

          {/* Budget Presets */}
          <div className="flex flex-wrap gap-2 pt-1">
            {[3000, 5000, 8000, 15000, 25000].map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => {
                  soundManager.playTap();
                  setPreferences({ ...preferences, maxBudget: amt });
                }}
                className={`text-xs px-3 py-1.5 rounded-xl border transition ${
                  preferences.maxBudget === amt
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                    : 'bg-slate-800/60 border-slate-700/70 text-slate-400 hover:text-white'
                }`}
              >
                ₹{amt.toLocaleString('en-IN')}
              </button>
            ))}
          </div>
        </div>

        {/* 3. DURATION */}
        <div className="space-y-3 pt-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <span>3. Trip Duration</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {DURATION_OPTIONS.map((d) => {
              const isSelected = preferences.durationDays === d.days;
              return (
                <button
                  key={d.days}
                  type="button"
                  onClick={() => {
                    soundManager.playTap();
                    setPreferences({ ...preferences, durationDays: d.days });
                  }}
                  className={`p-3 rounded-2xl text-left border transition-all ${
                    isSelected
                      ? 'bg-amber-500/15 border-amber-400 shadow-lg shadow-amber-500/10'
                      : 'bg-slate-800/50 border-slate-700/60 hover:bg-slate-800/80'
                  }`}
                >
                  <div className={`text-sm font-bold ${isSelected ? 'text-amber-300' : 'text-white'}`}>
                    {d.label}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{d.sub}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. TRAVEL GROUP */}
        <div className="space-y-3 pt-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <Users className="w-4 h-4 text-amber-400" />
            <span>4. Who is traveling?</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {GROUP_OPTIONS.map((g) => {
              const isSelected = preferences.travelGroup === g.label;
              return (
                <button
                  key={g.label}
                  type="button"
                  onClick={() => {
                    soundManager.playTap();
                    setPreferences({ ...preferences, travelGroup: g.label });
                  }}
                  className={`p-3 rounded-2xl text-center border transition-all ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-md shadow-amber-500/20'
                      : 'bg-slate-800/50 border-slate-700/60 text-slate-300 hover:bg-slate-800/90'
                  }`}
                >
                  <div className="text-xl mb-1">{g.icon}</div>
                  <div className="text-xs font-bold">{g.label}</div>
                  <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-slate-900' : 'text-slate-400'}`}>
                    {g.desc}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 5. INTERESTS & CATEGORIES */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>5. Interests & Mood (Select multiple)</span>
            </label>
            <span className="text-[11px] text-slate-400">
              {preferences.interests.length} selected
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {INTEREST_OPTIONS.map(({ category, icon }) => {
              const isSelected = preferences.interests.includes(category);
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleInterestToggle(category)}
                  className={`p-2.5 rounded-xl border flex items-center gap-2 text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold shadow-sm'
                      : 'bg-slate-800/40 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span className="text-base">{icon}</span>
                  <span className="truncate">{category}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-amber-400 ml-auto shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* 6. MAXIMUM DISTANCE */}
        <div className="space-y-3 pt-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
            <span>6. Maximum Travel Distance</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {DISTANCE_OPTIONS.map((dist) => {
              const isSelected = preferences.maxDistanceKm === dist.maxKm;
              return (
                <button
                  key={dist.maxKm}
                  type="button"
                  onClick={() => {
                    soundManager.playTap();
                    setPreferences({ ...preferences, maxDistanceKm: dist.maxKm });
                  }}
                  className={`p-3 rounded-2xl text-left border transition-all ${
                    isSelected
                      ? 'bg-amber-500/15 border-amber-400 text-amber-300 font-bold'
                      : 'bg-slate-800/50 border-slate-700/60 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="text-xs font-bold text-white">{dist.label}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{dist.sub}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 7. ACCESSIBILITY TOGGLE */}
        <div className="pt-2">
          <label className="flex items-center justify-between p-4 rounded-2xl bg-slate-950/60 border border-slate-800 cursor-pointer hover:border-slate-700 transition">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
                <Accessibility className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-bold text-white block">
                  Accessible & Senior-Friendly Priority
                </span>
                <span className="text-[11px] text-slate-400 block mt-0.5">
                  Prioritize wheelchair-friendly destinations, motorable paths, and minimal steep climbing.
                </span>
              </div>
            </div>

            <input
              type="checkbox"
              checked={preferences.accessibilityRequired}
              onChange={(e) => {
                soundManager.playTap();
                setPreferences({ ...preferences, accessibilityRequired: e.target.checked });
              }}
              className="w-5 h-5 rounded accent-amber-500 cursor-pointer"
            />
          </label>
        </div>

        {/* ERROR MESSAGE IF ANY */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* SUBMIT BUTTON */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-base sm:text-lg flex items-center justify-center gap-2 shadow-2xl shadow-amber-500/25 transform hover:-translate-y-0.5 transition cursor-pointer"
          >
            <span>Discover My India</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};
