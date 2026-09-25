import React, { useState, useMemo, useEffect } from 'react';
import {
  SoulExperience,
  StateDNA,
  StateWorkshopItem,
  StateArtisanCommunity,
  CulturalEvent,
  UserPreferences,
  Destination,
  MakeSomethingType,
  LiveMusicEvent
} from '../types/travel';
import { LiveMusicSection } from './LiveMusicSection';
import {
  SOUL_EXPERIENCES,
  STATE_DNA_DATA,
  CULTURAL_CALENDAR_EVENTS,
  calculateExperienceScore,
  getRandomSurpriseExperience
} from '../data/soulOfIndiaData';
import { getRandomSurpriseMusicEvent } from '../data/liveMusicData';
import { soundManager } from '../utils/soundEffects';
import {
  Sparkles,
  Compass,
  ArrowRight,
  Heart,
  ExternalLink,
  MapPin,
  Clock,
  Calendar,
  Layers,
  ShoppingBag,
  Flame,
  Search,
  BookOpen,
  Info,
  Users,
  ChevronRight,
  ShieldCheck,
  RefreshCw,
  X,
  Palette,
  Camera,
  UtensilsCrossed,
  Music,
  Smile,
  Landmark,
  Bot,
  Theater,
  HelpCircle,
  Tag,
  Star,
  Map,
  BadgeCheck,
  CheckCircle2,
  Navigation,
  AlertCircle,
  Eye,
  Tent,
  Wrench
} from 'lucide-react';

interface Props {
  userPreferences?: UserPreferences;
  onExploreDestination?: (dest: Destination, initialTab?: '3d' | 'local-bharat' | 'google-maps') => void;
  onSaveExperience?: (experience: SoulExperience) => void;
  savedExperienceIds?: string[];
  onOpenAIChat?: (prompt?: string) => void;
  onSaveMusicEvent?: (event: LiveMusicEvent) => void;
  savedMusicEventIds?: string[];
}

interface LiveGooglePlaceItem {
  id: string;
  name: string;
  address: string;
  location?: { latitude: number; longitude: number } | null;
  rating?: number | null;
  reviewsCount?: number | null;
  googleMapsUri: string;
  editorialSummary?: string | null;
  types?: string[];
}

export const ExperienceSoulOfIndiaView: React.FC<Props> = ({
  userPreferences,
  onExploreDestination,
  onSaveExperience,
  savedExperienceIds = [],
  onOpenAIChat,
  onSaveMusicEvent,
  savedMusicEventIds = [],
}) => {
  // Navigation & Category states
  const [activeTab, setActiveTab] = useState<
    'all' | 'live-music' | 'workshops' | 'makers' | 'taste' | 'culture-events' | 'state-dna' | 'surprise-me'
  >('all');

  // 1. Workshops sub-filter
  const [selectedWorkshopType, setSelectedWorkshopType] = useState<
    'all' | 'pottery' | 'weaving' | 'painting' | 'block_printing' | 'cooking' | 'crafts' | 'dance_music'
  >('all');

  // 2. Meet the Makers sub-filter
  const [selectedMakerFilter, setSelectedMakerFilter] = useState<
    'all' | 'weavers' | 'potters' | 'sculptors' | 'artisans' | 'communities' | 'businesses'
  >('all');

  // 3. Taste the Region sub-filter
  const [selectedTasteFilter, setSelectedTasteFilter] = useState<
    'all' | 'cooking' | 'dishes' | 'hearths' | 'live-places'
  >('all');

  // Live Google Places Food Stalls & Bhojanalayas State
  const [liveFoodDestination, setLiveFoodDestination] = useState<string>('Ananthagiri & Vikarabad');
  const [liveFoodPlaces, setLiveFoodPlaces] = useState<LiveGooglePlaceItem[]>([]);
  const [isLoadingLiveFood, setIsLoadingLiveFood] = useState<boolean>(false);

  // 4. Culture & Events sub-filters
  const [selectedEventCategory, setSelectedEventCategory] = useState<string>('all');
  const [selectedEventStatus, setSelectedEventStatus] = useState<string>('all');
  const [selectedEventState, setSelectedEventState] = useState<string>('all');
  const [inspectEvent, setInspectEvent] = useState<CulturalEvent | null>(null);

  // 5. State DNA state selector & sub-sections
  const [selectedStateKey, setSelectedStateKey] = useState<string>('Telangana');
  const [selectedStateSection, setSelectedStateSection] = useState<
    'all' | 'crafts' | 'food' | 'festivals' | 'arts' | 'workshops' | 'experiences' | 'communities'
  >('all');

  // 6. Surprise Me state
  const [surpriseCategory, setSurpriseCategory] = useState<'all' | 'music' | 'crafts' | 'food'>('all');
  const [surpriseResult, setSurpriseResult] = useState<{ experience: SoulExperience; reason: string } | null>(() => {
    return getRandomSurpriseExperience(userPreferences);
  });
  const [surpriseMusicResult, setSurpriseMusicResult] = useState<{ event: LiveMusicEvent; reason: string } | null>(() => {
    return getRandomSurpriseMusicEvent(userPreferences);
  });
  const [isSurprising, setIsSurprising] = useState(false);

  // Modal inspection state
  const [inspectExperience, setInspectExperience] = useState<SoulExperience | null>(null);

  // Active State DNA
  const activeStateDNA = STATE_DNA_DATA[selectedStateKey] || STATE_DNA_DATA['Telangana'];

  // Fetch Live Google Places for Food when requested
  const fetchLiveFoodPlaces = async (targetDest: string) => {
    setIsLoadingLiveFood(true);
    try {
      const response = await fetch(`/api/google-places-search?query=${encodeURIComponent(targetDest + ' local food stalls dhaba bhojanalaya')}`);
      if (response.ok) {
        const data = await response.json();
        setLiveFoodPlaces(data.places || []);
      }
    } catch (err) {
      console.warn('Failed to fetch live food places:', err);
    } finally {
      setIsLoadingLiveFood(false);
    }
  };

  useEffect(() => {
    // Initial fetch of live verified food stalls for default destination
    fetchLiveFoodPlaces('Ananthagiri Vikarabad');
  }, []);

  // Filtered Workshops
  const workshopExperiences = useMemo(() => {
    return SOUL_EXPERIENCES.filter((e) => {
      const isWorkshop = e.category === 'Workshops & Crafts' || Boolean(e.makeSomethingType);
      if (!isWorkshop) return false;

      if (selectedWorkshopType === 'all') return true;
      if (selectedWorkshopType === 'pottery') return e.makeSomethingType === 'pottery';
      if (selectedWorkshopType === 'weaving') return e.makeSomethingType === 'weaving';
      if (selectedWorkshopType === 'painting') return e.makeSomethingType === 'painting';
      if (selectedWorkshopType === 'block_printing') return e.makeSomethingType === 'block_printing';
      if (selectedWorkshopType === 'cooking') return e.makeSomethingType === 'cooking';
      if (selectedWorkshopType === 'crafts') return e.makeSomethingType === 'crafts';
      if (selectedWorkshopType === 'dance_music') return e.makeSomethingType === 'dance_music' || e.category === 'Performing Arts & Folk';
      return true;
    });
  }, [selectedWorkshopType]);

  // Filtered Meet the Makers
  const makerExperiences = useMemo(() => {
    return SOUL_EXPERIENCES.filter((e) => {
      if (!e.makerInfo) return false;
      if (selectedMakerFilter === 'all') return true;
      const category = e.makerInfo.makerCategory || '';
      const text = (e.makerInfo.craft + ' ' + e.makerInfo.roleOrCooperative + ' ' + e.makerInfo.name).toLowerCase();
      
      if (selectedMakerFilter === 'weavers') return category === 'weaver' || text.includes('weav') || text.includes('loom') || text.includes('silk');
      if (selectedMakerFilter === 'potters') return category === 'potter' || text.includes('potter') || text.includes('clay');
      if (selectedMakerFilter === 'sculptors') return category === 'sculptor' || text.includes('sculpt') || text.includes('stone') || text.includes('granite') || text.includes('chisel');
      if (selectedMakerFilter === 'artisans') return category === 'artisan' || text.includes('artisan') || text.includes('paint') || text.includes('print');
      if (selectedMakerFilter === 'communities') return category === 'community' || text.includes('cooperative') || text.includes('guild') || text.includes('collective') || text.includes('samiti');
      if (selectedMakerFilter === 'businesses') return category === 'small_business' || text.includes('kitchen') || text.includes('haveli') || text.includes('khanavali');
      return true;
    });
  }, [selectedMakerFilter]);

  // Filtered Taste the Region
  const tasteExperiences = useMemo(() => {
    return SOUL_EXPERIENCES.filter((e) => {
      const isFood = e.category === 'Local Food & Flavours' || Boolean(e.foodInsights) || e.makeSomethingType === 'cooking';
      if (!isFood) return false;
      if (selectedTasteFilter === 'all') return true;
      if (selectedTasteFilter === 'cooking') return e.makeSomethingType === 'cooking';
      if (selectedTasteFilter === 'dishes') return Boolean(e.foodInsights);
      if (selectedTasteFilter === 'hearths') return e.foodInsights?.cookingMethod || e.shortStory.toLowerCase().includes('hearth') || e.shortStory.toLowerCase().includes('wood-fired');
      return true;
    });
  }, [selectedTasteFilter]);

  // Filtered Culture & Events
  const filteredEvents = useMemo(() => {
    return CULTURAL_CALENDAR_EVENTS.filter((evt) => {
      // 1. Category Matching
      if (selectedEventCategory !== 'all') {
        const cat = evt.category.toLowerCase();
        const sel = selectedEventCategory.toLowerCase();
        if (sel === 'festival' && !cat.includes('festival')) return false;
        if (sel === 'cultural performance' && !cat.includes('performance') && !cat.includes('music')) return false;
        if (sel === 'fairs' && !cat.includes('fair')) return false;
        if (sel === 'folk arts' && !cat.includes('folk')) return false;
        if (sel === 'seasonal events' && !cat.includes('seasonal')) return false;
        if (sel === 'traditional celebrations' && !cat.includes('celebration') && !cat.includes('festival')) return false;
      }

      // 2. Status Filtering
      if (selectedEventStatus !== 'all' && evt.status !== selectedEventStatus) {
        return false;
      }

      // 3. State Filtering
      if (selectedEventState !== 'all' && evt.state.toLowerCase() !== selectedEventState.toLowerCase()) {
        return false;
      }

      return true;
    });
  }, [selectedEventCategory, selectedEventStatus, selectedEventState]);

  // Handle Surprise Me action
  const handleSurpriseMe = (overrideCategory?: 'all' | 'music' | 'crafts' | 'food') => {
    const targetCat = overrideCategory || surpriseCategory;
    if (overrideCategory) {
      setSurpriseCategory(overrideCategory);
    }
    soundManager.playChime();
    setIsSurprising(true);
    setTimeout(() => {
      if (targetCat === 'music') {
        const musicSurprise = getRandomSurpriseMusicEvent(userPreferences, surpriseMusicResult?.event.id);
        setSurpriseMusicResult(musicSurprise);
      } else {
        const surprise = getRandomSurpriseExperience(userPreferences, surpriseResult?.experience.id);
        setSurpriseResult(surprise);
      }
      setIsSurprising(false);
    }, 300);
  };

  // Inspect Experience Modal
  const handleInspectExperience = (exp: SoulExperience) => {
    soundManager.playTap();
    setInspectExperience(exp);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 animate-in fade-in duration-300">
      
      {/* ========================================================
          1. HERO BANNER: EXPERIENCE THE SOUL OF INDIA
      ======================================================== */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-amber-500/35 p-6 sm:p-12 shadow-2xl mb-10">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(245,158,11,0.06)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-bold mb-4 shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>EXPERIENCE THE SOUL OF INDIA</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-950 text-amber-300 border border-amber-500/30 font-semibold">
              Curated Local Culture
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12]">
            Don’t just visit India.{' '}
            <span className="block mt-1 sm:mt-2 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400">
              Experience it.
            </span>
          </h1>

          <p className="mt-4 text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed font-normal max-w-3xl">
            Discover and participate in authentic Indian culture beyond typical tourist attractions. 
            Try handloom weaving on wooden pit-looms, throw red river clay, bake millets over wood-fired family hearths, 
            chisel Dravidian granite reliefs, and meet the hereditary makers who keep India’s living heritage vibrant.
          </p>

          {/* Quick Action Chips */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                soundManager.playTap();
                setActiveTab('live-music');
              }}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-purple-500 hover:from-amber-400 hover:to-purple-400 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-lg shadow-purple-500/25 transition"
            >
              <Music className="w-4 h-4 text-slate-950" />
              <span>🎵 Live Music & Concerts</span>
            </button>

            <button
              onClick={() => {
                soundManager.playTap();
                setActiveTab('workshops');
              }}
              className="px-5 py-3 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-amber-300 border border-amber-500/35 font-bold text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer"
            >
              <Palette className="w-4 h-4" />
              <span>1. Hands-On Workshops</span>
            </button>

            <button
              onClick={() => {
                soundManager.playTap();
                setActiveTab('makers');
              }}
              className="px-5 py-3 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-amber-300 border border-amber-500/35 font-bold text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer"
            >
              <Users className="w-4 h-4 text-amber-400" />
              <span>2. Meet the Makers</span>
            </button>

            <button
              onClick={() => {
                soundManager.playTap();
                setActiveTab('taste');
              }}
              className="px-5 py-3 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-amber-300 border border-amber-500/35 font-bold text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer"
            >
              <UtensilsCrossed className="w-4 h-4 text-amber-400" />
              <span>3. Taste the Region</span>
            </button>

            <button
              onClick={() => {
                soundManager.playTap();
                setActiveTab('culture-events');
              }}
              className="px-5 py-3 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-amber-300 border border-amber-500/35 font-bold text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer"
            >
              <Theater className="w-4 h-4 text-amber-400" />
              <span>4. Culture & Events</span>
            </button>

            <button
              onClick={() => {
                soundManager.playTap();
                setActiveTab('surprise-me');
              }}
              className="px-5 py-3 rounded-2xl bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 font-bold text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>✨ Surprise Me</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================
          TRANSFORMATION: FROM TOURIST TO PARTICIPANT
      ======================================================== */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 mb-10 shadow-xl backdrop-blur-md">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-left max-w-sm">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest block">
              Philosophy
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
              From Tourist to Participant
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Go from taking quick photos at monuments to sitting down with local artisans, trying ancestral tools, and shaping lifelong memories.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 w-full md:w-auto flex-1">
            <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 text-center space-y-1">
              <Camera className="w-5 h-5 text-slate-500 mx-auto" />
              <span className="text-[11px] font-bold text-slate-400 block">See Monument</span>
              <span className="text-[10px] text-slate-600 block">Tourist</span>
            </div>

            <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center space-y-1">
              <Palette className="w-5 h-5 text-amber-400 mx-auto" />
              <span className="text-[11px] font-bold text-amber-300 block">Try the Craft</span>
              <span className="text-[10px] text-amber-400/70 block">Workshops</span>
            </div>

            <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center space-y-1">
              <Users className="w-5 h-5 text-amber-400 mx-auto" />
              <span className="text-[11px] font-bold text-amber-300 block">Meet Makers</span>
              <span className="text-[10px] text-amber-400/70 block">Connection</span>
            </div>

            <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center space-y-1">
              <UtensilsCrossed className="w-5 h-5 text-amber-400 mx-auto" />
              <span className="text-[11px] font-bold text-amber-300 block">Taste Hearth</span>
              <span className="text-[10px] text-amber-400/70 block">Regional Food</span>
            </div>

            <div className="p-3 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-400/50 text-center space-y-1 shadow-lg">
              <Heart className="w-5 h-5 text-rose-400 fill-current mx-auto" />
              <span className="text-[11px] font-bold text-white block">Make Memories</span>
              <span className="text-[10px] text-amber-300 font-semibold block">Lifelong Bond</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          PRIMARY CATEGORY TABS
      ======================================================== */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none border-b border-slate-800 pb-4 mb-8">
        {[
          { id: 'all', label: '🌟 All Experiences' },
          { id: 'live-music', label: '🎵 Live Music & Concerts' },
          { id: 'workshops', label: '🎨 1. Workshops' },
          { id: 'makers', label: '🧵 2. Meet the Makers' },
          { id: 'taste', label: '🍛 3. Taste the Region' },
          { id: 'culture-events', label: '🎭 4. Culture & Events' },
          { id: 'state-dna', label: '🇮🇳 5. State DNA' },
          { id: 'surprise-me', label: '✨ 6. Surprise Me' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              soundManager.playTap();
              setActiveTab(tab.id as any);
            }}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
              activeTab === tab.id
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ========================================================
          6. ✨ SURPRISE ME (DEDICATED SECTION)
      ======================================================== */}
      {(activeTab === 'all' || activeTab === 'surprise-me') && (
        <section className="mb-14">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-500/15 via-orange-500/15 to-amber-500/10 border border-amber-500/40 shadow-2xl">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 mb-6 overflow-x-auto scrollbar-none pb-1">
              <span className="text-[11px] font-bold text-amber-400 shrink-0 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Surprise Mode:</span>
              </span>
              {[
                { id: 'all', label: '🌟 All Experiences' },
                { id: 'music', label: '🎵 Music & Concerts' },
                { id: 'crafts', label: '🎨 Craft Workshops' },
                { id: 'food', label: '🍛 Regional Flavours' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleSurpriseMe(cat.id as any)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    surpriseCategory === cat.id
                      ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                      : 'bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-slate-800'
                  }`}
                >
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>

            {/* If Music Category Selected */}
            {surpriseCategory === 'music' && surpriseMusicResult ? (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-black text-xs">
                      <Music className="w-3.5 h-3.5 fill-current" />
                      <span>✨ SURPRISE ME: UNUSUAL LIVE MUSIC EXPERIENCE</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-white">
                      {surpriseMusicResult.event.artistOrEventName}
                    </h2>
                    <div className="text-sm font-semibold text-amber-300">
                      Featuring: {surpriseMusicResult.event.artist}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-amber-200/90 font-medium pt-1">
                      <span>📍 {surpriseMusicResult.event.venue} ({surpriseMusicResult.event.city}, {surpriseMusicResult.event.state})</span>
                      <span>•</span>
                      <span>📅 {surpriseMusicResult.event.date}</span>
                      <span>•</span>
                      <span>⏰ {surpriseMusicResult.event.time}</span>
                      <span>•</span>
                      <span className="px-2 py-0.5 rounded-full bg-slate-950 text-amber-300 border border-amber-500/30 text-[10px] font-bold">
                        {surpriseMusicResult.event.genre}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start">
                    {/* Status Badge */}
                    <span className={`px-3 py-1.5 rounded-xl text-xs font-bold border flex items-center gap-1.5 shadow-md ${
                      surpriseMusicResult.event.status === 'LIVE / VERIFIED'
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-500/50'
                        : surpriseMusicResult.event.status === 'CURATED'
                        ? 'bg-amber-950 text-amber-300 border-amber-500/50'
                        : 'bg-indigo-950 text-indigo-300 border-indigo-500/50'
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${
                        surpriseMusicResult.event.status === 'LIVE / VERIFIED'
                          ? 'bg-emerald-400 animate-pulse'
                          : surpriseMusicResult.event.status === 'CURATED'
                          ? 'bg-amber-400'
                          : 'bg-indigo-400'
                      }`} />
                      <span>{surpriseMusicResult.event.status}</span>
                    </span>

                    <button
                      onClick={() => handleSurpriseMe('music')}
                      disabled={isSurprising}
                      className="px-4 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shrink-0"
                      title="Roll another music surprise"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isSurprising ? 'animate-spin' : ''}`} />
                      <span>Roll Another Music</span>
                    </button>
                  </div>
                </div>

                {/* Event Photo & Story Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="md:col-span-1 h-52 md:h-full rounded-2xl overflow-hidden bg-slate-950 relative border border-slate-800">
                    <img
                      src={surpriseMusicResult.event.image}
                      alt={surpriseMusicResult.event.artistOrEventName}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-lg bg-slate-950/90 text-amber-300 text-[10px] font-bold border border-amber-500/30">
                      💰 {surpriseMusicResult.event.price}
                    </div>
                  </div>

                  <div className="md:col-span-2 space-y-4 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="p-4 rounded-2xl bg-slate-950/70 border border-amber-500/30 text-xs sm:text-sm text-slate-200 space-y-1.5">
                        <strong className="text-amber-400 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                          <Info className="w-4 h-4 text-amber-400" />
                          Why We Recommend This Hidden Musical Gem
                        </strong>
                        <p className="leading-relaxed text-slate-300">
                          "{surpriseMusicResult.reason}"
                        </p>
                      </div>

                      {/* Highlights */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {surpriseMusicResult.event.highlights.map((hl, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-lg bg-slate-900/90 text-slate-300 border border-slate-800 text-[11px]"
                          >
                            ✦ {hl}
                          </span>
                        ))}
                      </div>

                      <div className="text-[11px] text-slate-400 bg-slate-950/50 p-2.5 rounded-xl border border-slate-800/80">
                        <strong className="text-slate-300">Source & Authenticity:</strong> {surpriseMusicResult.event.statusExplanation}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      {onSaveMusicEvent && (
                        <button
                          onClick={() => onSaveMusicEvent(surpriseMusicResult.event)}
                          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
                        >
                          <Heart className={`w-3.5 h-3.5 ${savedMusicEventIds.includes(surpriseMusicResult.event.id) ? 'fill-current text-rose-500' : ''}`} />
                          <span>{savedMusicEventIds.includes(surpriseMusicResult.event.id) ? 'Saved in Journey' : 'Save Event to My Journey'}</span>
                        </button>
                      )}

                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${surpriseMusicResult.event.venue} ${surpriseMusicResult.event.city}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                      >
                        <MapPin className="w-3.5 h-3.5 text-amber-400" />
                        <span>Google Maps Venue</span>
                        <ExternalLink className="w-3 h-3 ml-0.5" />
                      </a>

                      {surpriseMusicResult.event.bookingOrInfoUrl && (
                        <a
                          href={surpriseMusicResult.event.bookingOrInfoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Official Tickets / Sabha Link</span>
                        </a>
                      )}

                      <button
                        onClick={() => {
                          soundManager.playTap();
                          setActiveTab('live-music');
                        }}
                        className="px-4 py-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                      >
                        <span>Explore All Live Concerts</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : surpriseResult ? (
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-black text-xs">
                      <Sparkles className="w-3.5 h-3.5 fill-current" />
                      <span>✨ SURPRISE ME: UNUSUAL LOCAL EXPERIENCE</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-white">
                      {surpriseResult.experience.title}
                    </h2>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-amber-200/90 font-medium">
                      <span>📍 {surpriseResult.experience.location}</span>
                      <span>•</span>
                      <span>⏱ {surpriseResult.experience.duration}</span>
                      <span>•</span>
                      <span className="px-2 py-0.5 rounded-full bg-slate-950 text-amber-300 border border-amber-500/30 text-[10px] font-bold">
                        Curated
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleSurpriseMe()}
                    disabled={isSurprising}
                    className="px-4 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shrink-0"
                    title="Roll another surprise experience"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isSurprising ? 'animate-spin' : ''}`} />
                    <span>Roll Another Surprise</span>
                  </button>
                </div>

                <div className="mt-4 p-4 rounded-2xl bg-slate-950/70 border border-amber-500/30 text-xs sm:text-sm text-slate-200 space-y-1.5">
                  <strong className="text-amber-400 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                    <Info className="w-4 h-4 text-amber-400" />
                    Why We Recommend This Hidden Experience
                  </strong>
                  <p className="leading-relaxed text-slate-300">
                    "{surpriseResult.reason}"
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => handleInspectExperience(surpriseResult.experience)}
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition cursor-pointer"
                  >
                    <span>View Full Experience Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {onSaveExperience && (
                    <button
                      onClick={() => onSaveExperience(surpriseResult.experience)}
                      className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <Heart className={`w-3.5 h-3.5 ${savedExperienceIds.includes(surpriseResult.experience.id) ? 'fill-current text-rose-400' : ''}`} />
                      <span>{savedExperienceIds.includes(surpriseResult.experience.id) ? 'Saved in Journey' : 'Save to My Journey'}</span>
                    </button>
                  )}

                  <button
                    onClick={() => handleSurpriseMe('music')}
                    className="px-4 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <Music className="w-3.5 h-3.5 text-amber-400" />
                    <span>Surprise Me with Music Instead</span>
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </section>
      )}

      {/* ========================================================
          🎵 LIVE MUSIC & CONCERTS
      ======================================================== */}
      {(activeTab === 'all' || activeTab === 'live-music') && (
        <LiveMusicSection
          onSaveEvent={onSaveMusicEvent}
          savedEventIds={savedMusicEventIds}
          userPreferencesLocation={userPreferences?.startingLocation}
          userPreferencesGroup={userPreferences?.travelGroup}
        />
      )}

      {/* ========================================================
          1. 🎨 WORKSHOPS CATEGORY
      ======================================================== */}
      {(activeTab === 'all' || activeTab === 'workshops') && (
        <section className="mb-14 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-t border-slate-800 pt-8">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-widest">
                <Palette className="w-3.5 h-3.5" />
                <span>Hands-on Craft & Creation</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                1. 🎨 WORKSHOPS
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Participate in authentic workshops led by masters across pottery, handloom, painting, block printing, cooking, crafts, and folk music.
              </p>
            </div>

            {/* Workshop Sub-filters */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
              {[
                { id: 'all', label: 'All Workshops' },
                { id: 'pottery', label: '🏺 Pottery' },
                { id: 'weaving', label: '🧵 Handloom / Weaving' },
                { id: 'painting', label: '🎨 Painting' },
                { id: 'block_printing', label: '🪚 Block Printing' },
                { id: 'cooking', label: '🍳 Cooking Classes' },
                { id: 'crafts', label: '🪔 Traditional Crafts' },
                { id: 'dance_music', label: '🎵 Dance & Music' },
              ].map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => {
                    soundManager.playTap();
                    setSelectedWorkshopType(sub.id as any);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                    selectedWorkshopType === sub.id
                      ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                      : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </div>
          </div>

          {/* Workshops Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workshopExperiences.map((exp) => {
              const scoreBreakdown = calculateExperienceScore(exp, userPreferences);
              const isSaved = savedExperienceIds.includes(exp.id);

              return (
                <div
                  key={exp.id}
                  className="rounded-3xl bg-slate-900/85 border border-amber-500/25 overflow-hidden shadow-xl hover:border-amber-400/50 transition duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Cover image & labels */}
                    <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                      <img
                        src={exp.image}
                        alt={exp.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                      
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
                        <span className="px-2.5 py-1 rounded-full bg-slate-950/90 text-[10px] font-bold text-amber-300 border border-amber-500/40">
                          {exp.category}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-slate-900/90 text-[9px] text-amber-300/90 border border-amber-500/30 font-semibold">
                          Curated Workshop
                        </span>
                      </div>

                      {/* Score Badge */}
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black shadow-md flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        <span>{scoreBreakdown.totalScore}% MATCH</span>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3">
                        <h4 className="text-base sm:text-lg font-black text-white leading-tight">
                          {exp.title}
                        </h4>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 space-y-3">
                      <p className="text-xs text-slate-300 leading-relaxed font-medium">
                        "{exp.tagline}"
                      </p>

                      <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                        <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">
                          <span className="text-slate-400 block text-[10px]">Duration</span>
                          <span className="font-bold text-white mt-0.5 block">{exp.duration}</span>
                        </div>
                        <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">
                          <span className="text-slate-400 block text-[10px]">Skill Level</span>
                          <span className="font-bold text-amber-300 mt-0.5 block truncate">{exp.difficulty}</span>
                        </div>
                      </div>

                      {/* Hands-on Curriculum Steps */}
                      <div className="space-y-1.5 pt-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          What You Will Make & Learn:
                        </span>
                        <ul className="space-y-1 text-[11px] text-slate-300">
                          {exp.whatYouExperience.slice(0, 3).map((item, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-amber-400 font-bold shrink-0">✦</span>
                              <span className="line-clamp-1">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Google Places verified search pill */}
                      {exp.googlePlaceQuery && (
                        <div className="pt-2 flex items-center justify-between text-[11px]">
                          <span className="text-slate-400 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-amber-400" />
                            <span>{exp.location}</span>
                          </span>
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(exp.googlePlaceQuery)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1"
                          >
                            <span>Google Maps</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-5 pt-0 border-t border-slate-800/80 flex items-center justify-between gap-2 mt-2">
                    <button
                      onClick={() => handleInspectExperience(exp)}
                      className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer shadow-md"
                    >
                      <span>Explore Workshop Curriculum</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    {onSaveExperience && (
                      <button
                        onClick={() => onSaveExperience(exp)}
                        className={`p-2.5 rounded-xl border transition cursor-pointer ${
                          isSaved
                            ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                            : 'bg-slate-950/80 hover:bg-slate-800 text-slate-400 border-slate-700'
                        }`}
                        title="Save to My Journey"
                      >
                        <Heart className={`w-4 h-4 ${isSaved ? 'fill-current text-rose-400' : ''}`} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ========================================================
          2. 🧵 MEET THE MAKERS
      ======================================================== */}
      {(activeTab === 'all' || activeTab === 'makers') && (
        <section className="mb-14 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-t border-slate-800 pt-8">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-widest">
                <Users className="w-3.5 h-3.5" />
                <span>Hereditary Artisans, Guilds & Small Businesses</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                2. 🧵 MEET THE MAKERS
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Connect directly with hereditary weavers, sculptors, potters, craft communities, and small traditional family workshops.
              </p>
            </div>

            {/* Maker sub-filters */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
              {[
                { id: 'all', label: 'All Makers' },
                { id: 'weavers', label: '🧵 Weavers & Looms' },
                { id: 'potters', label: '🏺 Potters & Clay' },
                { id: 'sculptors', label: '🗿 Temple Sculptors' },
                { id: 'artisans', label: '🎨 Local Artisans' },
                { id: 'communities', label: '👥 Craft Communities & Cooperatives' },
                { id: 'businesses', label: '🏪 Small Businesses' },
              ].map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => {
                    soundManager.playTap();
                    setSelectedMakerFilter(sub.id as any);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                    selectedMakerFilter === sub.id
                      ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                      : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {makerExperiences.map((exp) => {
              const maker = exp.makerInfo!;
              const isSaved = savedExperienceIds.includes(exp.id);

              return (
                <div
                  key={exp.id}
                  className="rounded-3xl bg-slate-900/90 border border-amber-500/25 p-6 shadow-xl flex flex-col justify-between hover:border-amber-400/50 transition duration-300 space-y-4"
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 overflow-hidden flex items-center justify-center shrink-0">
                          {maker.avatarUrl ? (
                            <img src={maker.avatarUrl} alt={maker.name} className="w-full h-full object-cover" />
                          ) : (
                            <Palette className="w-6 h-6 text-amber-400" />
                          )}
                        </div>
                        <div>
                          <h4 className="text-base font-black text-white">{maker.name}</h4>
                          <span className="text-[11px] text-amber-400 block font-semibold">{maker.craft}</span>
                        </div>
                      </div>

                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-950/80 text-amber-300 border border-amber-500/30 font-semibold shrink-0">
                        Curated Profile
                      </span>
                    </div>

                    {/* Metadata Card */}
                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-[11px] space-y-1">
                      <div className="flex items-center justify-between text-slate-400">
                        <span>Guild / Collective:</span>
                        <span className="text-white font-medium truncate max-w-[180px]">{maker.roleOrCooperative}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-400">
                        <span>Location:</span>
                        <span className="text-amber-300 font-medium truncate max-w-[180px]">{exp.location}</span>
                      </div>
                      {maker.experienceYears && (
                        <div className="flex items-center justify-between text-slate-400">
                          <span>Lineage / Heritage:</span>
                          <span className="text-slate-200 font-medium">{maker.experienceYears}</span>
                        </div>
                      )}
                      {maker.workshopAvailability && (
                        <div className="flex items-start justify-between text-slate-400 pt-1 border-t border-slate-800">
                          <span>Availability:</span>
                          <span className="text-emerald-400 font-medium text-right max-w-[190px]">{maker.workshopAvailability}</span>
                        </div>
                      )}
                    </div>

                    {/* Short Story */}
                    <p className="text-xs text-slate-300 leading-relaxed font-normal">
                      "{maker.story}"
                    </p>

                    {/* Sequential Pathway Box (e.g. Pochampally -> Ikat weaving -> Visit workshop -> Learn weaving -> Meet maker) */}
                    {maker.journeyPathway && maker.journeyPathway.length > 0 && (
                      <div className="p-3 rounded-xl bg-slate-950/80 border border-amber-500/25 space-y-2">
                        <span className="text-[10px] font-black text-amber-400 uppercase tracking-wider block">
                          Artisan Journey Pathway
                        </span>
                        <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                          {maker.journeyPathway.map((step, idx) => (
                            <React.Fragment key={idx}>
                              <span className="px-2 py-0.5 rounded-md bg-slate-900 text-slate-200 border border-slate-800 font-medium">
                                <span className="text-amber-400 font-bold mr-1">{idx + 1}.</span>
                                {step}
                              </span>
                              {idx < maker.journeyPathway!.length - 1 && (
                                <ChevronRight className="w-3 h-3 text-amber-400 shrink-0" />
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="text-[11px] text-slate-400 p-2.5 rounded-xl bg-slate-950/40 border border-slate-800/60">
                      <strong className="text-slate-200 block mb-0.5">What visitors can experience:</strong>
                      <p className="italic text-slate-300 leading-snug">{maker.whatVisitorsExperience}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-slate-800 flex items-center gap-2">
                    <button
                      onClick={() => handleInspectExperience(exp)}
                      className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer shadow-md"
                    >
                      <span>Meet Artisan Collective →</span>
                    </button>

                    {exp.googlePlaceQuery && (
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(exp.googlePlaceQuery)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-sky-400 border border-sky-500/30 transition"
                        title="View on Google Maps"
                      >
                        <Map className="w-4 h-4" />
                      </a>
                    )}

                    {onSaveExperience && (
                      <button
                        onClick={() => onSaveExperience(exp)}
                        className={`p-2.5 rounded-xl border transition cursor-pointer ${
                          isSaved
                            ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                            : 'bg-slate-950/80 hover:bg-slate-800 text-slate-400 border-slate-700'
                        }`}
                        title="Save to My Journey"
                      >
                        <Heart className={`w-4 h-4 ${isSaved ? 'fill-current text-rose-400' : ''}`} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ========================================================
          3. 🍛 TASTE THE REGION
      ======================================================== */}
      {(activeTab === 'all' || activeTab === 'taste') && (
        <section className="mb-14 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-t border-slate-800 pt-8">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-widest">
                <UtensilsCrossed className="w-3.5 h-3.5" />
                <span>Culinary Terroir, Cooking Classes & Local Food Stalls</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                3. 🍛 TASTE THE REGION
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Discover authentic regional food, traditional cooking methods, and local food stalls. Clearly distinguished between curated culinary traditions and verified live Google Places.
              </p>
            </div>

            {/* Taste sub-filters */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
              {[
                { id: 'all', label: 'All Regional Flavours' },
                { id: 'dishes', label: '🍲 Iconic Dishes' },
                { id: 'cooking', label: '🍳 Cooking Classes' },
                { id: 'hearths', label: '🔥 Wood-Fired Hearths' },
                { id: 'live-places', label: '🏬 Live Verified Food Stalls (Google Maps)' },
              ].map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => {
                    soundManager.playTap();
                    setSelectedTasteFilter(sub.id as any);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                    selectedTasteFilter === sub.id
                      ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                      : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </div>
          </div>

          {/* CURATED DISHES & TRADITIONAL COOKING EXPERIENCES */}
          {selectedTasteFilter !== 'live-places' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tasteExperiences.map((exp) => {
                const isSaved = savedExperienceIds.includes(exp.id);

                return (
                  <div
                    key={exp.id}
                    className="rounded-3xl bg-slate-900/90 border border-amber-500/25 p-6 shadow-xl space-y-4 hover:border-amber-400/50 transition duration-300 flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row gap-4 items-start">
                        <img
                          src={exp.image}
                          alt={exp.title}
                          className="w-full sm:w-36 h-36 rounded-2xl object-cover shrink-0"
                        />
                        <div className="space-y-1.5 flex-1">
                          <div className="flex items-center justify-between flex-wrap gap-1.5">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                              {exp.state} Gastronomy
                            </span>
                            <div className="flex items-center gap-1.5">
                              {exp.makeSomethingType === 'cooking' && (
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30">
                                  Cooking Class
                                </span>
                              )}
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-950/80 text-amber-300 border border-amber-500/30 font-semibold">
                                Curated Tradition
                              </span>
                            </div>
                          </div>
                          <h3 className="text-lg font-black text-white">{exp.title}</h3>
                          <p className="text-xs text-slate-300 leading-relaxed font-medium">
                            "{exp.tagline}"
                          </p>
                          <p className="text-[11px] text-slate-400 font-mono">
                            📍 {exp.location}
                          </p>
                        </div>
                      </div>

                      {/* What makes this food special? */}
                      {exp.foodInsights && (
                        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                            <Flame className="w-3.5 h-3.5 text-amber-400" />
                            What makes this food special?
                          </span>

                          <p className="text-xs text-slate-300 leading-relaxed">
                            {exp.foodInsights.whatMakesItSpecial}
                          </p>

                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {exp.foodInsights.keyIngredients.map((ing, i) => (
                              <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-amber-300 border border-slate-700">
                                {ing}
                              </span>
                            ))}
                          </div>

                          {exp.foodInsights.cookingMethod && (
                            <div className="text-[11px] text-slate-300 pt-1.5 flex items-start gap-1.5 bg-slate-900/60 p-2 rounded-xl border border-slate-800">
                              <span className="text-orange-400 font-bold shrink-0">🔥 Method:</span>
                              <span>{exp.foodInsights.cookingMethod}</span>
                            </div>
                          )}

                          {exp.foodInsights.culturalOccasion && (
                            <div className="text-[11px] text-slate-400">
                              <strong className="text-slate-300">Occasion:</strong> {exp.foodInsights.culturalOccasion}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-2 mt-2">
                      <button
                        onClick={() => handleInspectExperience(exp)}
                        className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer shadow-md"
                      >
                        <span>Explore Food Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      {exp.googlePlaceQuery && (
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(exp.googlePlaceQuery)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-sky-400 border border-sky-500/30 transition"
                          title="Find verified restaurants on Google Maps"
                        >
                          <Map className="w-4 h-4" />
                        </a>
                      )}

                      {onSaveExperience && (
                        <button
                          onClick={() => onSaveExperience(exp)}
                          className={`p-2.5 rounded-xl border transition cursor-pointer ${
                            isSaved
                              ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                            : 'bg-slate-950/80 hover:bg-slate-800 text-slate-400 border-slate-700'
                          }`}
                          title="Save to My Journey"
                        >
                          <Heart className={`w-4 h-4 ${isSaved ? 'fill-current text-rose-400' : ''}`} />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* LIVE VERIFIED GOOGLE PLACES SECTION */}
          {(selectedTasteFilter === 'all' || selectedTasteFilter === 'live-places') && (
            <div className="rounded-3xl bg-slate-900/90 border border-emerald-500/30 p-6 sm:p-8 space-y-6 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-widest">
                    <BadgeCheck className="w-4 h-4 text-emerald-400" />
                    <span>Google Places Integration (Live Verified Business Data)</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                    Verified Local Food Stalls, Dhabas & Bhojanalayas
                  </h3>
                  <p className="text-xs text-slate-400">
                    Real registered dining spots, ratings, and addresses pulled in real-time from the Google Places API. Clearly distinguished from curated traditional culinary heritage above.
                  </p>
                </div>

                {/* Destination Selector for Live Places */}
                <div className="flex items-center gap-2 overflow-x-auto scrollbar-none self-start sm:self-auto">
                  {['Ananthagiri Vikarabad', 'Hampi Karnataka', 'Munnar Kerala', 'Varanasi Ghats', 'Jaipur Rajasthan', 'Spiti Himachal'].map((dest) => (
                    <button
                      key={dest}
                      onClick={() => {
                        soundManager.playTap();
                        setLiveFoodDestination(dest);
                        fetchLiveFoodPlaces(dest);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                        liveFoodDestination === dest
                          ? 'bg-emerald-500 text-slate-950 font-black shadow-md'
                          : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800'
                      }`}
                    >
                      {dest.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Live Places Grid */}
              {isLoadingLiveFood ? (
                <div className="py-12 flex flex-col items-center justify-center space-y-2 text-slate-400">
                  <RefreshCw className="w-6 h-6 animate-spin text-emerald-400" />
                  <span className="text-xs">Connecting to Google Places API...</span>
                </div>
              ) : liveFoodPlaces.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {liveFoodPlaces.map((place) => (
                    <div
                      key={place.id}
                      className="p-5 rounded-2xl bg-slate-950/80 border border-emerald-500/20 hover:border-emerald-400/40 transition space-y-3 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                            <BadgeCheck className="w-3 h-3" />
                            <span>Verified Live Google Place</span>
                          </span>

                          {place.rating && (
                            <div className="flex items-center gap-1 text-xs font-bold text-amber-400">
                              <Star className="w-3.5 h-3.5 fill-current" />
                              <span>{place.rating.toFixed(1)}</span>
                              {place.reviewsCount && (
                                <span className="text-[10px] text-slate-500">({place.reviewsCount})</span>
                              )}
                            </div>
                          )}
                        </div>

                        <h4 className="text-base font-bold text-white leading-tight">
                          {place.name}
                        </h4>

                        <p className="text-xs text-slate-400 line-clamp-2">
                          {place.address}
                        </p>

                        {place.editorialSummary && (
                          <p className="text-[11px] text-slate-300 italic line-clamp-2">
                            "{place.editorialSummary}"
                          </p>
                        )}
                      </div>

                      <a
                        href={place.googleMapsUri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center justify-center gap-1.5 transition"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        <span>Directions on Google Maps</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-xs text-slate-400">
                  No live places returned for this query. Use the destination selector above to load verified stalls and dhabas.
                </div>
              )}
            </div>
          )}
        </section>
      )}

      {/* ========================================================
          4. 🎭 CULTURE & EVENTS
      ======================================================== */}
      {(activeTab === 'all' || activeTab === 'culture-events') && (
        <section className="mb-14 space-y-6">
          <div className="border-t border-slate-800 pt-8 space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-widest">
                  <Theater className="w-3.5 h-3.5" />
                  <span>Living Heritage & Traditional Celebrations</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                  4. 🎭 CULTURE & EVENTS
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
                  Immerse yourself in authentic Indian festivals, cultural performances, fairs, folk arts, seasonal events, and traditional celebrations.
                </p>
              </div>

              {/* Strict Verification & Authenticity Notice */}
              <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-[11px] text-slate-300 max-w-lg shadow-inner space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-amber-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Authentic Cultural Calendar Notice</span>
                </div>
                <p className="text-slate-400 leading-snug">
                  Traditional celebrations follow regional lunar calendars (Panchangams) or seasonal agrarian cycles. We do not pretend curated events are live, nor do we fabricate dates, venues, or ticket prices. Every event displays its authentic verification status.
                </p>
              </div>
            </div>

            {/* Filter 1: Categories */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
                <span>Filter by Category:</span>
                <span className="font-mono text-amber-400">{filteredEvents.length} Events Listed</span>
              </div>
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
                {[
                  { id: 'all', label: 'All Categories' },
                  { id: 'festival', label: '🪔 Festivals' },
                  { id: 'cultural performance', label: '🎭 Cultural Performances' },
                  { id: 'fairs', label: '🎪 Fairs' },
                  { id: 'folk arts', label: '🥁 Folk Arts' },
                  { id: 'seasonal events', label: '🌾 Seasonal Events' },
                  { id: 'traditional celebrations', label: '✨ Traditional Celebrations' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      soundManager.playTap();
                      setSelectedEventCategory(cat.id);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                      selectedEventCategory === cat.id
                        ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                        : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter 2: Status & State Filters */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-slate-900/80">
              {/* Status Filter */}
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                <span className="text-[11px] text-slate-400 font-bold shrink-0">Verification Status:</span>
                {[
                  { id: 'all', label: 'All Statuses' },
                  { id: 'Curated Event', label: '📜 Curated Event' },
                  { id: 'Verified Event', label: '🛡️ Verified Event' },
                  { id: 'Demo Event', label: '🔬 Demo Event' },
                  { id: 'Live/Upcoming', label: '🔴 Live/Upcoming' }
                ].map((st) => (
                  <button
                    key={st.id}
                    onClick={() => {
                      soundManager.playTap();
                      setSelectedEventStatus(st.id);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition cursor-pointer ${
                      selectedEventStatus === st.id
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                        : 'bg-slate-900/60 hover:bg-slate-800 text-slate-400 border border-slate-800'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>

              {/* State Filter */}
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                <span className="text-[11px] text-slate-400 font-bold shrink-0">State:</span>
                {['all', 'Telangana', 'Rajasthan', 'Kerala', 'Tamil Nadu', 'Karnataka', 'Uttar Pradesh'].map((st) => (
                  <button
                    key={st}
                    onClick={() => {
                      soundManager.playTap();
                      setSelectedEventState(st);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition cursor-pointer ${
                      selectedEventState === st
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                        : 'bg-slate-900/60 hover:bg-slate-800 text-slate-400 border border-slate-800'
                    }`}
                  >
                    {st === 'all' ? 'All States' : st}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((evt) => {
              const isVerified = evt.status === 'Verified Event';
              const isLive = evt.status === 'Live/Upcoming';
              const isDemo = evt.status === 'Demo Event';

              return (
                <div
                  key={evt.id}
                  className="group rounded-3xl bg-slate-900/85 border border-slate-800 hover:border-amber-500/40 p-5 shadow-xl space-y-4 transition flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Event Image */}
                    <div className="relative h-48 w-full rounded-2xl overflow-hidden bg-slate-950">
                      {evt.image ? (
                        <img
                          src={evt.image}
                          alt={evt.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-950 flex items-center justify-center text-amber-400">
                          <Calendar className="w-10 h-10" />
                        </div>
                      )}

                      {/* Category Tag */}
                      <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-slate-950/90 text-[10px] font-bold text-amber-300 border border-amber-500/30">
                        {evt.category}
                      </span>

                      {/* Dynamic Status Badge */}
                      <span
                        className={`absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold border flex items-center gap-1 shadow-md ${
                          isVerified
                            ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500/50'
                            : isLive
                            ? 'bg-cyan-950/90 text-cyan-300 border-cyan-500/50 animate-pulse'
                            : isDemo
                            ? 'bg-indigo-950/90 text-indigo-300 border-indigo-500/50'
                            : 'bg-amber-950/90 text-amber-300 border-amber-500/50'
                        }`}
                      >
                        {isVerified && <BadgeCheck className="w-3 h-3 text-emerald-400" />}
                        {isLive && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />}
                        {!isVerified && !isLive && <ShieldCheck className="w-3 h-3 text-amber-400" />}
                        <span>{evt.status}</span>
                      </span>

                      {/* Seasonal / Lunar Time Period */}
                      <span className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-slate-950/90 text-amber-200 text-[10px] font-semibold border border-amber-500/30 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-400" />
                        <span>{evt.timePeriod}</span>
                      </span>

                      {/* State Badge */}
                      <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-full bg-slate-950/90 text-slate-300 text-[10px] font-bold border border-slate-700">
                        {evt.state}
                      </span>
                    </div>

                    {/* Title & Authentic Venue */}
                    <div className="space-y-1">
                      <h3 className="text-lg font-black text-white group-hover:text-amber-300 transition">
                        {evt.title}
                      </h3>
                      <p className="text-xs text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span className="line-clamp-1">{evt.traditionalVenue || evt.location}</span>
                      </p>
                    </div>

                    {/* Frequency Tag */}
                    {evt.seasonOrFrequency && (
                      <div className="text-[11px] text-amber-400/90 font-medium">
                        ⏱ {evt.seasonOrFrequency}
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                      {evt.description}
                    </p>

                    {/* Highlight Box */}
                    <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 text-[11px] text-amber-300 font-medium">
                      ✦ {evt.highlight}
                    </div>

                    {/* Transparent Status Explanation Note */}
                    <div className="text-[10px] text-slate-400 bg-slate-950/40 p-2.5 rounded-xl border border-slate-800/80 leading-snug">
                      <strong className="text-slate-300">Status Context:</strong> {evt.statusExplanation}
                    </div>
                  </div>

                  {/* Card Footer: Access info & Explore Modal Action */}
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                    <span className="text-[10px] text-emerald-400 font-semibold line-clamp-1">
                      {evt.accessInfo || 'Free Cultural Viewing'}
                    </span>

                    <button
                      onClick={() => {
                        soundManager.playTap();
                        setInspectEvent(evt);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shrink-0"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Cultural Lore</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ========================================================
          5. 🇮🇳 STATE DNA (INTERACTIVE STATE SELECTOR)
      ======================================================== */}
      {(activeTab === 'all' || activeTab === 'state-dna') && (
        <section id="state-dna-section" className="mb-14 space-y-6">
          <div className="border-t border-slate-800 pt-8 space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-widest">
              <Compass className="w-3.5 h-3.5" />
              <span>Cultural Geography & Identity</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              5. 🇮🇳 STATE DNA
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-3xl">
              Select an Indian state to explore its distinctive cultural DNA: signature GI-tagged crafts, regional heirloom food, traditional festivals, performing arts, hands-on workshops, local experiences, and hereditary artisan communities.
            </p>
          </div>

          {/* Interactive State Selector Pills */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2">
            {['Telangana', 'Rajasthan', 'Kerala', 'Tamil Nadu', 'Karnataka', 'Uttar Pradesh'].map((st) => {
              const stateData = STATE_DNA_DATA[st];
              const isSelected = selectedStateKey === st;
              const craftCount = stateData?.signatureCrafts?.length || 0;
              const foodCount = stateData?.signatureFood?.length || 0;

              return (
                <button
                  key={st}
                  onClick={() => {
                    soundManager.playTap();
                    setSelectedStateKey(st);
                  }}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-black whitespace-nowrap transition cursor-pointer flex items-center gap-2 ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 scale-105'
                      : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
                  }`}
                >
                  <span>{st}</span>
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded-md font-mono ${
                      isSelected ? 'bg-slate-950 text-amber-400' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {craftCount + foodCount} Highlights
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active State DNA Canvas */}
          <div className="rounded-3xl bg-slate-900/90 border border-amber-500/35 overflow-hidden shadow-2xl p-6 sm:p-10 space-y-8 animate-in fade-in duration-300">
            
            {/* State Hero Banner */}
            <div className="relative rounded-2xl overflow-hidden p-6 sm:p-8 bg-slate-950 border border-slate-800">
              <div className="absolute inset-0 z-0 opacity-25">
                <img
                  src={activeStateDNA.heroImage}
                  alt={activeStateDNA.state}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent z-10" />

              <div className="relative z-20 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="space-y-2 max-w-2xl">
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest">
                    <span>Cultural DNA Fingerprint</span>
                    <span>•</span>
                    <span className="text-emerald-400">Curated & Reliable Data</span>
                  </div>
                  <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                    {activeStateDNA.state}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-200 font-medium leading-relaxed">
                    {activeStateDNA.tagline}
                  </p>

                  {/* Summary Metric Counters */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-amber-500/30 text-[11px] text-amber-300 font-bold">
                      🏺 {activeStateDNA.signatureCrafts.length} Signature Crafts
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-amber-500/30 text-[11px] text-amber-300 font-bold">
                      🍲 {activeStateDNA.signatureFood.length} Traditional Dishes
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-amber-500/30 text-[11px] text-amber-300 font-bold">
                      🪔 {activeStateDNA.festivals.length} Key Festivals
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-amber-500/30 text-[11px] text-amber-300 font-bold">
                      🎭 {activeStateDNA.performingArts.length} Performing Arts
                    </span>
                    {activeStateDNA.workshops && (
                      <span className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-amber-500/30 text-[11px] text-amber-300 font-bold">
                        🔨 {activeStateDNA.workshops.length} Workshops
                      </span>
                    )}
                    {activeStateDNA.artisanCommunities && (
                      <span className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-amber-500/30 text-[11px] text-amber-300 font-bold">
                        👥 {activeStateDNA.artisanCommunities.length} Guilds
                      </span>
                    )}
                  </div>
                </div>

                {/* Famous Artisan Products Pills */}
                <div className="flex flex-col gap-2 max-w-xs w-full">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                    Famous Artisan Products:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeStateDNA.famousArtisanProducts.map((p, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-full bg-slate-900/90 text-amber-200 border border-amber-500/30 text-[11px] font-medium"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* State Sub-Navigation Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1 border-b border-slate-800 pb-3">
              {[
                { id: 'all', label: '🌟 All State DNA' },
                { id: 'crafts', label: '🏺 Famous Crafts' },
                { id: 'food', label: '🍲 Traditional Food' },
                { id: 'festivals', label: '🪔 Festivals' },
                { id: 'arts', label: '🎭 Performing Arts' },
                { id: 'workshops', label: '🔨 Workshops' },
                { id: 'experiences', label: '🌿 Local Experiences' },
                { id: 'communities', label: '👥 Artisan Communities' },
              ].map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => {
                    soundManager.playTap();
                    setSelectedStateSection(sub.id as any);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                    selectedStateSection === sub.id
                      ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                      : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800'
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </div>

            {/* 1. FAMOUS & LOCAL CRAFTS */}
            {(selectedStateSection === 'all' || selectedStateSection === 'crafts') && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-amber-400 text-sm font-black uppercase tracking-wider">
                  <Palette className="w-4 h-4" />
                  <span>1. Famous & Local Crafts (GI Tagged Heritage)</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {activeStateDNA.signatureCrafts.map((craft, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2 hover:border-amber-500/30 transition"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-sm font-bold text-white">{craft.name}</h4>
                        {craft.GIStatus && (
                          <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold shrink-0">
                            GI Tag
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed font-normal">
                        {craft.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. TRADITIONAL FOOD & HEARTH */}
            {(selectedStateSection === 'all' || selectedStateSection === 'food') && (
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 text-amber-400 text-sm font-black uppercase tracking-wider">
                  <UtensilsCrossed className="w-4 h-4" />
                  <span>2. Traditional Food & Heritage Hearth Cookery</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {activeStateDNA.signatureFood.map((food, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2 flex flex-col justify-between hover:border-amber-500/30 transition"
                    >
                      <div className="space-y-1.5">
                        <h4 className="text-sm font-bold text-white">{food.name}</h4>
                        <p className="text-xs text-slate-300 leading-relaxed font-normal">
                          {food.description}
                        </p>
                      </div>
                      <div className="pt-2 border-t border-slate-800/80">
                        <span className="text-[10px] text-amber-300/90 font-mono block">
                          📍 Must try at: {food.mustTryAt}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. KEY FESTIVALS */}
            {(selectedStateSection === 'all' || selectedStateSection === 'festivals') && (
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 text-amber-400 text-sm font-black uppercase tracking-wider">
                  <Calendar className="w-4 h-4" />
                  <span>3. Living Festivals & Lunar Calendar</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {activeStateDNA.festivals.map((fest, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2 hover:border-amber-500/30 transition"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-sm font-bold text-white">{fest.name}</h4>
                        <span className="text-[10px] text-emerald-400 font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                          {fest.month}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed font-normal">
                        {fest.significance}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. PERFORMING ARTS */}
            {(selectedStateSection === 'all' || selectedStateSection === 'arts') && (
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 text-amber-400 text-sm font-black uppercase tracking-wider">
                  <Theater className="w-4 h-4" />
                  <span>4. Performing Arts & Oral Traditions</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {activeStateDNA.performingArts.map((art, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2 hover:border-amber-500/30 transition"
                    >
                      <h4 className="text-sm font-bold text-white">{art.name}</h4>
                      <p className="text-xs text-slate-300 leading-relaxed font-normal">
                        {art.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. WORKSHOPS IN STATE */}
            {(selectedStateSection === 'all' || selectedStateSection === 'workshops') && activeStateDNA.workshops && activeStateDNA.workshops.length > 0 && (
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 text-amber-400 text-sm font-black uppercase tracking-wider">
                  <Wrench className="w-4 h-4" />
                  <span>5. Hands-on Workshops in {activeStateDNA.state}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {activeStateDNA.workshops.map((ws, i) => (
                    <div
                      key={i}
                      className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3 flex flex-col justify-between hover:border-amber-500/40 transition"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            {ws.type}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            ⏱ {ws.duration}
                          </span>
                        </div>
                        <h4 className="text-sm font-black text-white leading-snug">
                          {ws.title}
                        </h4>
                        <p className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                          <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                          <span>{ws.location}</span>
                        </p>
                        <p className="text-xs text-slate-300 leading-relaxed font-normal">
                          {ws.description}
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          soundManager.playTap();
                          // Locate matching experience or show direct workshop details
                          const match = SOUL_EXPERIENCES.find(e =>
                            e.title.toLowerCase().includes(ws.title.toLowerCase().slice(0, 15)) ||
                            (e.state === activeStateDNA.state && e.category === 'Workshops & Crafts')
                          );
                          if (match) {
                            handleInspectExperience(match);
                          } else {
                            handleInspectExperience({
                              id: `ws-${i}-${activeStateDNA.state.toLowerCase()}`,
                              title: ws.title,
                              tagline: `${ws.type} Workshop in ${ws.location}`,
                              category: 'Workshops & Crafts',
                              destinationId: activeStateDNA.state.toLowerCase(),
                              destinationName: ws.location,
                              state: activeStateDNA.state,
                              location: ws.location,
                              duration: ws.duration,
                              difficulty: 'Beginner Friendly',
                              priceLevel: 'Moderate (₹800 - ₹2000)',
                              priceInr: 1200,
                              image: activeStateDNA.heroImage,
                              shortStory: ws.description,
                              whatYouExperience: [
                                'Interactive guidance from hereditary master craftsmen',
                                'Direct handling of authentic traditional tools and natural materials',
                                'Create a personalized keepsake to take home',
                                'Support local artisan livelihoods through ethical tourism'
                              ],
                              isDemoExperience: false,
                              tags: [ws.type, activeStateDNA.state, 'Workshop']
                            });
                          }
                        }}
                        className="w-full py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
                      >
                        <Palette className="w-3.5 h-3.5" />
                        <span>Inspect Workshop Experience</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. LOCAL EXPERIENCES */}
            {(selectedStateSection === 'all' || selectedStateSection === 'experiences') && activeStateDNA.localExperiences && activeStateDNA.localExperiences.length > 0 && (
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 text-amber-400 text-sm font-black uppercase tracking-wider">
                  <Compass className="w-4 h-4" />
                  <span>6. Local Experiences & Living Heritage</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {activeStateDNA.localExperiences.map((expStr, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-start gap-3 hover:border-amber-500/30 transition"
                    >
                      <span className="text-amber-400 font-mono font-bold text-xs shrink-0 mt-0.5">
                        0{i + 1}.
                      </span>
                      <p className="text-xs text-slate-200 leading-snug font-medium">
                        {expStr}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 7. ARTISAN COMMUNITIES & GUILDS */}
            {(selectedStateSection === 'all' || selectedStateSection === 'communities') && activeStateDNA.artisanCommunities && activeStateDNA.artisanCommunities.length > 0 && (
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 text-amber-400 text-sm font-black uppercase tracking-wider">
                  <Users className="w-4 h-4" />
                  <span>7. Artisan Communities & Living Guilds</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {activeStateDNA.artisanCommunities.map((guild, i) => (
                    <div
                      key={i}
                      className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3 flex flex-col justify-between hover:border-amber-500/40 transition"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900 text-amber-300 border border-slate-700">
                            Community Guild
                          </span>
                          <span className="text-[10px] text-emerald-400 font-mono">
                            📍 {guild.location}
                          </span>
                        </div>
                        <h4 className="text-sm font-black text-white leading-snug">
                          {guild.name}
                        </h4>
                        <div className="text-xs text-amber-400 font-semibold">
                          Craft: {guild.craft}
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed font-normal">
                          {guild.heritageStory}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 bg-slate-900/40 p-2.5 rounded-xl border border-slate-800">
                        <strong className="text-slate-300 block mb-0.5">Visiting Guidance:</strong>
                        <span>{guild.visitingGuidance}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 8. CULTURAL STORIES BEHIND THE CRAFT */}
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-950 to-amber-500/5 border border-amber-500/25 space-y-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-amber-400" />
                Living Stories Behind The Craft
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activeStateDNA.culturalStories.map((story, i) => (
                  <div key={i} className="space-y-1.5">
                    <h5 className="font-black text-sm text-white">{story.title}</h5>
                    <p className="text-xs text-slate-300 leading-relaxed font-normal">
                      {story.story}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>
      )}

      {/* ========================================================
          MODAL: INSPECT CULTURAL EVENT DETAILS
      ======================================================== */}
      {inspectEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-slate-900 border border-amber-500/40 p-6 sm:p-8 shadow-2xl space-y-6 text-left">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    {inspectEvent.category}
                  </span>
                  <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold border ${
                    inspectEvent.status === 'Verified Event'
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-500/50'
                      : inspectEvent.status === 'Live/Upcoming'
                      ? 'bg-cyan-950 text-cyan-300 border-cyan-500/50'
                      : 'bg-amber-950 text-amber-300 border-amber-500/50'
                  }`}>
                    {inspectEvent.status}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-950 text-slate-300 border border-slate-700">
                    {inspectEvent.state}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-white">
                  {inspectEvent.title}
                </h3>
                <p className="text-xs text-slate-400">
                  📍 {inspectEvent.traditionalVenue || inspectEvent.location}
                </p>
              </div>

              <button
                onClick={() => setInspectEvent(null)}
                className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Event Photo */}
            {inspectEvent.image && (
              <div className="h-56 w-full rounded-2xl overflow-hidden bg-slate-950">
                <img
                  src={inspectEvent.image}
                  alt={inspectEvent.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Status Context & Lunar Calculation */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Traditional Timing: {inspectEvent.timePeriod}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {inspectEvent.statusExplanation}
              </p>
            </div>

            {/* Description & Significance */}
            <div className="space-y-3 text-xs sm:text-sm">
              <h4 className="font-black text-white text-sm">Cultural Background & Folklore</h4>
              <p className="text-slate-300 leading-relaxed font-normal">
                {inspectEvent.description}
              </p>

              {inspectEvent.culturalSignificance && (
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 space-y-1">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                    Spiritual & Agrarian Significance
                  </span>
                  <p className="text-xs text-amber-200/90 leading-relaxed font-normal">
                    {inspectEvent.culturalSignificance}
                  </p>
                </div>
              )}
            </div>

            {/* Signature Highlight */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                Signature Highlight
              </span>
              <p className="text-xs text-slate-200">
                ✦ {inspectEvent.highlight}
              </p>
            </div>

            {/* Spectator Guidance & Etiquette */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                  Public Access & Ticketing
                </span>
                <p className="text-[11px] text-slate-300">
                  {inspectEvent.accessInfo || 'Free Public Heritage Gathering · Open Access'}
                </p>
              </div>

              {inspectEvent.bestViewingTip && (
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                    Insider Viewing Advice
                  </span>
                  <p className="text-[11px] text-slate-300">
                    {inspectEvent.bestViewingTip}
                  </p>
                </div>
              )}
            </div>

            {/* Close Button */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setInspectEvent(null)}
                className="px-6 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition cursor-pointer"
              >
                Close Cultural Details
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: INSPECT EXPERIENCE DETAILS
      ======================================================== */}
      {inspectExperience && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-slate-900 border border-amber-500/40 p-6 sm:p-8 shadow-2xl space-y-6 text-left">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    {inspectExperience.category}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-950/80 text-amber-300 border border-amber-500/30 font-semibold">
                    Curated Experience
                  </span>
                </div>
                <h3 className="text-2xl font-black text-white mt-1">
                  {inspectExperience.title}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  📍 {inspectExperience.location} • {inspectExperience.duration}
                </p>
              </div>

              <button
                onClick={() => setInspectExperience(null)}
                className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Experience Image */}
            <div className="h-56 w-full rounded-2xl overflow-hidden bg-slate-950">
              <img
                src={inspectExperience.image}
                alt={inspectExperience.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Story & What You'll Experience */}
            <div className="space-y-3 text-xs sm:text-sm">
              <h4 className="font-black text-white text-sm">The Story Behind This Experience</h4>
              <p className="text-slate-300 leading-relaxed font-normal">
                {inspectExperience.shortStory}
              </p>

              <h4 className="font-black text-white text-sm pt-2">Hands-on Steps & Curriculum</h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {inspectExperience.whatYouExperience.map((step, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold shrink-0">{i + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Maker Info if present */}
            {inspectExperience.makerInfo && (
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                    Artisan / Cooperative Host
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-900 text-amber-300/80 border border-slate-700">
                    Curated Profile
                  </span>
                </div>
                <div className="font-bold text-white text-xs">
                  {inspectExperience.makerInfo.name} ({inspectExperience.makerInfo.roleOrCooperative})
                </div>
                <p className="text-xs text-slate-400">
                  {inspectExperience.makerInfo.story}
                </p>

                {inspectExperience.makerInfo.workshopAvailability && (
                  <div className="text-[11px] text-emerald-400 pt-1">
                    <strong>Workshop Availability:</strong> {inspectExperience.makerInfo.workshopAvailability}
                  </div>
                )}

                {inspectExperience.makerInfo.journeyPathway && (
                  <div className="pt-2">
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
                      Visitor Pathway:
                    </span>
                    <div className="flex flex-wrap items-center gap-1 text-[10px]">
                      {inspectExperience.makerInfo.journeyPathway.map((p, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-slate-900 text-slate-200 border border-slate-800">
                          {idx + 1}. {p}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="text-[11px] text-slate-300 italic pt-1">
                  Visitor Experience: {inspectExperience.makerInfo.whatVisitorsExperience}
                </div>
              </div>
            )}

            {/* Google Maps External Query Link */}
            {inspectExperience.googlePlaceQuery && (
              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-white block">Location & Surrounding Area</span>
                  <span className="text-[11px] text-slate-400">{inspectExperience.location}</span>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(inspectExperience.googlePlaceQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/40 text-xs font-bold flex items-center gap-1.5 transition"
                >
                  <span>Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {onSaveExperience && (
                <button
                  onClick={() => {
                    onSaveExperience(inspectExperience);
                    soundManager.playTap();
                  }}
                  className={`flex-1 py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer ${
                    savedExperienceIds.includes(inspectExperience.id)
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${savedExperienceIds.includes(inspectExperience.id) ? 'fill-current text-rose-400' : ''}`} />
                  <span>
                    {savedExperienceIds.includes(inspectExperience.id)
                      ? 'Saved in My Journey'
                      : 'Save Experience to Journey'}
                  </span>
                </button>
              )}

              <button
                onClick={() => setInspectExperience(null)}
                className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs sm:text-sm font-semibold transition cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
