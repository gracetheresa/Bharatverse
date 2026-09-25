import React, { useState, useEffect, useMemo } from 'react';
import { Destination, LocalBharatData, LocalBharatPlace, LocalBharatPillar } from '../types/travel';
import { getFallbackLocalBharat } from '../data/localBharatDemoData';
import { soundManager } from '../utils/soundEffects';
import {
  Sparkles,
  MapPin,
  Star,
  ExternalLink,
  Home,
  UtensilsCrossed,
  Users,
  ShoppingBag,
  ShieldCheck,
  RefreshCw,
  Search,
  CheckCircle2,
  AlertCircle,
  Building,
  Info,
  Map,
  BadgeCheck
} from 'lucide-react';

interface Props {
  destination: Destination;
  initialPillar?: LocalBharatPillar;
  onSelectPlace?: (place: LocalBharatPlace) => void;
  embedded?: boolean;
}

export const ExperienceBharatLocally: React.FC<Props> = ({
  destination,
  initialPillar = 'SHOP LOCAL',
  onSelectPlace,
  embedded = false,
}) => {
  const [activePillar, setActivePillar] = useState<LocalBharatPillar>(initialPillar);
  const [data, setData] = useState<LocalBharatData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('All');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Fetch from Google Places API (New) endpoint
  const fetchLocalBharatData = async (forceRefresh: boolean = false) => {
    setIsLoading(true);
    if (forceRefresh) setIsRefreshing(true);

    try {
      const response = await fetch('/api/local-bharat-discovery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destinationId: destination.id,
          destinationName: destination.name,
          state: destination.state,
          coordinates: destination.coordinates,
        }),
      });

      if (!response.ok) {
        throw new Error(`Local discovery endpoint returned ${response.status}`);
      }

      const result: LocalBharatData = await response.json();
      setData(result);
    } catch (err) {
      console.warn('Failed to fetch from Google Places API (New), using local demo dataset:', err);
      // Fall back to local demo dataset
      const fallback = getFallbackLocalBharat(destination.id, destination.name, destination.state);
      setData(fallback);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchLocalBharatData();
  }, [destination.id]);

  // Pillar configurations
  const PILLAR_CONFIG: Record<
    LocalBharatPillar,
    {
      label: string;
      icon: React.ComponentType<{ className?: string }>;
      colorClass: string;
      bgClass: string;
      borderClass: string;
      subTitle: string;
      dataKey: 'stayLocal' | 'eatLocal' | 'meetLocal' | 'shopLocal';
    }
  > = {
    'STAY LOCAL': {
      label: 'STAY LOCAL',
      icon: Home,
      colorClass: 'text-amber-400',
      bgClass: 'bg-amber-500/10',
      borderClass: 'border-amber-500/30',
      subTitle: 'Hotels, homestays, agro-retreats & eco-cottages',
      dataKey: 'stayLocal',
    },
    'EAT LOCAL': {
      label: 'EAT LOCAL',
      icon: UtensilsCrossed,
      colorClass: 'text-orange-400',
      bgClass: 'bg-orange-500/10',
      borderClass: 'border-orange-500/30',
      subTitle: 'Restaurants, cafes, local food stalls & street food',
      dataKey: 'eatLocal',
    },
    'MEET LOCAL': {
      label: 'MEET LOCAL',
      icon: Users,
      colorClass: 'text-emerald-400',
      bgClass: 'bg-emerald-500/10',
      borderClass: 'border-emerald-500/30',
      subTitle: 'Local guides, heritage storytellers & cultural experiences',
      dataKey: 'meetLocal',
    },
    'SHOP LOCAL': {
      label: 'SHOP LOCAL',
      icon: ShoppingBag,
      colorClass: 'text-sky-400',
      bgClass: 'bg-sky-500/10',
      borderClass: 'border-sky-500/30',
      subTitle: 'Saree shops, handloom centres, weaver cooperatives & artisan businesses',
      dataKey: 'shopLocal',
    },
  };

  const currentConfig = PILLAR_CONFIG[activePillar];
  const activePlacesList = data ? data.pillars[currentConfig.dataKey] : [];

  // Available sub-categories within active pillar
  const availableCategories = useMemo(() => {
    const set = new Set<string>();
    activePlacesList.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ['All', ...Array.from(set)];
  }, [activePlacesList]);

  // Filtered places based on search query and category
  const filteredPlaces = useMemo(() => {
    return activePlacesList.filter((p) => {
      if (selectedSubCategory !== 'All' && p.category !== selectedSubCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchCategory = p.category.toLowerCase().includes(q);
        const matchAddress = p.address.toLowerCase().includes(q);
        const matchEvidence = p.classificationEvidence.toLowerCase().includes(q);
        if (!matchName && !matchCategory && !matchAddress && !matchEvidence) {
          return false;
        }
      }
      return true;
    });
  }, [activePlacesList, selectedSubCategory, searchQuery]);

  return (
    <div className={`w-full text-slate-100 ${embedded ? '' : 'p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto'}`}>
      
      {/* SECTION BANNER & HEADER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-amber-500/30 p-6 sm:p-8 shadow-2xl mb-8">
        <div className="absolute -right-16 -top-16 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-bold mb-3 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Bharatverse Local Bharat Layer</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Google Places API (New)
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-3">
              <span>Experience Bharat Locally</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Explore authentic grass-root ecosystems around <span className="font-bold text-amber-300">{destination.name}</span>, {destination.state}. 
              Discover local weaver cooperatives, traditional food stalls, village homestays, and certified guides discovered dynamically with Google Places Text Search and Nearby Search.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <div className="px-3.5 py-2 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 flex items-center gap-2 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="font-semibold text-white">
                {data ? data.totalCount : 0} Places Discovered
              </span>
              <span className="text-slate-500 text-[10px]">
                ({data?.source.includes('Google Places') ? 'Live Google Places API' : 'Verified Local Dataset'})
              </span>
            </div>

            <button
              onClick={() => {
                soundManager.playTap();
                fetchLocalBharatData(true);
              }}
              disabled={isRefreshing}
              className="px-3 py-2 rounded-2xl bg-slate-800 hover:bg-slate-700 text-amber-300 hover:text-white border border-amber-500/30 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer disabled:opacity-50"
              title="Refresh local discoveries from Google Places API"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-amber-400' : ''}`} />
              <span>{isRefreshing ? 'Discovering...' : 'Live Search'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 PILLARS NAVIGATION TABS: STAY LOCAL | EAT LOCAL | MEET LOCAL | SHOP LOCAL */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8">
        {(Object.keys(PILLAR_CONFIG) as LocalBharatPillar[]).map((pKey) => {
          const cfg = PILLAR_CONFIG[pKey];
          const Icon = cfg.icon;
          const isActive = activePillar === pKey;
          const count = data ? data.pillars[cfg.dataKey].length : 0;

          return (
            <button
              key={pKey}
              onClick={() => {
                soundManager.playTap();
                setActivePillar(pKey);
                setSelectedSubCategory('All');
              }}
              className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                isActive
                  ? 'bg-slate-900 border-amber-400 shadow-xl shadow-amber-500/10 ring-1 ring-amber-400/40'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80 text-slate-300'
              }`}
            >
              {isActive && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-orange-500" />
              )}

              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-xl ${cfg.bgClass} ${cfg.borderClass} border`}>
                  <Icon className={`w-5 h-5 ${cfg.colorClass}`} />
                </div>
                <span
                  className={`text-xs font-black px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {count}
                </span>
              </div>

              <div>
                <span className="block text-sm font-black tracking-wider text-white">
                  {cfg.label}
                </span>
                <span className="block text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                  {cfg.subTitle}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 mb-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 backdrop-blur-md">
        {/* Category Chips */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1 lg:pb-0">
          <span className="text-[11px] font-bold text-slate-400 uppercase shrink-0">Filter:</span>
          {availableCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundManager.playTap();
                setSelectedSubCategory(cat);
              }}
              className={`px-3 py-1 rounded-xl text-xs whitespace-nowrap transition cursor-pointer ${
                selectedSubCategory === cat
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${currentConfig.label.toLowerCase()}...`}
            className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* PLACES CARDS GRID */}
      {isLoading ? (
        <div className="text-center py-20 px-4 bg-slate-900/40 rounded-3xl border border-slate-800 animate-pulse">
          <RefreshCw className="w-8 h-8 text-amber-400 animate-spin mx-auto mb-3" />
          <h3 className="text-sm font-bold text-slate-200">
            Dynamically discovering {currentConfig.label} via Google Places API (New)...
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Executing Text Search and Nearby Search around {destination.name}.
          </p>
        </div>
      ) : filteredPlaces.length === 0 ? (
        <div className="text-center py-16 px-4 bg-slate-900/40 rounded-3xl border border-slate-800">
          <AlertCircle className="w-10 h-10 text-amber-400/60 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-200">No places match this criteria</h3>
          <p className="text-xs text-slate-400 mt-1">
            Try selecting "All" or clearing the search filter above.
          </p>
          <button
            onClick={() => {
              setSelectedSubCategory('All');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-1.5 rounded-xl bg-slate-800 text-amber-300 text-xs font-semibold hover:bg-slate-700"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlaces.map((place) => {
            const hasRating = typeof place.rating === 'number' && place.rating > 0;
            const photoSrc =
              place.photoUrl ||
              'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80';

            return (
              <div
                key={place.id}
                className="group rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 flex flex-col overflow-hidden shadow-xl hover:-translate-y-1"
              >
                {/* PLACE PHOTO & BADGES */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                  <img
                    src={photoSrc}
                    alt={place.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    loading="lazy"
                    onError={(e) => {
                      // Fallback image on error
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />

                  {/* PILLAR BADGE */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-slate-700 text-[10px] font-bold text-slate-200 shadow-md flex items-center gap-1">
                      <currentConfig.icon className={`w-3 h-3 ${currentConfig.colorClass}`} />
                      <span>{place.pillar}</span>
                    </span>
                  </div>

                  {/* VERIFIED ARTISAN / WEAVER / LOCAL PRODUCER BADGE (Strict evidence checkpoint) */}
                  {place.isVerifiedArtisanOrProducer ? (
                    <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-950/90 backdrop-blur-md border border-emerald-500/50 text-emerald-300 text-[10px] font-bold shadow-lg">
                      <BadgeCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Verified Local Artisan</span>
                    </div>
                  ) : (
                    <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700 text-slate-300 text-[9px] font-medium">
                      <span>Verified Place</span>
                    </div>
                  )}

                  {/* DISTANCE PILL */}
                  <div className="absolute bottom-3 left-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-950/90 backdrop-blur-md text-amber-300 font-bold text-xs border border-amber-500/30 shadow-md">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      <span>{place.formattedDistance}</span>
                    </span>
                  </div>
                </div>

                {/* PLACE DETAILS BODY */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    {/* CATEGORY & SUB-CATEGORY */}
                    <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                        {place.category}
                      </span>
                      {place.subCategory && (
                        <span className="text-[10px] text-slate-400 font-medium">
                          • {place.subCategory}
                        </span>
                      )}
                    </div>

                    {/* BUSINESS NAME */}
                    <h3 className="text-base font-extrabold text-white group-hover:text-amber-300 transition leading-snug">
                      {place.name}
                    </h3>

                    {/* RATING & REVIEWS */}
                    <div className="flex items-center gap-2 mt-2 text-xs">
                      {hasRating ? (
                        <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
                          <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
                          <span>{place.rating?.toFixed(1)}</span>
                          {place.userRatingCount && (
                            <span className="text-[10px] text-slate-400 font-normal">
                              ({place.userRatingCount.toLocaleString('en-IN')})
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-[10px] text-slate-500">Unrated local landmark</span>
                      )}

                      {place.priceLevel && (
                        <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                          {place.priceLevel}
                        </span>
                      )}
                    </div>

                    {/* ADDRESS */}
                    <p className="text-xs text-slate-300 mt-2.5 flex items-start gap-1.5 leading-relaxed">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{place.address}</span>
                    </p>

                    {/* EDITORIAL SUMMARY IF AVAILABLE */}
                    {place.editorialSummary && (
                      <p className="text-[11px] text-slate-400 mt-2 italic bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 line-clamp-3">
                        "{place.editorialSummary}"
                      </p>
                    )}

                    {/* CLASSIFICATION FACTUAL EVIDENCE (Strict compliance banner) */}
                    <div className="mt-3 p-2 rounded-xl bg-slate-950/40 border border-slate-800/80 text-[10px] text-slate-400 flex items-start gap-1.5">
                      <Info className="w-3 h-3 text-amber-400/80 shrink-0 mt-0.5" />
                      <span className="leading-tight">
                        <span className="font-semibold text-slate-300">Category Evidence: </span>
                        {place.classificationEvidence}
                      </span>
                    </div>
                  </div>

                  {/* ACTION BAR: GOOGLE MAPS LINK & DETAILS */}
                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2 mt-auto">
                    <span className="text-[10px] text-slate-500 font-mono">
                      {place.source}
                    </span>

                    <a
                      href={place.googleMapsUri}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => soundManager.playTap()}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500 text-amber-300 hover:text-slate-950 border border-amber-500/30 text-xs font-bold transition shadow-sm"
                      title={`Open ${place.name} in Google Maps`}
                    >
                      <span>Google Place</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
