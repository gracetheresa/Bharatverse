import React, { useState, useMemo, useEffect } from 'react';
import { Destination, RecommendationResult } from '../types/travel';
import { soundManager } from '../utils/soundEffects';
import { fetchGoogleCustomSearchImages } from '../utils/googleCustomSearch';
import {
  Sparkles,
  MapPin,
  Clock,
  Heart,
  SlidersHorizontal,
  Box,
  Compass,
  ArrowRight,
  Map,
  Camera,
  ShoppingBag,
  Home,
  UtensilsCrossed,
  Users
} from 'lucide-react';

interface Props {
  results: RecommendationResult[];
  onExploreDestination: (destination: Destination, initialTab?: '3d' | 'local-bharat' | 'google-maps') => void;
  savedDestinationIds: string[];
  onToggleSave: (destination: Destination) => void;
  onModifyPreferences: () => void;
}

const DestinationCardImage: React.FC<{ destination: Destination }> = ({ destination }) => {
  const [imageUrl, setImageUrl] = useState<string>(destination.coverImage);
  const [isDynamic, setIsDynamic] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    fetchGoogleCustomSearchImages(destination.name, { count: 1, state: destination.state })
      .then((images) => {
        if (isMounted && images.length > 0 && images[0].url) {
          setImageUrl(images[0].url);
          setIsDynamic(true);
        }
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, [destination.name, destination.state]);

  return (
    <div className="relative w-full h-full">
      <img
        src={imageUrl}
        alt={destination.name}
        className="w-full h-full object-cover group-hover:scale-105 transition duration-700 ease-out"
        loading="lazy"
      />
      {isDynamic && (
        <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-md border border-amber-500/30 text-[9px] font-semibold text-amber-300 flex items-center gap-1 shadow-md">
          <Camera className="w-2.5 h-2.5 text-amber-400" />
          <span>Real Imagery</span>
        </div>
      )}
    </div>
  );
};

export const RecommendationList: React.FC<Props> = ({
  results,
  onExploreDestination,
  savedDestinationIds,
  onToggleSave,
  onModifyPreferences,
}) => {
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [maxBudgetFilter, setMaxBudgetFilter] = useState<number>(30000);
  const [maxDurationFilter, setMaxDurationFilter] = useState<number>(7);
  const [maxDistFilter, setMaxDistFilter] = useState<number>(3000);

  // Available categories in current results
  const allCategories = useMemo(() => {
    const set = new Set<string>();
    results.forEach((r) => r.destination.categories.forEach((c) => set.add(c)));
    return ['All', ...Array.from(set)];
  }, [results]);

  // Filtered results
  const filteredResults = useMemo(() => {
    return results.filter((r) => {
      if (categoryFilter !== 'All' && !r.destination.categories.includes(categoryFilter as any)) {
        return false;
      }
      if (r.destination.typicalBudgetPerPerson > maxBudgetFilter) {
        return false;
      }
      if (r.destination.idealDurationDays > maxDurationFilter) {
        return false;
      }
      if (r.distanceKm > maxDistFilter) {
        return false;
      }
      return true;
    });
  }, [results, categoryFilter, maxBudgetFilter, maxDurationFilter, maxDistFilter]);

  return (
    <section id="results-section" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      
      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/25 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Ranked & Verified Matches</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Your India, Personalized.
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Top ranked destinations tailored to your starting location, budget, and travel interests.
          </p>
        </div>

        <button
          onClick={() => {
            soundManager.playTap();
            onModifyPreferences();
          }}
          className="self-start md:self-auto px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 flex items-center gap-2 transition"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
          <span>Adjust Preferences</span>
        </button>
      </div>

      {/* FILTER CONTROLS BAR */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md mb-8 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
          <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
          <span>Interactive Filters:</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Category Chips */}
          <div className="flex flex-wrap gap-1.5">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  soundManager.playTap();
                  setCategoryFilter(cat);
                }}
                className={`text-xs px-3 py-1.5 rounded-xl border transition ${
                  categoryFilter === cat
                    ? 'bg-amber-500 text-slate-950 font-bold border-amber-400'
                    : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Quick Distance Filter */}
          <div className="flex items-center gap-1.5 ml-auto text-xs text-slate-400">
            <span>Max Distance:</span>
            <select
              value={maxDistFilter}
              onChange={(e) => setMaxDistFilter(Number(e.target.value))}
              aria-label="Filter by maximum distance"
              className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1 text-slate-200 text-xs focus:outline-none"
            >
              <option value={150}>&lt; 150 km</option>
              <option value={450}>&lt; 450 km</option>
              <option value={800}>&lt; 800 km</option>
              <option value={3000}>All India</option>
            </select>
          </div>
        </div>
      </div>

      {/* DESTINATION CARDS GRID */}
      {filteredResults.length === 0 ? (
        <div className="text-center py-16 px-4 rounded-3xl bg-slate-900/40 border border-slate-800">
          <Compass className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-200">No destinations match all current filters</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Try relaxing your filters or adjusting your budget and distance settings.
          </p>
          <button
            onClick={() => {
              setCategoryFilter('All');
              setMaxBudgetFilter(30000);
              setMaxDistFilter(3000);
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredResults.map((result, idx) => {
            const dest = result.destination;
            const isSaved = savedDestinationIds.includes(dest.id);
            const isTopMatch = idx === 0;

            return (
              <div
                key={dest.id}
                className={`group relative rounded-3xl bg-slate-900/75 border transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1.5 shadow-xl ${
                  isTopMatch
                    ? 'border-amber-400/50 shadow-amber-500/10'
                    : 'border-slate-800 hover:border-amber-500/30'
                }`}
              >
                {/* CARD IMAGE & BADGES */}
                <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-950">
                  <DestinationCardImage destination={dest} />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent pointer-events-none" />

                  {/* MATCH SCORE & GOOGLE VERIFIED PILL */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
                    <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-amber-500/40 text-amber-300 text-xs font-black shadow-lg">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>{result.matchScore}% MATCH</span>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-sky-500/30 text-sky-300 text-[10px] font-semibold">
                      <span>Google Places & Local Discovery</span>
                    </div>
                  </div>

                  {/* 3D READY BADGE */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/85 backdrop-blur-md text-[11px] font-semibold text-slate-200 border border-slate-700/80">
                    <Box className="w-3.5 h-3.5 text-amber-400" />
                    <span>3D Scene</span>
                  </div>

                  {/* SAVE QUICK BUTTON */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      soundManager.playTap();
                      onToggleSave(dest);
                    }}
                    className={`absolute bottom-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all shadow-md ${
                      isSaved
                        ? 'bg-rose-500 text-white shadow-rose-500/40'
                        : 'bg-slate-900/80 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 border border-slate-700/70'
                    }`}
                    title={isSaved ? 'Remove from My Journey' : 'Save to My Journey'}
                  >
                    <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                  </button>

                  {/* DESTINATION TITLE OVER IMAGE */}
                  <div className="absolute bottom-3 left-3 right-16">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                      {dest.state}
                    </span>
                    <h3 className="text-xl font-black text-white leading-tight drop-shadow-md">
                      {dest.name}
                    </h3>
                  </div>
                </div>

                {/* CARD BODY */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  
                  {/* METRICS ROW */}
                  <div className="flex items-center justify-between text-xs text-slate-300 border-b border-slate-800 pb-3">
                    <span className="flex items-center gap-1 font-semibold text-white">
                      <span>₹{dest.typicalBudgetPerPerson.toLocaleString('en-IN')}</span>
                      <span className="text-[10px] text-slate-400 font-normal">/ person</span>
                    </span>

                    <span className="flex items-center gap-1 text-slate-300">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>{dest.idealDurationDays} Days</span>
                    </span>

                    <span className="flex items-center gap-1 text-slate-300">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      <span>{result.distanceKm} km</span>
                    </span>
                  </div>

                  {/* REASON FOR RECOMMENDATION */}
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-300 leading-relaxed font-normal">
                    <span className="font-semibold text-amber-300 block mb-0.5 text-[11px] uppercase tracking-wider">
                      Why it matches you:
                    </span>
                    {result.reason}
                  </div>

                  {/* CATEGORY TAGS */}
                  <div className="flex flex-wrap gap-1.5">
                    {dest.categories.map((cat) => (
                      <span
                        key={cat}
                        className="text-[10px] font-medium px-2.5 py-0.5 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/60"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  {/* EXPERIENCE BHARAT LOCALLY PREVIEW & ACTION BAR */}
                  <div className="p-3 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/5 border border-amber-500/30 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-black tracking-wider text-amber-300 uppercase flex items-center gap-1.5">
                        <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
                        Experience Bharat Locally
                      </span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
                        Google Places (New)
                      </span>
                    </div>

                    {/* 4 Pillars Mini Indicator */}
                    <div className="grid grid-cols-4 gap-1 text-[9px] font-bold text-center">
                      <div className="p-1 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 flex flex-col items-center">
                        <Home className="w-2.5 h-2.5 text-amber-400 mb-0.5" />
                        <span>STAY</span>
                      </div>
                      <div className="p-1 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 flex flex-col items-center">
                        <UtensilsCrossed className="w-2.5 h-2.5 text-orange-400 mb-0.5" />
                        <span>EAT</span>
                      </div>
                      <div className="p-1 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 flex flex-col items-center">
                        <Users className="w-2.5 h-2.5 text-emerald-400 mb-0.5" />
                        <span>MEET</span>
                      </div>
                      <div className="p-1 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 flex flex-col items-center">
                        <ShoppingBag className="w-2.5 h-2.5 text-sky-400 mb-0.5" />
                        <span>SHOP</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        soundManager.playTap();
                        onExploreDestination(dest, 'local-bharat');
                      }}
                      className="w-full py-2 px-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 hover:text-white border border-amber-500/40 font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                    >
                      <span>Explore Local Weavers, Food & Stays</span>
                      <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                    </button>
                  </div>

                  {/* ACTION BUTTONS: 3D & GOOGLE MAPS/PHOTOS */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                    <button
                      onClick={() => {
                        soundManager.playTap();
                        onExploreDestination(dest, '3d');
                      }}
                      className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/15 transition transform active:scale-98 cursor-pointer"
                    >
                      <Box className="w-3.5 h-3.5" />
                      <span>Explore 3D</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => {
                        soundManager.playTap();
                        onExploreDestination(dest, 'google-maps');
                      }}
                      className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-300 hover:text-white border border-sky-500/30 font-bold text-xs flex items-center justify-center gap-1.5 transition active:scale-98 cursor-pointer"
                    >
                      <Map className="w-3.5 h-3.5 text-sky-400" />
                      <span>Google Maps & Photos</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
