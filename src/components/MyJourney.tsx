import React, { useState, useMemo } from 'react';
import { Destination, SavedJourneyItem, DayItinerary, SoulExperience, LiveMusicEvent } from '../types/travel';
import { SOUL_EXPERIENCES } from '../data/soulOfIndiaData';
import { LIVE_MUSIC_EVENTS } from '../data/liveMusicData';
import { MusicEventDetailsModal } from './MusicEventDetailsModal';
import { soundManager } from '../utils/soundEffects';
import {
  BookmarkCheck,
  Trash2,
  Calendar,
  Sparkles,
  MapPin,
  Clock,
  ArrowRight,
  Printer,
  Copy,
  CheckCircle2,
  Box,
  Map as MapIcon,
  Palette,
  ExternalLink,
  Music,
  Navigation
} from 'lucide-react';

interface Props {
  savedItems: SavedJourneyItem[];
  onRemoveItem: (destinationId: string) => void;
  onExploreDestination: (destination: Destination, initialTab?: '3d' | 'google-maps') => void;
  savedExperienceIds?: string[];
  onRemoveExperience?: (experienceId: string) => void;
  savedMusicEventIds?: string[];
  onRemoveMusicEvent?: (eventId: string) => void;
  onOpenSoulOfIndia?: () => void;
}

export const MyJourney: React.FC<Props> = ({
  savedItems,
  onRemoveItem,
  onExploreDestination,
  savedExperienceIds = [],
  onRemoveExperience,
  savedMusicEventIds = [],
  onRemoveMusicEvent,
  onOpenSoulOfIndia,
}) => {
  const [activeTab, setActiveTab] = useState<'saved' | 'itinerary'>('saved');
  const [copied, setCopied] = useState(false);
  const [inspectMusicEvent, setInspectMusicEvent] = useState<LiveMusicEvent | null>(null);

  // Filter saved cultural experiences
  const savedExperiences: SoulExperience[] = useMemo(() => {
    return SOUL_EXPERIENCES.filter((exp) => savedExperienceIds.includes(exp.id));
  }, [savedExperienceIds]);

  // Filter saved music events
  const savedMusicEvents: LiveMusicEvent[] = useMemo(() => {
    return LIVE_MUSIC_EVENTS.filter((evt) => savedMusicEventIds.includes(evt.id));
  }, [savedMusicEventIds]);

  // Generate automated Day-by-Day Itinerary weaving destinations and live concerts
  const generatedItinerary: Array<DayItinerary & { musicEvent?: LiveMusicEvent }> = useMemo(() => {
    const days: Array<DayItinerary & { musicEvent?: LiveMusicEvent }> = [];
    let currentDay = 1;
    const usedMusicEventIds = new Set<string>();

    // 1. Weave saved destinations with matching concerts
    savedItems.forEach((item) => {
      const dest = item.destination;
      const acts = dest.activities;

      // Find any saved music event relevant to this destination
      const matchedMusic = savedMusicEvents.find((e) => {
        if (usedMusicEventIds.has(e.id)) return false;
        const eCity = e.city.toLowerCase();
        const eState = e.state.toLowerCase();
        const dName = dest.name.toLowerCase();
        const dNear = (dest.nearestCity || '').toLowerCase();
        const dState = dest.state.toLowerCase();
        return (
          eCity === dName ||
          (dNear && (eCity === dNear || dNear.includes(eCity))) ||
          eState === dState
        );
      });

      if (matchedMusic) {
        usedMusicEventIds.add(matchedMusic.id);
      }

      // Group activities into morning, afternoon, evening slots
      const daySlots = [
        {
          timeOfDay: 'Morning' as const,
          destinationName: dest.name,
          activityTitle: acts[0]?.title || `Arrive & Check-in at ${dest.name}`,
          activityDescription: acts[0]?.description || `Scenic morning views and local breakfast in ${dest.state}.`,
          estimatedCost: acts[0]?.cost || 200,
        },
        {
          timeOfDay: 'Afternoon' as const,
          destinationName: dest.name,
          activityTitle: acts[1]?.title || `Explore ${dest.highlights[0] || 'Historical Landmark'}`,
          activityDescription: acts[1]?.description || `Immerse in cultural sites and traditional lunch.`,
          estimatedCost: acts[1]?.cost || 400,
        },
        matchedMusic
          ? {
              timeOfDay: 'Evening' as const,
              destinationName: `${matchedMusic.venue}, ${matchedMusic.city}`,
              activityTitle: `🎵 Live Concert: ${matchedMusic.artistOrEventName}`,
              activityDescription: `Attend ${matchedMusic.genre} recital by ${matchedMusic.artist} at ${matchedMusic.venue} (${matchedMusic.time}). Status: ${matchedMusic.status}.`,
              estimatedCost: matchedMusic.priceInr || 500,
            }
          : {
              timeOfDay: 'Evening' as const,
              destinationName: dest.name,
              activityTitle: acts[2]?.title || `Sunset View & Starlight Dinner`,
              activityDescription: acts[2]?.description || `Relaxing evening breeze, regional cuisine, and night stroll.`,
              estimatedCost: acts[2]?.cost || 600,
            },
      ];

      days.push({
        dayNumber: currentDay,
        title: `Day ${currentDay}: Discovering ${dest.name}${matchedMusic ? ` & Live Concert in ${matchedMusic.city}` : ''}`,
        slots: daySlots,
        musicEvent: matchedMusic,
      });

      currentDay += 1;
    });

    // 2. Add dedicated itinerary days for any remaining saved live music events
    savedMusicEvents.forEach((music) => {
      if (usedMusicEventIds.has(music.id)) return;
      usedMusicEventIds.add(music.id);

      days.push({
        dayNumber: currentDay,
        title: `Day ${currentDay}: Live Concert & Cultural Music in ${music.city}`,
        slots: [
          {
            timeOfDay: 'Morning' as const,
            destinationName: music.city,
            activityTitle: `Arrival in ${music.city} & Traditional Breakfast`,
            activityDescription: `Settle in, explore regional breakfast specialties and visit local heritage lanes.`,
            estimatedCost: 250,
          },
          {
            timeOfDay: 'Afternoon' as const,
            destinationName: `${music.venue}, ${music.city}`,
            activityTitle: `Cultural Venue Visit & Pre-Concert Soundcheck`,
            activityDescription: `Visit ${music.venue} in ${music.city}, inspect acoustic hall architecture and nearby cultural cafes.`,
            estimatedCost: 350,
          },
          {
            timeOfDay: 'Evening' as const,
            destinationName: `${music.venue}, ${music.city}`,
            activityTitle: `🎵 Live Performance: ${music.artistOrEventName}`,
            activityDescription: `Headline ${music.genre} concert featuring ${music.artist} (${music.time} on ${music.date}). Status: ${music.status}.`,
            estimatedCost: music.priceInr || 500,
          },
        ],
        musicEvent: music,
      });

      currentDay += 1;
    });

    return days;
  }, [savedItems, savedMusicEvents]);

  // Total Estimated Budget (Destinations + Saved Concerts)
  const totalEstimatedBudget = useMemo(() => {
    const destBudget = savedItems.reduce((sum, item) => sum + item.destination.typicalBudgetPerPerson, 0);
    const musicBudget = savedMusicEvents.reduce((sum, evt) => sum + (evt.priceInr || 0), 0);
    return destBudget + musicBudget;
  }, [savedItems, savedMusicEvents]);

  const handleCopyItinerary = () => {
    soundManager.playTap();
    let text = `🇮🇳 MY BHARATVERSE JOURNEY ITINERARY\nTotal Estimated Budget: ₹${totalEstimatedBudget.toLocaleString('en-IN')}\n\n`;
    generatedItinerary.forEach((day) => {
      text += `--- ${day.title} ---\n`;
      day.slots.forEach((s) => {
        text += `• [${s.timeOfDay}] ${s.activityTitle} (${s.destinationName}) - ₹${s.estimatedCost}\n`;
      });
      if (day.musicEvent) {
        text += `  🎵 Live Concert: ${day.musicEvent.artistOrEventName} (${day.musicEvent.artist}) at ${day.musicEvent.venue} [${day.musicEvent.status}]\n`;
        if (day.musicEvent.bookingOrInfoUrl) {
          text += `     Source/Tickets: ${day.musicEvent.bookingOrInfoUrl}\n`;
        }
      }
      text += `\n`;
    });

    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/25 text-xs font-semibold mb-2">
            <BookmarkCheck className="w-3.5 h-3.5" />
            <span>Personal Travel Planner</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            My Journey & Custom Itinerary
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Review your shortlisted destinations, inspect budgets, and view your automated day-by-day itinerary.
          </p>
        </div>

        {savedItems.length > 0 && (
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-2xl bg-slate-900 border border-slate-800 text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Est. Budget</span>
              <span className="text-base font-black text-amber-300">
                ₹{totalEstimatedBudget.toLocaleString('en-IN')}
              </span>
            </div>

            <button
              onClick={handleCopyItinerary}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold flex items-center gap-2 transition"
            >
              {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied Itinerary!' : 'Copy Itinerary'}</span>
            </button>
          </div>
        )}
      </div>

      {/* EMPTY STATE */}
      {savedItems.length === 0 ? (
        <div className="text-center py-20 px-4 rounded-3xl bg-slate-900/40 border border-slate-800 max-w-xl mx-auto">
          <BookmarkCheck className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white">Your Journey is currently empty</h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
            Click the heart icon on any destination card to bookmark it here and automatically generate a personalized day-by-day travel itinerary.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* TAB SWITCHER */}
          <div className="flex border-b border-slate-800 text-xs font-bold">
            <button
              onClick={() => { soundManager.playTap(); setActiveTab('saved'); }}
              className={`pb-3 px-5 border-b-2 flex items-center gap-2 transition ${
                activeTab === 'saved'
                  ? 'border-amber-400 text-amber-300'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookmarkCheck className="w-4 h-4" />
              <span>Saved Destinations ({savedItems.length})</span>
            </button>
            <button
              onClick={() => { soundManager.playTap(); setActiveTab('itinerary'); }}
              className={`pb-3 px-5 border-b-2 flex items-center gap-2 transition ${
                activeTab === 'itinerary'
                  ? 'border-amber-400 text-amber-300'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Automated Day-by-Day Itinerary ({generatedItinerary.length} Days)</span>
            </button>
          </div>

          {/* TAB 1: SAVED DESTINATIONS LIST */}
          {activeTab === 'saved' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedItems.map((item) => {
                const dest = item.destination;
                return (
                  <div
                    key={dest.id}
                    className="rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/30 overflow-hidden flex flex-col justify-between shadow-xl transition"
                  >
                    <div>
                      <div className="relative h-44 w-full overflow-hidden bg-slate-950">
                        <img
                          src={dest.coverImage}
                          alt={dest.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                        <span className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-950/80 text-amber-400 border border-amber-500/30">
                          {dest.state}
                        </span>
                        <button
                          onClick={() => {
                            soundManager.playTap();
                            onRemoveItem(dest.id);
                          }}
                          className="absolute top-3 right-3 p-2 rounded-full bg-slate-900/80 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition border border-slate-700/60"
                          title="Remove from Journey"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="absolute bottom-3 left-3">
                          <h3 className="text-lg font-black text-white">{dest.name}</h3>
                        </div>
                      </div>

                      <div className="p-4 space-y-3">
                        <div className="flex items-center justify-between text-xs text-slate-300">
                          <span>₹{dest.typicalBudgetPerPerson.toLocaleString('en-IN')} est.</span>
                          <span>{dest.idealDurationDays} Days</span>
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                          {dest.tagline}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 pt-0 grid grid-cols-2 gap-2">
                      <button
                        onClick={() => {
                          soundManager.playTap();
                          onExploreDestination(dest, '3d');
                        }}
                        className="py-2.5 px-2 rounded-xl bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 text-xs font-bold flex items-center justify-center gap-1 transition"
                      >
                        <Box className="w-3.5 h-3.5" />
                        <span>Launch 3D</span>
                      </button>

                      <button
                        onClick={() => {
                          soundManager.playTap();
                          onExploreDestination(dest, 'google-maps');
                        }}
                        className="py-2.5 px-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-sky-300 text-xs font-bold flex items-center justify-center gap-1 border border-sky-500/30 transition"
                      >
                        <MapIcon className="w-3.5 h-3.5 text-sky-400" />
                        <span>Google Maps</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* SAVED CULTURAL EXPERIENCES & WORKSHOPS */}
            <div className="pt-8 border-t border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-lg font-black text-white flex items-center gap-2">
                    <Palette className="w-5 h-5 text-amber-400" />
                    <span>Saved Cultural Experiences & Workshops ({savedExperiences.length})</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Authentic hands-on workshops, culinary hearth meals, and artisan visits added to your trip.
                  </p>
                </div>

                {onOpenSoulOfIndia && (
                  <button
                    onClick={() => {
                      soundManager.playTap();
                      onOpenSoulOfIndia();
                    }}
                    className="px-4 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer self-start sm:self-auto"
                  >
                    <span>Browse Soul of India</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {savedExperiences.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedExperiences.map((exp) => (
                    <div
                      key={exp.id}
                      className="rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/30 overflow-hidden flex flex-col justify-between shadow-xl transition"
                    >
                      <div>
                        <div className="relative h-40 w-full overflow-hidden bg-slate-950">
                          <img
                            src={exp.image}
                            alt={exp.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                          <div className="absolute top-3 left-3 flex items-center gap-1">
                            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-950/80 text-amber-400 border border-amber-500/30">
                              {exp.category}
                            </span>
                            <span className="text-[9px] px-2 py-0.5 rounded-full bg-slate-950/80 text-amber-300/90 border border-amber-500/30 font-semibold">
                              Curated
                            </span>
                          </div>

                          {onRemoveExperience && (
                            <button
                              onClick={() => {
                                soundManager.playTap();
                                onRemoveExperience(exp.id);
                              }}
                              className="absolute top-3 right-3 p-2 rounded-full bg-slate-900/80 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition border border-slate-700/60 cursor-pointer"
                              title="Remove from Journey"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}

                          <div className="absolute bottom-3 left-3 right-3">
                            <h4 className="text-base font-black text-white leading-tight">{exp.title}</h4>
                          </div>
                        </div>

                        <div className="p-4 space-y-2">
                          <div className="flex items-center justify-between text-xs text-slate-300">
                            <span>⏱ {exp.duration}</span>
                            <span className="text-amber-300 font-bold">{exp.priceLevel}</span>
                          </div>
                          <p className="text-xs text-slate-400 line-clamp-2">
                            {exp.tagline}
                          </p>
                          <p className="text-[11px] text-slate-400 flex items-center gap-1 pt-1">
                            <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                            <span>{exp.location}</span>
                          </p>
                        </div>
                      </div>

                      <div className="p-4 pt-0">
                        {onOpenSoulOfIndia && (
                          <button
                            onClick={() => {
                              soundManager.playTap();
                              onOpenSoulOfIndia();
                            }}
                            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
                          >
                            <span>Explore in Soul of India</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 text-center space-y-2">
                  <p className="text-xs text-slate-400">
                    No cultural workshops or maker visits saved yet. Explore the Soul of India layer to add hands-on weaving, pottery, and culinary traditions to your trip!
                  </p>
                  {onOpenSoulOfIndia && (
                    <button
                      onClick={() => {
                        soundManager.playTap();
                        onOpenSoulOfIndia();
                      }}
                      className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs inline-flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Explore Soul of India</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* SAVED LIVE MUSIC & CONCERTS */}
            <div className="pt-8 border-t border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-lg font-black text-white flex items-center gap-2">
                    <Music className="w-5 h-5 text-amber-400" />
                    <span>Saved Live Music & Concerts ({savedMusicEvents.length})</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Indian classical recitals, Sufi qawwalis, folk festivals, and live concerts shortlisted for your travel dates.
                  </p>
                </div>

                {onOpenSoulOfIndia && (
                  <button
                    onClick={() => {
                      soundManager.playTap();
                      onOpenSoulOfIndia();
                    }}
                    className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 transition self-start sm:self-auto cursor-pointer"
                  >
                    <span>Discover More Live Music</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {savedMusicEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {savedMusicEvents.map((evt) => (
                    <div
                      key={evt.id}
                      className="rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/30 overflow-hidden flex flex-col justify-between shadow-xl transition"
                    >
                      <div>
                        <div className="relative h-44 w-full overflow-hidden bg-slate-950">
                          <img
                            src={evt.image}
                            alt={evt.artistOrEventName}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                          
                          <span className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-950/80 text-amber-400 border border-amber-500/30">
                            {evt.city}, {evt.state}
                          </span>

                          {onRemoveMusicEvent && (
                            <button
                              onClick={() => {
                                soundManager.playTap();
                                onRemoveMusicEvent(evt.id);
                              }}
                              className="absolute top-3 right-3 p-2 rounded-full bg-slate-900/80 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition border border-slate-700/60"
                              title="Remove Concert from Journey"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}

                          <div className="absolute bottom-3 left-3 right-3">
                            <span className="text-[10px] font-semibold text-amber-300 bg-slate-950/80 px-2 py-0.5 rounded-md">
                              🎶 {evt.genre}
                            </span>
                            <h4 className="text-base font-black text-white mt-1 line-clamp-1">
                              {evt.artistOrEventName}
                            </h4>
                          </div>
                        </div>

                        <div className="p-4 space-y-2 text-xs">
                          <div className="flex items-center justify-between text-slate-300 font-medium">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5 text-amber-400" />
                              <span>{evt.date}</span>
                            </span>
                            <span className="text-amber-300 font-bold">
                              {evt.price}
                            </span>
                          </div>

                          <p className="text-slate-400 line-clamp-1 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-rose-400 shrink-0" />
                            <span>{evt.venue}</span>
                          </p>
                        </div>
                      </div>

                      <div className="p-4 pt-0 grid grid-cols-2 gap-2">
                        {evt.googleMapsQuery && (
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(evt.googleMapsQuery)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-2 px-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-emerald-400 text-xs font-bold flex items-center justify-center gap-1 border border-emerald-500/30 transition"
                          >
                            <Navigation className="w-3.5 h-3.5" />
                            <span>Directions</span>
                          </a>
                        )}

                        {onOpenSoulOfIndia && (
                          <button
                            onClick={() => {
                              soundManager.playTap();
                              onOpenSoulOfIndia();
                            }}
                            className="py-2 px-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center justify-center gap-1 transition cursor-pointer"
                          >
                            <span>View All Music</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 text-center space-y-2">
                  <p className="text-xs text-slate-400">
                    No live concerts or music events saved yet. Explore the Soul of India Live Music section to discover Carnatic, Hindustani, Sufi, and folk performances!
                  </p>
                  {onOpenSoulOfIndia && (
                    <button
                      onClick={() => {
                        soundManager.playTap();
                        onOpenSoulOfIndia();
                      }}
                      className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs inline-flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <Music className="w-3.5 h-3.5" />
                      <span>Explore Live Music & Concerts</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </>
        )}

          {/* TAB 2: AUTOMATED DAY-BY-DAY ITINERARY */}
          {activeTab === 'itinerary' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-center gap-3 text-xs text-amber-300">
                <Sparkles className="w-4 h-4 shrink-0 text-amber-400" />
                <span>
                  This itinerary is synthesized automatically based on your shortlisted destinations, sequencing recommended morning, afternoon, and evening experiences.
                </span>
              </div>

              {generatedItinerary.map((day) => (
                <div
                  key={day.dayNumber}
                  className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 shadow-xl space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="text-lg font-black text-white flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-amber-400" />
                      {day.title}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {day.slots.map((slot, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md">
                              {slot.timeOfDay}
                            </span>
                            <span className="text-xs font-semibold text-slate-300">
                              {slot.estimatedCost === 0 ? 'Free' : `₹${slot.estimatedCost}`}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-white mb-1">{slot.activityTitle}</h4>
                          <p className="text-xs text-slate-400 leading-relaxed">{slot.activityDescription}</p>
                        </div>
                        <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-amber-400" />
                          <span>{slot.destinationName}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
