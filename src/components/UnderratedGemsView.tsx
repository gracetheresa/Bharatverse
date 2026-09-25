import React, { useState, useEffect } from 'react';
import { Destination, SerpApiUnderratedPayload, SerpApiUnderratedResult } from '../types/travel';
import { soundManager } from '../utils/soundEffects';
import {
  Sparkles,
  Search,
  ExternalLink,
  Compass,
  Globe,
  HelpCircle,
  TrendingUp,
  MapPin,
  RefreshCw,
  Box,
  ShoppingBag,
  ArrowRight,
  Languages,
  BookOpen,
  MessageSquareQuote,
  CheckCircle2,
  Share2
} from 'lucide-react';

interface Props {
  destinations: Destination[];
  onExploreDestination: (dest: Destination, initialTab?: '3d' | 'local-bharat' | 'google-maps') => void;
  initialQuery?: string;
}

export const UnderratedGemsView: React.FC<Props> = ({
  destinations,
  onExploreDestination,
  initialQuery = 'underrated places in India',
}) => {
  const [query, setQuery] = useState<string>(initialQuery);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [data, setData] = useState<SerpApiUnderratedPayload | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  const PRESET_QUERIES = [
    { label: '🇮🇳 All India Hidden Gems', q: 'underrated places in India' },
    { label: '🏞️ Underrated Hills', q: 'underrated hill stations in India' },
    { label: '🏰 Secret Forts & Ruins', q: 'underrated heritage sites in India' },
    { label: '🌊 Untouched Coasts', q: 'underrated beach destinations in India' },
    { label: '🌲 Telangana Offbeat', q: 'underrated places in Telangana' },
    { label: '🍃 South India Offbeat', q: 'hidden gems in South India' },
    { label: '🏔️ Himalayan Valleys', q: 'unexplored valleys in Himalayas' },
  ];

  const fetchSerpApiData = async (searchQ: string, lang: 'en' | 'hi') => {
    setIsLoading(true);
    try {
      const url = `/api/serpapi-underrated-places?q=${encodeURIComponent(searchQ)}&hl=${lang}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`SerpApi request returned ${res.status}`);
      const payload: SerpApiUnderratedPayload = await res.json();
      setData(payload);
    } catch (err) {
      console.warn('SerpApi frontend fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSerpApiData(query, language);
  }, [language]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    soundManager.playTap();
    fetchSerpApiData(query.trim(), language);
  };

  const handlePresetSelect = (q: string) => {
    soundManager.playTap();
    setQuery(q);
    fetchSerpApiData(q, language);
  };

  const handleCopyLink = (link: string) => {
    soundManager.playTap();
    navigator.clipboard?.writeText(link);
    setCopiedLink(link);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  const findDestinationById = (id: string): Destination | undefined => {
    return destinations.find((d) => d.id === id);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 animate-in fade-in duration-300">
      
      {/* HEADER HERO BANNER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-amber-500/30 p-6 sm:p-10 shadow-2xl mb-10">
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-bold mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Live Google Search Intelligence</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
              SerpApi Live Integration
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Underrated Bharat —{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400">
              Live Web Discoveries
            </span>
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-normal">
            Real-time web pulse powered by SerpApi Google Search engine. Uncover secret mountain ridges, uncrowded river gorges, and artisan hamlets recommended by travelers, local guides, and community discussions.
          </p>

          {/* SEARCH & LANGUAGE CONTROL */}
          <div className="mt-8 space-y-4">
            <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row items-stretch gap-3">
              <div className="relative flex-1">
                <Search className="w-5 h-5 text-amber-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search underrated places in India (e.g. underrated hill stations, hidden gems in Telangana)..."
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-950/80 border border-amber-500/35 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 transition backdrop-blur-md"
                />
              </div>

              {/* Language Switcher: English / Hindi */}
              <div className="flex items-center gap-1 bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800 shrink-0">
                <Languages className="w-4 h-4 text-slate-400 ml-2 mr-1" />
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playTap();
                    setLanguage('en');
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                    language === 'en'
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playTap();
                    setLanguage('hi');
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                    language === 'hi'
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  हिंदी (Hindi)
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-amber-500/20 transition transform active:scale-98 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                ) : (
                  <Globe className="w-4 h-4" />
                )}
                <span>Search Live</span>
              </button>
            </form>

            {/* Quick Exploration Presets */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">
                Explore:
              </span>
              {PRESET_QUERIES.map((preset) => (
                <button
                  key={preset.q}
                  onClick={() => handlePresetSelect(preset.q)}
                  className={`px-3 py-1.5 rounded-xl text-xs transition cursor-pointer ${
                    query === preset.q
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20 border border-amber-400'
                      : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-700/80'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* METRICS & STATUS BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-2 mb-6 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="font-semibold text-slate-200">
            {data ? data.totalResults : 'Searching...'}
          </span>
          <span>• Language: {language === 'hi' ? 'Hindi (hl=hi)' : 'English (hl=en)'}</span>
        </div>

        {data?.googleSearchUrl && (
          <a
            href={data.googleSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sky-400 hover:text-sky-300 underline font-medium"
          >
            <span>View Full Raw Google Search Page</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>

      {/* MAIN CONTENT GRID */}
      {isLoading ? (
        <div className="py-24 text-center bg-slate-900/40 rounded-3xl border border-slate-800 animate-pulse">
          <RefreshCw className="w-8 h-8 text-amber-400 animate-spin mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-200">
            Querying SerpApi for "{query}"...
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
            Extracting real-time Google search results, Reddit travel threads, TripAdvisor hidden gems, and travel publications.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT 8 COLS: ORGANIC SEARCH INTELLIGENCE FEED */}
          <div className="lg:col-span-8 space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-amber-400" />
              <span>Verified Web Dispatches & Articles ({data?.organicResults.length || 0})</span>
            </h3>

            {data?.organicResults.map((result) => {
              const matchedDest =
                result.matchedDestinations && result.matchedDestinations.length > 0
                  ? findDestinationById(result.matchedDestinations[0].id)
                  : undefined;

              return (
                <div
                  key={result.id}
                  className="p-5 sm:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 transition-all duration-200 shadow-xl flex flex-col justify-between space-y-4 group"
                >
                  <div>
                    {/* SOURCE & DOMAIN PILL */}
                    <div className="flex items-center justify-between gap-2 mb-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold border border-slate-700 flex items-center gap-1.5">
                          <Globe className="w-3 h-3 text-sky-400" />
                          <span>{result.source || result.domain}</span>
                        </span>
                        {result.date && (
                          <span className="text-[11px] text-slate-500 font-mono">
                            {result.date}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => handleCopyLink(result.link)}
                        className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition cursor-pointer"
                        title="Copy article link"
                      >
                        {copiedLink === result.link ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Share2 className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    {/* ARTICLE TITLE */}
                    <a
                      href={result.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition leading-snug flex items-start gap-1.5"
                    >
                      <span>{result.title}</span>
                      <ExternalLink className="w-4 h-4 text-slate-400 shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition" />
                    </a>

                    {/* SNIPPET WITH HIGHLIGHTS */}
                    <p className="text-xs sm:text-sm text-slate-300 mt-2.5 leading-relaxed font-normal">
                      {result.snippet}
                    </p>
                  </div>

                  {/* BHARATVERSE 3D CATALOG MATCH BADGE */}
                  {matchedDest && (
                    <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="p-1.5 rounded-lg bg-amber-500 text-slate-950">
                          <Box className="w-4 h-4" />
                        </span>
                        <div>
                          <span className="text-xs font-bold text-amber-300 block">
                            Matched Destination: {matchedDest.name} ({matchedDest.state})
                          </span>
                          <span className="text-[11px] text-slate-300">
                            Available in Bharatverse 3D visualizer & Local Bharat layer!
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => {
                            soundManager.playTap();
                            onExploreDestination(matchedDest, '3d');
                          }}
                          className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1 transition shadow-md cursor-pointer"
                        >
                          <Box className="w-3.5 h-3.5" />
                          <span>View in 3D</span>
                        </button>

                        <button
                          onClick={() => {
                            soundManager.playTap();
                            onExploreDestination(matchedDest, 'local-bharat');
                          }}
                          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 font-semibold text-xs flex items-center gap-1 transition cursor-pointer"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Local Layer</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* BOTTOM ACTION */}
                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                    <span className="font-mono text-[11px] truncate max-w-[280px]">
                      {result.domain}
                    </span>

                    <a
                      href={result.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 font-bold"
                    >
                      <span>Read Original Dispatch</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT 4 COLS: PEOPLE ALSO ASK & RELATED SEARCHES */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* RELATED QUESTIONS (PEOPLE ALSO ASK) */}
            {data?.relatedQuestions && data.relatedQuestions.length > 0 && (
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 border-b border-slate-800 pb-3">
                  <HelpCircle className="w-4 h-4 text-amber-400" />
                  <span>People Also Ask (Google FAQ)</span>
                </div>

                <div className="space-y-3">
                  {data.relatedQuestions.map((q, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2"
                    >
                      <h4 className="text-xs font-bold text-white flex items-start gap-1.5 leading-snug">
                        <MessageSquareQuote className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span>{q.question}</span>
                      </h4>
                      {q.snippet && (
                        <p className="text-[11px] text-slate-300 leading-relaxed pl-5 border-l border-amber-500/20">
                          {q.snippet}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* RELATED SEARCH DISCOVERY PILLS */}
            {data?.relatedSearches && data.relatedSearches.length > 0 && (
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-400 border-b border-slate-800 pb-3">
                  <Compass className="w-4 h-4 text-sky-400" />
                  <span>Related Hidden Search Queries</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {data.relatedSearches.map((rel, idx) => (
                    <button
                      key={idx}
                      onClick={() => handlePresetSelect(rel.query)}
                      className="text-xs px-3 py-1.5 rounded-xl bg-slate-950/80 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700 transition cursor-pointer flex items-center gap-1.5"
                    >
                      <Search className="w-3 h-3 text-sky-400" />
                      <span>{rel.query}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* CURATOR NOTE ON UNDERRATED PLACES */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20 text-xs text-slate-300 space-y-2">
              <span className="font-bold text-amber-300 block flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Why Seek Underrated Bharat?
              </span>
              <p className="leading-relaxed text-[11px] text-slate-400">
                Mainstream tourist destinations often suffer from peak-season overcrowding, commercialization, and strain on local resources. Underrated places preserve authentic cultural traditions, support rural weaver communities, and give you peaceful, unhurried time with nature.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
