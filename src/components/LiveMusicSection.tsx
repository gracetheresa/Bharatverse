import React, { useState, useMemo } from 'react';
import { LiveMusicEvent, TravelGroup, EventSourceStatus } from '../types/travel';
import { LIVE_MUSIC_EVENTS, MUSIC_GENRES, POPULAR_MUSIC_SEARCHES } from '../data/liveMusicData';
import { soundManager } from '../utils/soundEffects';
import {
  Music,
  Search,
  MapPin,
  Calendar,
  Clock,
  Tag,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  Heart,
  SlidersHorizontal,
  X,
  Volume2,
  Users,
  Compass,
  ArrowRight,
  Info,
  Radio,
  Building,
  Navigation,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface Props {
  onSaveEvent?: (event: LiveMusicEvent) => void;
  savedEventIds?: string[];
  userPreferencesLocation?: string;
  userPreferencesGroup?: TravelGroup;
  onOpenAIChat?: (prompt?: string) => void;
}

export const LiveMusicSection: React.FC<Props> = ({
  onSaveEvent,
  savedEventIds = [],
  userPreferencesLocation,
  userPreferencesGroup,
  onOpenAIChat,
}) => {
  // Search state
  const [searchQuery, setSearchQuery] = useState('');

  // Primary Genre Filter
  const [selectedGenre, setSelectedGenre] = useState<string>('all');

  // Advanced Filters
  const [selectedState, setSelectedState] = useState<string>('all');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [selectedDateFilter, setSelectedDateFilter] = useState<string>('all');
  const [selectedArtist, setSelectedArtist] = useState<string>('all');
  const [selectedBudget, setSelectedBudget] = useState<string>('all');
  const [selectedSetting, setSelectedSetting] = useState<string>('all'); // Indoor / Outdoor
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Filter Drawer Toggle on Mobile / Compact
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Selected Modal for deep event inspection
  const [inspectEvent, setInspectEvent] = useState<LiveMusicEvent | null>(null);

  // Real Google Places music venues in current city
  const [realVenues, setRealVenues] = useState<any[]>([]);
  const [isLoadingRealVenues, setIsLoadingRealVenues] = useState(false);
  const [showRealVenuesModal, setShowRealVenuesModal] = useState(false);

  // Gemini Music Concierge personalization state
  const [geminiQuery, setGeminiQuery] = useState('');
  const [isAskingGemini, setIsAskingGemini] = useState(false);
  const [geminiPersonalizedReply, setGeminiPersonalizedReply] = useState<string | null>(null);
  const [geminiMatchedIds, setGeminiMatchedIds] = useState<string[] | null>(null);
  const [geminiNoMatchesWarning, setGeminiNoMatchesWarning] = useState<string | null>(null);

  // Fetch real Google Places live venues for a city
  const handleFetchRealVenues = async (cityName: string) => {
    soundManager.playTap();
    setIsLoadingRealVenues(true);
    setShowRealVenuesModal(true);
    try {
      const res = await fetch(`/api/real-music-venues?city=${encodeURIComponent(cityName)}`);
      if (res.ok) {
        const data = await res.json();
        setRealVenues(data.venues || []);
      }
    } catch (err) {
      console.warn('Real venues fetch error:', err);
    } finally {
      setIsLoadingRealVenues(false);
    }
  };

  // Submit query to Gemini Music Concierge
  const handleAskGeminiConcierge = async (promptText: string) => {
    soundManager.playChime();
    setGeminiQuery(promptText);
    setIsAskingGemini(true);
    setGeminiPersonalizedReply(null);
    setGeminiNoMatchesWarning(null);

    try {
      const res = await fetch('/api/gemini/music-concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptText,
          userPreferences: {
            startingLocation: userPreferencesLocation,
            travelGroup: userPreferencesGroup,
          },
        }),
      });

      if (!res.ok) throw new Error('Music concierge request failed');
      const data = await res.json();

      setGeminiPersonalizedReply(data.reply);
      if (data.noMatchesFound) {
        setGeminiNoMatchesWarning(data.reply);
        setGeminiMatchedIds([]);
      } else {
        setGeminiMatchedIds(data.matchingEventIds || null);
        if (data.extractedFilters?.genre) {
          setSelectedGenre(data.extractedFilters.genre);
        }
        if (data.extractedFilters?.city) {
          setSelectedCity(data.extractedFilters.city);
        }
      }
    } catch (err) {
      console.warn('Gemini concierge error:', err);
      // Fallback to opening assistant modal if server call errors
      if (onOpenAIChat) {
        onOpenAIChat(promptText);
      }
    } finally {
      setIsAskingGemini(false);
    }
  };

  // Extract unique filter lists from data
  const statesList = useMemo(() => {
    return Array.from(new Set(LIVE_MUSIC_EVENTS.map((e) => e.state))).sort();
  }, []);

  const citiesList = useMemo(() => {
    return Array.from(new Set(LIVE_MUSIC_EVENTS.map((e) => e.city))).sort();
  }, []);

  const artistsList = useMemo(() => {
    return Array.from(new Set(LIVE_MUSIC_EVENTS.map((e) => e.artist.split('(')[0].trim()))).sort();
  }, []);

  // Filter logic
  const filteredEvents = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return LIVE_MUSIC_EVENTS.filter((evt) => {
      // 1. Text Search matching artist, title, venue, city, state, genre, or description
      if (q) {
        const fullContent = `
          ${evt.artistOrEventName} 
          ${evt.artist} 
          ${evt.venue} 
          ${evt.city} 
          ${evt.state} 
          ${evt.genre} 
          ${evt.description}
          ${evt.highlights.join(' ')}
          ${evt.setting}
        `.toLowerCase();

        // Special handling for queries like "concerts this weekend"
        if (q.includes('weekend')) {
          const isWeekendOrOngoing = evt.date.toLowerCase().includes('ongoing') || evt.date.toLowerCase().includes('thursday') || evt.date.toLowerCase().includes('oct') || evt.date.toLowerCase().includes('nov');
          if (!isWeekendOrOngoing && !fullContent.includes('weekend')) return false;
        } else {
          // Token-based matching
          const tokens = q.split(/\s+/).filter(Boolean);
          const matchesAllTokens = tokens.every((token) => fullContent.includes(token));
          if (!matchesAllTokens) return false;
        }
      }

      // 2. Music Genre filter
      if (selectedGenre !== 'all' && evt.genre !== selectedGenre) {
        return false;
      }

      // 3. State filter
      if (selectedState !== 'all' && evt.state !== selectedState) {
        return false;
      }

      // 4. City filter
      if (selectedCity !== 'all' && evt.city !== selectedCity) {
        return false;
      }

      // 5. Date filter
      if (selectedDateFilter !== 'all') {
        const d = evt.date.toLowerCase();
        if (selectedDateFilter === 'ongoing' && !d.includes('ongoing') && !d.includes('daily') && !d.includes('every')) return false;
        if (selectedDateFilter === 'upcoming-month' && !d.includes('oct') && !d.includes('nov') && !d.includes('dec')) return false;
        if (selectedDateFilter === 'festivals' && evt.genre !== 'Cultural Music Festivals') return false;
      }

      // 6. Artist filter
      if (selectedArtist !== 'all' && !evt.artist.toLowerCase().includes(selectedArtist.toLowerCase())) {
        return false;
      }

      // 7. Budget filter
      if (selectedBudget !== 'all') {
        const cost = evt.priceInr ?? 0;
        if (selectedBudget === 'free' && cost !== 0) return false;
        if (selectedBudget === 'under-500' && (cost > 500 && cost !== 0)) return false;
        if (selectedBudget === '500-1500' && (cost < 500 || cost > 1500)) return false;
        if (selectedBudget === 'above-1500' && cost <= 1500) return false;
      }

      // 8. Indoor / Outdoor setting
      if (selectedSetting !== 'all') {
        if (selectedSetting === 'Indoor' && evt.setting === 'Outdoor') return false;
        if (selectedSetting === 'Outdoor' && evt.setting === 'Indoor') return false;
      }

      // 9. Travel Group suitability (Family / Solo / Group / Couple)
      if (selectedGroup !== 'all') {
        if (!evt.suitableFor.includes(selectedGroup as TravelGroup)) {
          return false;
        }
      }

      // 10. Status filter
      if (selectedStatus !== 'all' && evt.status !== selectedStatus) {
        return false;
      }

      return true;
    });
  }, [
    searchQuery,
    selectedGenre,
    selectedState,
    selectedCity,
    selectedDateFilter,
    selectedArtist,
    selectedBudget,
    selectedSetting,
    selectedGroup,
    selectedStatus,
  ]);

  // Reset all filters
  const handleResetFilters = () => {
    soundManager.playTap();
    setSearchQuery('');
    setSelectedGenre('all');
    setSelectedState('all');
    setSelectedCity('all');
    setSelectedDateFilter('all');
    setSelectedArtist('all');
    setSelectedBudget('all');
    setSelectedSetting('all');
    setSelectedGroup('all');
    setSelectedStatus('all');
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedGenre !== 'all' ||
    selectedState !== 'all' ||
    selectedCity !== 'all' ||
    selectedDateFilter !== 'all' ||
    selectedArtist !== 'all' ||
    selectedBudget !== 'all' ||
    selectedSetting !== 'all' ||
    selectedGroup !== 'all' ||
    selectedStatus !== 'all';

  // Helper for status badge rendering
  const renderStatusBadge = (status: EventSourceStatus, isCompact = false) => {
    switch (status) {
      case 'LIVE / VERIFIED':
        return (
          <span
            className={`inline-flex items-center gap-1.5 rounded-full font-black tracking-wide border shadow-sm ${
              isCompact ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs'
            } bg-emerald-950/80 text-emerald-300 border-emerald-500/50`}
            title="Verified event with official schedule & confirmed venue"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>LIVE / VERIFIED</span>
          </span>
        );
      case 'CURATED':
        return (
          <span
            className={`inline-flex items-center gap-1.5 rounded-full font-black tracking-wide border shadow-sm ${
              isCompact ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs'
            } bg-amber-950/80 text-amber-300 border-amber-500/50`}
            title="Curated traditional or seasonal cultural concert"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>CURATED</span>
          </span>
        );
      case 'DEMO':
        return (
          <span
            className={`inline-flex items-center gap-1.5 rounded-full font-black tracking-wide border shadow-sm ${
              isCompact ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs'
            } bg-sky-950/80 text-sky-300 border-sky-500/50`}
            title="Demo event preview for platform showcase. Not an actual upcoming concert."
          >
            <span className="w-2 h-2 rounded-full bg-sky-400" />
            <span>DEMO</span>
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <section id="live-music-section" className="mb-14 space-y-8 animate-in fade-in duration-300">
      
      {/* ========================================================
          1. HEADER & HERO CALLOUT
      ======================================================== */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-purple-950/30 to-slate-950 border border-amber-500/35 p-6 sm:p-10 shadow-2xl">
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(245,158,11,0.05)_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-bold shadow-sm">
              <Music className="w-3.5 h-3.5 text-amber-400" />
              <span>LIVE MUSIC & CONCERTS</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-950 text-amber-300 border border-amber-500/30 font-semibold">
                Classical · Folk · Sufi · Indie
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              🎵 LIVE MUSIC & CONCERTS
              <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-purple-300 to-amber-400 text-2xl sm:text-3xl font-bold">
                “Feel India through its music.”
              </span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Experience the profound acoustic soul of India: from 300-year-old Margazhi sabha Carnatic ragams in Chennai, 
              sunrise sitar recitals along Varanasi’s ghats, ecstatic Nizamuddin Qawwalis in Old Delhi, and Thar desert Manganiyar ballads, 
              to contemporary Carnatic rock fusions and high-energy indie festivals.
            </p>
          </div>

          {/* Strict Authenticity & Status Verification Legend */}
          <div className="w-full lg:w-80 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 shadow-inner space-y-2.5 backdrop-blur-md">
            <div className="flex items-center gap-1.5 text-xs font-black text-white uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Concert Status Transparency</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-snug">
              Every event card clearly declares its authenticity status. We never fabricate live events or pretend demo cards are actual upcoming concerts.
            </p>
            <div className="space-y-1.5 pt-1 text-[11px]">
              <div className="flex items-center gap-2 text-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                <span className="font-bold">🟢 LIVE / VERIFIED:</span>
                <span className="text-slate-400 text-[10px]">Confirmed real performance</span>
              </div>
              <div className="flex items-center gap-2 text-amber-300">
                <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                <span className="font-bold">🟡 CURATED:</span>
                <span className="text-slate-400 text-[10px]">Annual season or heritage tradition</span>
              </div>
              <div className="flex items-center gap-2 text-sky-300">
                <span className="w-2 h-2 rounded-full bg-sky-400 shrink-0" />
                <span className="font-bold">🔵 DEMO:</span>
                <span className="text-slate-400 text-[10px]">UI showcase simulation</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          2. SEARCH BOX WITH SUGGESTIONS
      ======================================================== */}
      <div className="space-y-3">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-amber-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search artists, concerts or cities… (e.g., 'Carnatic concerts in Hyderabad', 'Sufi concerts', 'Live music in Bengaluru')"
            className="w-full pl-12 pr-12 py-4 rounded-2xl bg-slate-900/90 border border-slate-800 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-white placeholder-slate-400 text-sm sm:text-base transition backdrop-blur-md shadow-lg"
          />
          {searchQuery && (
            <button
              onClick={() => {
                soundManager.playTap();
                setSearchQuery('');
              }}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-white transition cursor-pointer"
              title="Clear search"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Quick Suggested Queries */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
          <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest shrink-0 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Popular:</span>
          </span>
          {POPULAR_MUSIC_SEARCHES.map((query) => (
            <button
              key={query}
              onClick={() => {
                soundManager.playTap();
                setSearchQuery(query);
              }}
              className={`px-3 py-1 rounded-xl text-xs whitespace-nowrap transition cursor-pointer font-medium ${
                searchQuery.toLowerCase() === query.toLowerCase()
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
              }`}
            >
              {query}
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================
          3. GENRE HORIZONTAL SCROLLER
      ======================================================== */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
            <Music className="w-3.5 h-3.5 text-amber-400" />
            <span>Select Music Genre</span>
          </span>
          <span className="text-[11px] text-slate-400">
            {MUSIC_GENRES.length} musical disciplines
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2">
          {MUSIC_GENRES.map((g) => {
            const isSelected = selectedGenre === g.id;
            return (
              <button
                key={g.id}
                onClick={() => {
                  soundManager.playTap();
                  setSelectedGenre(g.id);
                }}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 shadow-lg shadow-amber-500/25 scale-[1.02]'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-amber-500/30'
                }`}
                title={g.description}
              >
                <span>{g.icon}</span>
                <span>{g.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================
          4. COMPREHENSIVE FILTER CONTROLS
      ======================================================== */}
      <div className="rounded-3xl bg-slate-900/70 border border-slate-800/80 p-5 sm:p-6 backdrop-blur-md shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm sm:text-base font-bold text-white">
              Filter Concerts & Recitals
            </h3>
            {hasActiveFilters && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 font-black">
                Active
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold flex items-center gap-1 transition cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}

            <button
              onClick={() => {
                soundManager.playTap();
                setShowAdvancedFilters(!showAdvancedFilters);
              }}
              className="sm:hidden px-3 py-1.5 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold flex items-center gap-1 transition"
            >
              <span>{showAdvancedFilters ? 'Collapse' : 'Expand All Filters'}</span>
            </button>
          </div>
        </div>

        {/* Filter Dropdowns Grid */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5 ${showAdvancedFilters ? 'block' : 'hidden sm:grid'}`}>
          {/* State Filter */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              🗺️ State
            </label>
            <select
              value={selectedState}
              onChange={(e) => {
                soundManager.playTap();
                setSelectedState(e.target.value);
              }}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:border-amber-500 focus:outline-none cursor-pointer"
            >
              <option value="all">All States</option>
              {statesList.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          {/* City Filter */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              🏙️ City
            </label>
            <select
              value={selectedCity}
              onChange={(e) => {
                soundManager.playTap();
                setSelectedCity(e.target.value);
              }}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:border-amber-500 focus:outline-none cursor-pointer"
            >
              <option value="all">All Cities</option>
              {citiesList.map((ct) => (
                <option key={ct} value={ct}>
                  {ct}
                </option>
              ))}
            </select>
          </div>

          {/* Date Filter */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              📅 Date / Schedule
            </label>
            <select
              value={selectedDateFilter}
              onChange={(e) => {
                soundManager.playTap();
                setSelectedDateFilter(e.target.value);
              }}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:border-amber-500 focus:outline-none cursor-pointer"
            >
              <option value="all">All Schedules</option>
              <option value="ongoing">Daily / Ongoing Traditions</option>
              <option value="upcoming-month">This Season (Oct - Dec)</option>
              <option value="festivals">Music Festivals & Conferences</option>
            </select>
          </div>

          {/* Artist Filter */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              🎵 Featured Artist
            </label>
            <select
              value={selectedArtist}
              onChange={(e) => {
                soundManager.playTap();
                setSelectedArtist(e.target.value);
              }}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:border-amber-500 focus:outline-none cursor-pointer"
            >
              <option value="all">All Artists & Troupes</option>
              {artistsList.map((art) => (
                <option key={art} value={art}>
                  {art}
                </option>
              ))}
            </select>
          </div>

          {/* Budget Filter */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              💰 Budget
            </label>
            <select
              value={selectedBudget}
              onChange={(e) => {
                soundManager.playTap();
                setSelectedBudget(e.target.value);
              }}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:border-amber-500 focus:outline-none cursor-pointer"
            >
              <option value="all">All Budgets</option>
              <option value="free">Free / Public Heritage Gathering</option>
              <option value="under-500">Under ₹500</option>
              <option value="500-1500">₹500 - ₹1,500</option>
              <option value="above-1500">₹1,500+</option>
            </select>
          </div>

          {/* Indoor / Outdoor Filter */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              🏛️ Setting
            </label>
            <select
              value={selectedSetting}
              onChange={(e) => {
                soundManager.playTap();
                setSelectedSetting(e.target.value);
              }}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:border-amber-500 focus:outline-none cursor-pointer"
            >
              <option value="all">Indoor & Outdoor</option>
              <option value="Indoor">Indoor (Sabhas, Auditoriums, Theatres)</option>
              <option value="Outdoor">Outdoor (Ghats, Forts, Gardens, Amphis)</option>
            </select>
          </div>

          {/* Family / Solo / Group Suitability */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              👥 Travel Group
            </label>
            <select
              value={selectedGroup}
              onChange={(e) => {
                soundManager.playTap();
                setSelectedGroup(e.target.value);
              }}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:border-amber-500 focus:outline-none cursor-pointer"
            >
              <option value="all">All Groups</option>
              <option value="Solo">Solo Traveler</option>
              <option value="Family">Family Friendly</option>
              <option value="Friends">Friends & Youth</option>
              <option value="Couple">Couple / Romantic</option>
              <option value="Senior Friendly">Senior Friendly Seated</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              🛡️ Verification Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => {
                soundManager.playTap();
                setSelectedStatus(e.target.value);
              }}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:border-amber-500 focus:outline-none cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="LIVE / VERIFIED">🟢 Live / Verified Only</option>
              <option value="CURATED">🟡 Curated Traditions Only</option>
              <option value="DEMO">🔵 Demo Previews Only</option>
            </select>
          </div>
        </div>

        {/* Results Counter Summary */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80">
          <div>
            Showing <strong className="text-white font-bold">{filteredEvents.length}</strong> concerts matching your filters
          </div>
          {searchQuery && (
            <div className="text-amber-400 truncate max-w-xs">
              Matches for "{searchQuery}"
            </div>
          )}
        </div>
      </div>

      {/* ========================================================
          5. EVENT CARDS GRID
      ======================================================== */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((evt) => {
            const isSaved = savedEventIds.includes(evt.id);

            return (
              <div
                key={evt.id}
                className="group relative rounded-3xl bg-slate-900/85 border border-slate-800 hover:border-amber-500/50 shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 flex flex-col justify-between overflow-hidden backdrop-blur-md"
              >
                {/* Large Event Image with Ambient Gradient & Overlays */}
                <div className="relative h-56 w-full overflow-hidden bg-slate-950">
                  <img
                    src={evt.image}
                    alt={evt.artistOrEventName}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 inset-x-3 flex items-start justify-between gap-2 z-10">
                    {/* Status Badge */}
                    <div>
                      {renderStatusBadge(evt.status, true)}
                    </div>

                    {/* Quick Save to Journey Heart */}
                    {onSaveEvent && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          soundManager.playTap();
                          onSaveEvent(evt);
                        }}
                        className={`p-2.5 rounded-full backdrop-blur-md transition cursor-pointer shadow-lg ${
                          isSaved
                            ? 'bg-rose-500 text-white shadow-rose-500/30'
                            : 'bg-slate-950/80 hover:bg-slate-900 text-slate-300 hover:text-white border border-slate-700/60'
                        }`}
                        title={isSaved ? 'Remove from My Journey' : 'Save Concert to Journey'}
                      >
                        <Heart className={`w-4 h-4 ${isSaved ? 'fill-current text-white' : ''}`} />
                      </button>
                    )}
                  </div>

                  {/* Genre Chip at Bottom Left of Image */}
                  <div className="absolute bottom-3 left-3 z-10 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-xl bg-slate-950/85 backdrop-blur-md border border-amber-500/40 text-amber-300 font-bold text-xs shadow-md">
                      🎶 {evt.genre}
                    </span>
                    <span className="px-2.5 py-1 rounded-xl bg-slate-900/85 backdrop-blur-md border border-slate-700 text-slate-300 font-medium text-[11px]">
                      {evt.setting === 'Indoor' ? '🏛️ Indoor Hall' : '🌿 Outdoor'}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    
                    {/* Title & Artist */}
                    <div>
                      <h3 className="text-lg sm:text-xl font-black text-white leading-snug group-hover:text-amber-300 transition line-clamp-2">
                        {evt.artistOrEventName}
                      </h3>
                      <div className="text-xs font-bold text-amber-400 mt-1 flex items-center gap-1.5 line-clamp-1">
                        <Music className="w-3.5 h-3.5 shrink-0" />
                        <span>{evt.artist}</span>
                      </div>
                    </div>

                    {/* Venue, City & State */}
                    <div className="space-y-1.5 text-xs text-slate-300">
                      <div className="flex items-start gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">
                          <strong>{evt.venue}</strong>
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-400 text-[11px] pl-5">
                        <span>🏙️ {evt.city}</span>
                        <span>•</span>
                        <span>🗺️ {evt.state}</span>
                      </div>
                    </div>

                    {/* Date, Time & Price */}
                    <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-slate-300">
                          <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span>{evt.date}</span>
                        </span>
                        <span className="flex items-center gap-1.5 text-slate-300">
                          <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span>{evt.time.split(' ')[0]} {evt.time.split(' ')[1]}</span>
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-1 border-t border-slate-800/80">
                        <span className="text-[11px] text-slate-400 uppercase font-semibold">
                          Admission / Pass
                        </span>
                        <span className="text-xs font-black text-amber-300">
                          💰 {evt.price}
                        </span>
                      </div>
                    </div>

                    {/* Description snippet */}
                    <p className="text-xs text-slate-300/90 leading-relaxed line-clamp-2">
                      {evt.description}
                    </p>

                    {/* Suitable for groups */}
                    <div className="flex flex-wrap items-center gap-1 pt-1">
                      {evt.suitableFor.map((grp) => (
                        <span
                          key={grp}
                          className="px-2 py-0.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 text-[10px]"
                        >
                          {grp}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 border-t border-slate-800 flex items-center gap-2">
                    <button
                      onClick={() => {
                        soundManager.playTap();
                        setInspectEvent(evt);
                      }}
                      className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer shadow-md shadow-amber-500/20"
                    >
                      <span>View Concert Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    {evt.googleMapsQuery && (
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(evt.googleMapsQuery)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => soundManager.playTap()}
                        className="p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition"
                        title="Directions on Google Maps"
                      >
                        <Navigation className="w-4 h-4 text-emerald-400" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-amber-400">
            <Music className="w-8 h-8 opacity-60" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white">
              No live music events found
            </h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto">
              We couldn't find any concerts matching your active search and filter combinations.
            </p>
          </div>
          <button
            onClick={handleResetFilters}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition cursor-pointer"
          >
            Clear All Filters & Show All Concerts
          </button>
        </div>
      )}

      {/* ========================================================
          6. MODAL: DEEP CONCERT INSPECTION
      ======================================================== */}
      {inspectEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setInspectEvent(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-slate-900 border border-amber-500/40 p-6 sm:p-8 shadow-2xl space-y-6 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              onClick={() => setInspectEvent(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer z-20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header Image */}
            <div className="relative h-64 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
              <img
                src={inspectEvent.image}
                alt={inspectEvent.artistOrEventName}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                {renderStatusBadge(inspectEvent.status)}
                <span className="px-3 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-amber-500/40 text-amber-300 font-bold text-xs">
                  🎶 {inspectEvent.genre}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 z-10">
                <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                  {inspectEvent.artistOrEventName}
                </h3>
                <div className="text-sm font-bold text-amber-400 mt-1 flex items-center gap-1.5">
                  <Music className="w-4 h-4" />
                  <span>{inspectEvent.artist}</span>
                </div>
              </div>
            </div>

            {/* Transparent Status Notice Box */}
            <div
              className={`p-4 rounded-2xl border text-xs space-y-1.5 ${
                inspectEvent.status === 'LIVE / VERIFIED'
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                  : inspectEvent.status === 'CURATED'
                  ? 'bg-amber-950/40 border-amber-500/40 text-amber-200'
                  : 'bg-sky-950/40 border-sky-500/40 text-sky-200'
              }`}
            >
              <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[11px]">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Source & Verification Notice: {inspectEvent.status}</span>
              </div>
              <p className="leading-relaxed opacity-90">
                {inspectEvent.statusExplanation}
              </p>
            </div>

            {/* Venue & Timing Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs">
              <div className="space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block">
                  📍 Venue & Location
                </span>
                <div className="font-bold text-white text-sm">
                  {inspectEvent.venue}
                </div>
                <div className="text-slate-300">
                  {inspectEvent.city}, {inspectEvent.state}
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block">
                  📅 Schedule & Time
                </span>
                <div className="font-bold text-white text-sm">
                  {inspectEvent.date}
                </div>
                <div className="text-amber-400 font-semibold">
                  ⏰ {inspectEvent.time}
                </div>
              </div>

              <div className="space-y-1 pt-2 sm:pt-0">
                <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block">
                  💰 Pricing
                </span>
                <div className="font-black text-amber-300 text-sm">
                  {inspectEvent.price}
                </div>
              </div>

              <div className="space-y-1 pt-2 sm:pt-0">
                <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block">
                  🏛️ Ambience & Setting
                </span>
                <div className="text-slate-200 font-medium">
                  {inspectEvent.setting === 'Indoor' ? 'Indoor Acoustic Auditorium / Sabha' : 'Open-Air Amphitheatre / Heritage Grounds'}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                About the Concert Experience
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {inspectEvent.description}
              </p>
            </div>

            {/* Highlights */}
            {inspectEvent.highlights && inspectEvent.highlights.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Performance Highlights
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {inspectEvent.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-800">
              {onSaveEvent && (
                <button
                  onClick={() => {
                    soundManager.playTap();
                    onSaveEvent(inspectEvent);
                  }}
                  className={`flex-1 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer ${
                    savedEventIds.includes(inspectEvent.id)
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${savedEventIds.includes(inspectEvent.id) ? 'fill-current text-rose-400' : ''}`} />
                  <span>
                    {savedEventIds.includes(inspectEvent.id)
                      ? 'Saved in My Journey'
                      : 'Save Concert to Journey'}
                  </span>
                </button>
              )}

              {inspectEvent.googleMapsQuery && (
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(inspectEvent.googleMapsQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-emerald-400 text-xs sm:text-sm font-bold flex items-center gap-2 transition"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Directions</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              {inspectEvent.bookingOrInfoUrl && (
                <a
                  href={inspectEvent.bookingOrInfoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-bold flex items-center gap-1.5 transition"
                >
                  <span>Official Venue / Booking</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
