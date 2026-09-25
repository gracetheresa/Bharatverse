import React, { useState, useMemo } from 'react';
import { Destination, Hotspot3D, UserPreferences, SoulExperience, LiveMusicEvent } from '../types/travel';
import { ThreeDestinationScene } from './ThreeDestinationScene';
import { GooglePlaceExplorer } from './GooglePlaceExplorer';
import { ExperienceBharatLocally } from './ExperienceBharatLocally';
import { getExperiencesForDestination, calculateExperienceScore } from '../data/soulOfIndiaData';
import { getMusicEventsForDestination } from '../data/liveMusicData';
import { MusicEventDetailsModal } from './MusicEventDetailsModal';
import { soundManager } from '../utils/soundEffects';
import {
  X,
  MapPin,
  Calendar,
  Sparkles,
  Clock,
  Heart,
  Share2,
  CheckCircle2,
  Plus,
  Compass,
  Layers,
  HelpCircle,
  Car,
  Map,
  Image as ImageIcon,
  Building2,
  ChevronRight,
  ShoppingBag,
  Palette,
  UtensilsCrossed,
  Users,
  ArrowRight,
  Music,
  ExternalLink
} from 'lucide-react';

interface Props {
  destination: Destination;
  userPreferences?: UserPreferences;
  matchScore?: number;
  matchReason?: string;
  initialTab?: '3d' | 'soul-experiences' | 'local-bharat' | 'google-maps' | 'details' | 'activities';
  onClose: () => void;
  isSaved?: boolean;
  onToggleSave?: (destination: Destination) => void;
  onAddActivityToJourney?: (destination: Destination, activityId: string) => void;
  onSaveExperience?: (experience: SoulExperience) => void;
  savedExperienceIds?: string[];
  savedActivityIds?: string[];
  onOpenAIChat?: (prompt?: string) => void;
  onOpenGooglePlacesWebsite?: (query: string) => void;
  onSaveMusicEvent?: (event: LiveMusicEvent) => void;
  savedMusicEventIds?: string[];
}

export const DestinationModal: React.FC<Props> = ({
  destination,
  userPreferences,
  matchScore = 95,
  matchReason,
  initialTab = '3d',
  onClose,
  isSaved = false,
  onToggleSave,
  onAddActivityToJourney,
  onSaveExperience,
  savedExperienceIds = [],
  savedActivityIds = [],
  onOpenAIChat,
  onOpenGooglePlacesWebsite,
  onSaveMusicEvent,
  savedMusicEventIds = [],
}) => {
  const [activeTab, setActiveTab] = useState<'3d' | 'soul-experiences' | 'local-bharat' | 'google-maps' | 'details' | 'activities'>(initialTab);
  const [activeHotspotId, setActiveHotspotId] = useState<string | undefined>(undefined);
  const [copiedLink, setCopiedLink] = useState(false);
  const [inspectMusicEvent, setInspectMusicEvent] = useState<LiveMusicEvent | null>(null);

  const destinationExperiences = getExperiencesForDestination(destination.id, destination.state);
  const destinationMusicEvents = useMemo(() => {
    return getMusicEventsForDestination(destination);
  }, [destination]);

  const handleShare = () => {
    soundManager.playTap();
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleSelectHotspot = (hotspot: Hotspot3D) => {
    setActiveHotspotId(hotspot.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-7xl max-h-[94vh] bg-slate-900/95 border border-amber-500/25 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        
        {/* MODAL HEADER */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-slate-800 bg-slate-950/60 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
                  {destination.name}
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                    {destination.state}
                  </span>
                </h2>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-amber-400" />
                {destination.distanceFromNearestCityKm} km from {destination.nearestCity}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Switch to Google Images & Maps */}
            <button
              onClick={() => {
                soundManager.playTap();
                setActiveTab(activeTab === 'google-maps' ? '3d' : 'google-maps');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition border ${
                activeTab === 'google-maps'
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                  : 'bg-slate-800 hover:bg-slate-700 text-amber-300 border-amber-500/30'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Google Maps & Images</span>
              <span className="sm:hidden">Google</span>
            </button>

            {/* Save to Journey Button */}
            {onToggleSave && (
              <button
                onClick={() => {
                  soundManager.playTap();
                  onToggleSave(destination);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md ${
                  isSaved
                    ? 'bg-rose-500 text-white shadow-rose-500/25 hover:bg-rose-600'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                <span>{isSaved ? 'Saved' : 'Save'}</span>
              </button>
            )}

            {/* Share Link */}
            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition border border-slate-700/80 text-xs cursor-pointer"
              title="Copy share link"
            >
              {copiedLink ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>

            {/* Google Places Full Experience */}
            {onOpenGooglePlacesWebsite && (
              <button
                onClick={() => {
                  soundManager.playTap();
                  onClose();
                  onOpenGooglePlacesWebsite(destination.name);
                }}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-950/80 hover:bg-sky-900 border border-sky-500/40 text-sky-300 text-xs font-bold transition cursor-pointer"
                title="Full Google Places & Search Photos Explorer"
              >
                <Map className="w-3.5 h-3.5 text-sky-400" />
                <span>Google Explorer</span>
              </button>
            )}

            {/* Close Button */}
            <button
              onClick={() => {
                soundManager.playTap();
                onClose();
              }}
              className="p-2 rounded-xl bg-slate-800 hover:bg-rose-500/20 hover:text-rose-400 text-slate-400 transition border border-slate-700/80"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* PRIMARY MODE SELECTOR BAR (DESKTOP & MOBILE) */}
        <div className="flex items-center border-b border-slate-800 bg-slate-950/70 text-xs font-semibold px-4 overflow-x-auto scrollbar-none">
          <button
            onClick={() => { soundManager.playTap(); setActiveTab('3d'); }}
            className={`py-3 px-4 flex items-center gap-1.5 border-b-2 whitespace-nowrap transition ${
              activeTab === '3d'
                ? 'border-amber-400 text-amber-300 bg-amber-400/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>3D Spatial Scene</span>
          </button>

          {/* WHILE YOU'RE HERE (SOUL OF INDIA) TAB */}
          <button
            onClick={() => { soundManager.playTap(); setActiveTab('soul-experiences'); }}
            className={`py-3 px-4 flex items-center gap-1.5 border-b-2 whitespace-nowrap transition cursor-pointer ${
              activeTab === 'soul-experiences'
                ? 'border-amber-400 text-amber-300 bg-amber-400/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>While You're Here (Soul of India)</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/30 font-bold">
              Workshops • Flavours • Makers
            </span>
          </button>

          {/* EXPERIENCE BHARAT LOCALLY TAB */}
          <button
            onClick={() => { soundManager.playTap(); setActiveTab('local-bharat'); }}
            className={`py-3 px-4 flex items-center gap-1.5 border-b-2 whitespace-nowrap transition cursor-pointer ${
              activeTab === 'local-bharat'
                ? 'border-amber-400 text-amber-300 bg-amber-400/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
            <span>Experience Bharat Locally</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/30 font-bold">
              Stay • Eat • Meet • Shop
            </span>
          </button>

          <button
            onClick={() => { soundManager.playTap(); setActiveTab('google-maps'); }}
            className={`py-3 px-4 flex items-center gap-1.5 border-b-2 whitespace-nowrap transition cursor-pointer ${
              activeTab === 'google-maps'
                ? 'border-amber-400 text-amber-300 bg-amber-400/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Map className="w-3.5 h-3.5 text-sky-400" />
            <span>Google Maps, Places & Imagery</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
              Live API
            </span>
          </button>

          <button
            onClick={() => { soundManager.playTap(); setActiveTab('details'); }}
            className={`lg:hidden py-3 px-4 flex items-center gap-1.5 border-b-2 whitespace-nowrap transition ${
              activeTab === 'details'
                ? 'border-amber-400 text-amber-300 bg-amber-400/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Overview & Budget</span>
          </button>

          <button
            onClick={() => { soundManager.playTap(); setActiveTab('activities'); }}
            className={`lg:hidden py-3 px-4 flex items-center gap-1.5 border-b-2 whitespace-nowrap transition ${
              activeTab === 'activities'
                ? 'border-amber-400 text-amber-300 bg-amber-400/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Activities ({destination.activities.length})</span>
          </button>
        </div>

        {/* MODAL MAIN CONTENT BODY */}
        <div className="flex-1 overflow-y-auto">
          
          {/* TAB: EXPERIENCE BHARAT LOCALLY */}
          {activeTab === 'local-bharat' && (
            <div className="p-4 sm:p-6 bg-slate-950/60 min-h-full">
              <ExperienceBharatLocally destination={destination} embedded={true} />
            </div>
          )}
          
          {/* TAB 1: 3D SPATIAL SCENE SPLIT WITH INFO DRAWER */}
          {activeTab === '3d' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-full">
              {/* LEFT: 3D INTERACTIVE CANVAS (7 COLS ON DESKTOP) */}
              <div className="lg:col-span-7 flex flex-col p-3 sm:p-5 bg-slate-950/50">
                <div className="w-full flex-1 min-h-[380px] sm:min-h-[460px] lg:min-h-[540px]">
                  <ThreeDestinationScene
                    destination={destination}
                    activeHotspotId={activeHotspotId}
                    onSelectHotspot={handleSelectHotspot}
                  />
                </div>
                
                {/* Quick 3D Landmark Navigator Pills */}
                <div className="mt-3 flex items-center justify-between text-xs text-slate-400 px-1">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    Select any glowing landmark beacon on the 3D terrain to fly the camera
                  </span>
                  <button
                    onClick={() => setActiveTab('google-maps')}
                    className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 font-medium underline underline-offset-4"
                  >
                    <Map className="w-3.5 h-3.5" />
                    View Google Satellite & Photos ↗
                  </button>
                </div>
              </div>

              {/* RIGHT: GLASSMORPHISM INFORMATION DRAWER (5 COLS ON DESKTOP) */}
              <div className="lg:col-span-5 flex flex-col p-5 sm:p-6 space-y-5 border-l border-slate-800 bg-slate-900/60 backdrop-blur-xl">
                
                {/* MATCH SCORE CALLOUT */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/15 via-slate-800/60 to-slate-900 border border-amber-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      Match Rationale
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-black text-xs shadow-md">
                      {matchScore}% Match
                    </span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed font-medium">
                    {matchReason || `${destination.name} is a stellar match for your preferred travel style with authentic ${destination.categories.join(', ')}.`}
                  </p>
                </div>

                {/* KEY TRAVEL METRICS GRID */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                    <div className="text-[11px] text-slate-400 flex items-center gap-1">
                      <span>₹ Estimated Budget</span>
                    </div>
                    <div className="text-base font-bold text-white mt-0.5">
                      ₹{destination.typicalBudgetPerPerson.toLocaleString('en-IN')}
                    </div>
                    <div className="text-[10px] text-amber-400/90 mt-0.5">{destination.budgetTier} tier per person</div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                    <div className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span>Duration</span>
                    </div>
                    <div className="text-base font-bold text-white mt-0.5">
                      {destination.idealDurationDays} Days / {destination.idealDurationDays - 1} Nights
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Ideal itinerary span</div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                    <div className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-amber-400" />
                      <span>Best Season</span>
                    </div>
                    <div className="text-xs font-semibold text-slate-200 mt-1 line-clamp-1">
                      {destination.bestSeason}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                    <div className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Car className="w-3 h-3 text-amber-400" />
                      <span>Accessibility</span>
                    </div>
                    <div className="text-xs font-semibold text-slate-200 mt-1">
                      {destination.accessibilityFriendly ? '✓ Senior & Wheelchair friendly' : 'Moderate trekking terrain'}
                    </div>
                  </div>
                </div>

                {/* OVERVIEW & HIGHLIGHTS */}
                <div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">About the Destination</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{destination.overview}</p>
                  
                  <div className="pt-2">
                    <h4 className="text-[11px] font-semibold text-amber-300 mb-1.5">Key Highlights:</h4>
                    <ul className="space-y-1">
                      {destination.highlights.map((h, i) => (
                        <li key={i} className="text-xs text-slate-300 flex items-start gap-1.5">
                          <span className="text-amber-400 text-xs font-bold mt-0.5">✦</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* INTERACTIVE THINGS TO DO (ACTIVITIES) */}
                <div className="space-y-3 pt-2 border-t border-slate-800">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      Interactive Activities ({destination.activities.length})
                    </h3>
                    <span className="text-[11px] text-slate-400">Add to journey</span>
                  </div>

                  <div className="space-y-2.5">
                    {destination.activities.map((act) => {
                      const isActSaved = savedActivityIds.includes(act.id);
                      return (
                        <div
                          key={act.id}
                          className="p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800/80 border border-slate-700/60 transition group"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-white group-hover:text-amber-300 transition">
                                  {act.title}
                                </span>
                                <span className="text-[10px] px-1.5 py-0.2 bg-slate-700/80 text-amber-300 rounded font-medium">
                                  {act.timeOfDay}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                                {act.description}
                              </p>
                            </div>

                            {onAddActivityToJourney && (
                              <button
                                onClick={() => {
                                  soundManager.playTap();
                                  onAddActivityToJourney(destination, act.id);
                                }}
                                className={`p-1.5 rounded-lg text-xs transition shrink-0 ${
                                  isActSaved
                                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                    : 'bg-slate-700/70 hover:bg-amber-500 hover:text-slate-950 text-slate-300'
                                }`}
                                title={isActSaved ? 'Added to your itinerary' : 'Add to itinerary'}
                              >
                                {isActSaved ? <CheckCircle2 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                              </button>
                            )}
                          </div>

                          <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 pt-2 border-t border-slate-700/40">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-slate-400" />
                              {act.duration}
                            </span>
                            <span className="font-semibold text-slate-200">
                              {act.cost === 0 ? 'Free' : `₹${act.cost.toLocaleString('en-IN')}`}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 🎵 WHILE YOU'RE HERE: LIVE MUSIC & CONCERTS */}
                <div className="space-y-3 pt-3 border-t border-slate-800">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                      <Music className="w-3.5 h-3.5 text-amber-400" />
                      <span>🎵 While You're Here... (Live Music)</span>
                    </h3>
                    <span className="text-[10px] text-slate-400">
                      {destinationMusicEvents.length} {destinationMusicEvents.length === 1 ? 'Event' : 'Events'}
                    </span>
                  </div>

                  {destinationMusicEvents.length > 0 ? (
                    <div className="space-y-2.5">
                      {destinationMusicEvents.slice(0, 3).map((evt) => {
                        const isMusicSaved = savedMusicEventIds.includes(evt.id);
                        const isVerified = evt.status === 'LIVE / VERIFIED';
                        const isCurated = evt.status === 'CURATED';

                        return (
                          <div
                            key={evt.id}
                            className="p-3 rounded-2xl bg-slate-800/60 hover:bg-slate-800/90 border border-slate-700/60 hover:border-amber-500/40 transition space-y-2 group"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div
                                onClick={() => {
                                  soundManager.playTap();
                                  setInspectMusicEvent(evt);
                                }}
                                className="cursor-pointer flex-1"
                              >
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <span className="text-[10px] font-semibold text-amber-300 bg-slate-900 px-2 py-0.5 rounded-md">
                                    🎶 {evt.genre}
                                  </span>
                                  <span
                                    className={`text-[9px] px-2 py-0.5 rounded-md font-bold border ${
                                      isVerified
                                        ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                                        : isCurated
                                        ? 'bg-amber-950/80 text-amber-300 border-amber-500/40'
                                        : 'bg-indigo-950/80 text-indigo-300 border-indigo-500/40'
                                    }`}
                                  >
                                    {evt.status}
                                  </span>
                                </div>

                                <h4 className="text-xs font-bold text-white group-hover:text-amber-300 transition mt-1 line-clamp-1">
                                  {evt.artistOrEventName}
                                </h4>
                                <p className="text-[11px] text-slate-400 line-clamp-1">
                                  👤 {evt.artist}
                                </p>
                              </div>

                              {onSaveMusicEvent && (
                                <button
                                  onClick={() => {
                                    soundManager.playTap();
                                    onSaveMusicEvent(evt);
                                  }}
                                  className={`p-1.5 rounded-lg text-xs transition shrink-0 cursor-pointer ${
                                    isMusicSaved
                                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                                      : 'bg-slate-700/70 hover:bg-amber-500 hover:text-slate-950 text-slate-300'
                                  }`}
                                  title={isMusicSaved ? 'Saved in My Journey' : 'Add to My Journey'}
                                >
                                  <Heart className={`w-4 h-4 ${isMusicSaved ? 'fill-current text-rose-400' : ''}`} />
                                </button>
                              )}
                            </div>

                            <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1.5 border-t border-slate-700/40">
                              <span className="flex items-center gap-1 truncate max-w-[160px]">
                                <MapPin className="w-3 h-3 text-rose-400 shrink-0" />
                                <span className="truncate">{evt.venue}</span>
                              </span>
                              <span className="font-semibold text-amber-300">
                                {evt.price}
                              </span>
                            </div>

                            <div className="grid grid-cols-2 gap-1.5 pt-1 text-[11px]">
                              <button
                                onClick={() => {
                                  soundManager.playTap();
                                  setInspectMusicEvent(evt);
                                }}
                                className="py-1.5 px-2 rounded-lg bg-slate-900 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold flex items-center justify-center gap-1 transition cursor-pointer"
                              >
                                <span>Inspect Event</span>
                              </button>

                              {evt.bookingOrInfoUrl ? (
                                <a
                                  href={evt.bookingOrInfoUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="py-1.5 px-2 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-[11px] font-bold flex items-center justify-center gap-1 transition"
                                >
                                  <ExternalLink className="w-3 h-3" />
                                  <span>View Source</span>
                                </a>
                              ) : (
                                <button
                                  onClick={() => {
                                    soundManager.playTap();
                                    if (onSaveMusicEvent) onSaveMusicEvent(evt);
                                  }}
                                  className="py-1.5 px-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-[11px] font-bold flex items-center justify-center gap-1 transition cursor-pointer"
                                >
                                  <span>{isMusicSaved ? 'In Journey' : 'Add to Journey'}</span>
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400">
                      No live concerts currently scheduled specifically for this destination. Explore our verified sabhas and festivals in the Soul of India section.
                    </div>
                  )}
                </div>

                {/* TRAVEL TIPS */}
                {destination.travelTips.length > 0 && (
                  <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 space-y-1.5">
                    <span className="font-semibold text-amber-400 text-[11px] uppercase tracking-wider block">
                      Pro Local Tips
                    </span>
                    {destination.travelTips.map((tip, idx) => (
                      <p key={idx} className="text-[11px] text-slate-400 leading-relaxed">
                        • {tip}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB: WHILE YOU'RE HERE (SOUL OF INDIA EXPERIENCES) */}
          {activeTab === 'soul-experiences' && (
            <div className="p-4 sm:p-6 max-w-6xl mx-auto space-y-6 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-widest">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>EXPERIENCE THE SOUL OF INDIA</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                    While You're Here in {destination.name}...
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400">
                    "What can I experience here that I can't experience anywhere else?"
                  </p>
                </div>

                <span className="text-xs text-amber-300 font-semibold px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 self-start sm:self-auto">
                  {destinationExperiences.length} Experiential Discoveries
                </span>
              </div>

              {/* EXPERIENCES GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {destinationExperiences.map((exp) => {
                  const isSaved = savedExperienceIds.includes(exp.id);
                  const score = calculateExperienceScore(exp, userPreferences);

                  return (
                    <div
                      key={exp.id}
                      className="rounded-3xl bg-slate-900/90 border border-amber-500/25 p-5 shadow-xl flex flex-col justify-between hover:border-amber-400/50 transition duration-300"
                    >
                      <div className="space-y-3.5">
                        <div className="relative h-44 w-full rounded-2xl overflow-hidden bg-slate-950">
                          <img
                            src={exp.image}
                            alt={exp.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                          <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-slate-950/85 text-[10px] font-bold text-amber-300 border border-amber-500/30">
                            {exp.category}
                          </span>
                          <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black">
                            {score.totalScore}% MATCH
                          </span>
                          <div className="absolute bottom-2.5 left-2.5 right-2.5">
                            <h4 className="text-base font-black text-white leading-tight">
                              {exp.title}
                            </h4>
                          </div>
                        </div>

                        <p className="text-xs text-slate-300 font-medium italic">
                          "{exp.tagline}"
                        </p>

                        <div className="grid grid-cols-2 gap-2 text-[11px]">
                          <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">
                            <span className="text-slate-400 block text-[10px]">Duration</span>
                            <span className="font-bold text-white mt-0.5 block">{exp.duration}</span>
                          </div>
                          <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">
                            <span className="text-slate-400 block text-[10px]">Skill / Level</span>
                            <span className="font-bold text-amber-300 mt-0.5 block truncate">{exp.difficulty}</span>
                          </div>
                        </div>

                        {/* Experience Highlights */}
                        <div className="space-y-1 text-[11px] text-slate-400">
                          {exp.whatYouExperience.slice(0, 3).map((item, i) => (
                            <div key={i} className="flex items-start gap-1.5">
                              <span className="text-amber-400 font-bold">✦</span>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>

                        {/* Maker / Host Info */}
                        {exp.makerInfo && (
                          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] space-y-1">
                            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                              Artisan Host
                            </span>
                            <div className="font-bold text-slate-200">
                              {exp.makerInfo.name} ({exp.makerInfo.craft})
                            </div>
                            <p className="text-slate-400 italic line-clamp-1">
                              "{exp.makerInfo.story}"
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Card Bottom Actions */}
                      <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-2 mt-4">
                        <span className="text-xs font-bold text-emerald-400">
                          ₹{exp.priceInr} • {exp.priceLevel.split(' ')[0]}
                        </span>

                        <div className="flex items-center gap-2">
                          {onSaveExperience && (
                            <button
                              onClick={() => {
                                soundManager.playTap();
                                onSaveExperience(exp);
                              }}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                                isSaved
                                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                              }`}
                            >
                              <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-current text-rose-400' : ''}`} />
                              <span>{isSaved ? 'Saved' : 'Add to Journey'}</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 🎵 WHILE YOU'RE HERE: LIVE MUSIC & CONCERTS */}
              {destinationMusicEvents.length > 0 && (
                <div className="space-y-4 pt-6 border-t border-slate-800">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="text-lg font-black text-white flex items-center gap-2">
                        <Music className="w-5 h-5 text-amber-400" />
                        <span>🎵 While You're Here in {destination.name}... Live Music & Acoustic Traditions</span>
                      </h4>
                      <p className="text-xs text-slate-400">
                        Authentic classical concerts, folk gatherings, and living musical traditions scheduled for {destination.name} and surrounding region.
                      </p>
                    </div>
                    <span className="text-xs text-amber-300 font-semibold px-2.5 py-1 rounded-full bg-slate-950 border border-amber-500/30 self-start sm:self-auto">
                      {destinationMusicEvents.length} Music Discoveries
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {destinationMusicEvents.map((evt) => {
                      const isMusicSaved = savedMusicEventIds.includes(evt.id);
                      const isVerified = evt.status === 'LIVE / VERIFIED';
                      const isCurated = evt.status === 'CURATED';

                      return (
                        <div
                          key={evt.id}
                          className="rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 overflow-hidden shadow-xl flex flex-col justify-between transition group"
                        >
                          <div>
                            <div className="relative h-44 w-full overflow-hidden bg-slate-950">
                              <img
                                src={evt.image}
                                alt={evt.artistOrEventName}
                                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                              <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 flex-wrap">
                                <span className="px-2.5 py-0.5 rounded-full bg-slate-950/90 text-[10px] font-bold text-amber-300 border border-amber-500/40">
                                  🎶 {evt.genre}
                                </span>
                              </div>

                              <div className="absolute top-2.5 right-2.5 flex items-center gap-1">
                                <span
                                  className={`text-[9px] px-2.5 py-0.5 rounded-full font-bold border flex items-center gap-1 shadow-sm ${
                                    isVerified
                                      ? 'bg-emerald-950 text-emerald-300 border-emerald-500/50'
                                      : isCurated
                                      ? 'bg-amber-950 text-amber-300 border-amber-500/50'
                                      : 'bg-indigo-950 text-indigo-300 border-indigo-500/50'
                                  }`}
                                >
                                  <span
                                    className={`w-1.5 h-1.5 rounded-full ${
                                      isVerified
                                        ? 'bg-emerald-400 animate-pulse'
                                        : isCurated
                                        ? 'bg-amber-400'
                                        : 'bg-indigo-400'
                                    }`}
                                  />
                                  <span>{evt.status}</span>
                                </span>
                              </div>

                              <div className="absolute bottom-2.5 left-2.5 right-2.5">
                                <h5 className="text-base font-black text-white leading-tight line-clamp-1 group-hover:text-amber-300 transition">
                                  {evt.artistOrEventName}
                                </h5>
                                <p className="text-[11px] text-amber-200/90 line-clamp-1">
                                  👤 {evt.artist}
                                </p>
                              </div>
                            </div>

                            <div className="p-4 space-y-2.5 text-xs">
                              <div className="flex items-center justify-between text-slate-300">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                                  <span>{evt.date}</span>
                                </span>
                                <span className="font-bold text-amber-300">{evt.price}</span>
                              </div>

                              <p className="text-slate-400 flex items-center gap-1 line-clamp-1">
                                <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                                <span>{evt.venue} ({evt.city})</span>
                              </p>

                              <p className="text-slate-300 line-clamp-2 leading-relaxed text-[11px]">
                                {evt.description}
                              </p>

                              <div className="text-[10px] text-slate-400 bg-slate-950/50 p-2 rounded-xl border border-slate-800/80">
                                <strong className="text-slate-300">Status Context:</strong> {evt.statusExplanation}
                              </div>
                            </div>
                          </div>

                          <div className="p-4 pt-0 flex flex-wrap items-center gap-2">
                            {onSaveMusicEvent && (
                              <button
                                onClick={() => {
                                  soundManager.playTap();
                                  onSaveMusicEvent(evt);
                                }}
                                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                                  isMusicSaved
                                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                    : 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                                }`}
                              >
                                <Heart className={`w-3.5 h-3.5 ${isMusicSaved ? 'fill-current text-rose-400' : ''}`} />
                                <span>{isMusicSaved ? 'Saved in Journey' : 'Add to My Journey'}</span>
                              </button>
                            )}

                            {evt.bookingOrInfoUrl && (
                              <a
                                href={evt.bookingOrInfoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center gap-1 transition"
                              >
                                <ExternalLink className="w-3 h-3" />
                                <span>View Source</span>
                              </a>
                            )}

                            <button
                              onClick={() => {
                                soundManager.playTap();
                                setInspectMusicEvent(evt);
                              }}
                              className="py-2 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-medium transition cursor-pointer"
                            >
                              <span>Details</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: GOOGLE MAPS, PLACES & REAL IMAGERY */}
          {activeTab === 'google-maps' && (
            <div className="p-4 sm:p-6 max-w-6xl mx-auto">
              <GooglePlaceExplorer
                destination={destination}
                onSelectHotspot={handleSelectHotspot}
              />
            </div>
          )}

          {/* TAB 3 (MOBILE ONLY): OVERVIEW & BUDGET */}
          {activeTab === 'details' && (
            <div className="p-5 space-y-5">
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30">
                <span className="text-xs font-bold text-amber-400 block mb-1">Match Score: {matchScore}%</span>
                <p className="text-xs text-slate-200">{matchReason || destination.overview}</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Overview</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{destination.overview}</p>
              </div>
            </div>
          )}

          {/* TAB 4 (MOBILE ONLY): THINGS TO DO */}
          {activeTab === 'activities' && (
            <div className="p-5 space-y-3">
              {destination.activities.map((act) => (
                <div key={act.id} className="p-3.5 rounded-2xl bg-slate-850 border border-slate-700">
                  <h4 className="text-sm font-bold text-white">{act.title}</h4>
                  <p className="text-xs text-slate-400 mt-1">{act.description}</p>
                  <div className="mt-2 text-xs text-amber-400 font-semibold">
                    {act.cost === 0 ? 'Free' : `₹${act.cost}`} • {act.duration}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* MODAL FOOTER */}
        <div className="px-5 sm:px-7 py-3 border-t border-slate-800 bg-slate-950/70 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3 text-slate-400">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Nearest Hub: {destination.nearestCity} ({destination.distanceFromNearestCityKm} km)
            </span>
            <span className="hidden md:inline text-slate-600">•</span>
            <span className="hidden md:inline text-[11px] text-slate-500">
              Integrated with Google Maps & Places API (New)
            </span>
          </div>

          <div className="flex items-center gap-2">
            {onOpenAIChat && (
              <button
                onClick={() => onOpenAIChat(`Can you suggest a customized 2-day itinerary for ${destination.name}?`)}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 font-semibold flex items-center gap-1.5 transition border border-amber-500/20 shadow-md text-xs cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Ask Bharatverse AI
              </button>
            )}

            {onToggleSave && (
              <button
                onClick={() => {
                  soundManager.playTap();
                  onToggleSave(destination);
                }}
                className={`px-4 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 text-xs shadow-lg cursor-pointer ${
                  isSaved
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                {isSaved ? 'Saved in My Journey' : 'Add to My Journey'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 🎵 MUSIC EVENT DETAILS MODAL */}
      <MusicEventDetailsModal
        event={inspectMusicEvent}
        onClose={() => setInspectMusicEvent(null)}
        onToggleSave={onSaveMusicEvent}
        isSaved={inspectMusicEvent ? savedMusicEventIds.includes(inspectMusicEvent.id) : false}
      />
    </div>
  );
};

