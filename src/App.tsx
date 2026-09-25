/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Destination, UserPreferences, SavedJourneyItem, SoulExperience, LiveMusicEvent } from './types/travel';
import { DESTINATIONS } from './data/destinations';
import { rankDestinations } from './utils/recommendationEngine';
import { soundManager } from './utils/soundEffects';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PreferenceForm } from './components/PreferenceForm';
import { RecommendationList } from './components/RecommendationList';
import { DestinationModal } from './components/DestinationModal';
import { MyJourney } from './components/MyJourney';
import { ExploreIndiaMap } from './components/ExploreIndiaMap';
import { AIAssistantModal } from './components/AIAssistantModal';
import { GooglePlacesWebsite } from './components/GooglePlacesWebsite';
import { UnderratedGemsView } from './components/UnderratedGemsView';
import { ExperienceSoulOfIndiaView } from './components/ExperienceSoulOfIndiaView';

import { Sparkles, Heart, Compass, CheckCircle2, Bot, MessageSquare } from 'lucide-react';

const DEFAULT_PREFERENCES: UserPreferences = {
  startingLocation: 'Hyderabad',
  maxBudget: 5000,
  durationDays: 2,
  travelGroup: 'Friends',
  interests: ['Nature & Hills', 'Spiritual & Sacred'],
  maxDistanceKm: 400,
  accessibilityRequired: false,
};

export default function App() {
  const [activeView, setActiveView] = useState<'discover' | 'soul-of-india' | 'underrated' | 'map' | 'google-places' | 'journey'>('discover');
  const [preferences, setPreferences] = useState<UserPreferences>(DEFAULT_PREFERENCES);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [modalInitialTab, setModalInitialTab] = useState<'3d' | 'local-bharat' | 'google-maps'>('3d');
  const [googlePlacesQuery, setGooglePlacesQuery] = useState<string>('Ananthagiri Hills Vikarabad');
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [aiChatPrompt, setAiChatPrompt] = useState<string | undefined>(undefined);
  const [isLoadingNLP, setIsLoadingNLP] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Saved experiences in localStorage
  const [savedExperienceIds, setSavedExperienceIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('bharatverse_saved_experiences');
      if (stored) return JSON.parse(stored);
    } catch {}
    return ['exp-pochampally-ikat-weaving'];
  });

  // Sync saved experiences to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bharatverse_saved_experiences', JSON.stringify(savedExperienceIds));
    } catch {}
  }, [savedExperienceIds]);

  const handleToggleSaveExperience = (exp: SoulExperience) => {
    soundManager.playTap();
    setSavedExperienceIds((prev) => {
      const exists = prev.includes(exp.id);
      const updated = exists ? prev.filter((id) => id !== exp.id) : [...prev, exp.id];
      showToast(exists ? `Removed "${exp.title}" from My Journey.` : `Saved "${exp.title}" to My Journey!`);
      return updated;
    });
  };

  // Saved music events in localStorage
  const [savedMusicEventIds, setSavedMusicEventIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('bharatverse_saved_music_events');
      if (stored) return JSON.parse(stored);
    } catch {}
    return ['music-margazhi-carnatic-chennai'];
  });

  // Sync saved music events to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bharatverse_saved_music_events', JSON.stringify(savedMusicEventIds));
    } catch {}
  }, [savedMusicEventIds]);

  const handleToggleSaveMusicEvent = (evt: LiveMusicEvent) => {
    soundManager.playTap();
    setSavedMusicEventIds((prev) => {
      const exists = prev.includes(evt.id);
      const updated = exists ? prev.filter((id) => id !== evt.id) : [...prev, evt.id];
      showToast(exists ? `Removed "${evt.artistOrEventName}" from My Journey.` : `Saved "${evt.artistOrEventName}" to My Journey!`);
      return updated;
    });
  };

  // Saved destinations in localStorage
  const [savedItems, setSavedItems] = useState<SavedJourneyItem[]>(() => {
    try {
      const stored = localStorage.getItem('bharatverse_saved_journey');
      if (stored) return JSON.parse(stored);
    } catch {
      // ignore
    }
    // Default initial seed with Ananthagiri Hills for immediate showcase
    const ananthagiri = DESTINATIONS.find((d) => d.id === 'ananthagiri-hills');
    return ananthagiri
      ? [
          {
            destinationId: ananthagiri.id,
            destination: ananthagiri,
            savedAt: new Date().toISOString(),
            selectedActivities: ['act-1', 'act-2', 'act-3'],
          },
        ]
      : [];
  });

  // Sync saved items to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bharatverse_saved_journey', JSON.stringify(savedItems));
    } catch {
      // ignore
    }
  }, [savedItems]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  // Deterministic Recommendations
  const rankedResults = useMemo(() => {
    return rankDestinations(preferences, DESTINATIONS, 6);
  }, [preferences]);

  // Toggle Save Destination
  const handleToggleSave = (dest: Destination) => {
    soundManager.playTap();
    setSavedItems((prev) => {
      const exists = prev.some((item) => item.destinationId === dest.id);
      if (exists) {
        showToast(`Removed ${dest.name} from My Journey.`);
        return prev.filter((item) => item.destinationId !== dest.id);
      } else {
        showToast(`Saved ${dest.name} to My Journey!`);
        return [
          ...prev,
          {
            destinationId: dest.id,
            destination: dest,
            savedAt: new Date().toISOString(),
            selectedActivities: dest.activities.slice(0, 2).map((a) => a.id),
          },
        ];
      }
    });
  };

  // Remove Item from Journey
  const handleRemoveFromJourney = (destinationId: string) => {
    soundManager.playTap();
    setSavedItems((prev) => prev.filter((i) => i.destinationId !== destinationId));
    showToast('Destination removed from your journey.');
  };

  // Add Specific Activity to Journey
  const handleAddActivityToJourney = (dest: Destination, activityId: string) => {
    soundManager.playTap();
    setSavedItems((prev) => {
      const existing = prev.find((i) => i.destinationId === dest.id);
      if (existing) {
        const hasAct = existing.selectedActivities.includes(activityId);
        const updatedActs = hasAct
          ? existing.selectedActivities.filter((id) => id !== activityId)
          : [...existing.selectedActivities, activityId];

        showToast(hasAct ? 'Activity removed from itinerary.' : 'Activity added to your itinerary!');
        return prev.map((item) =>
          item.destinationId === dest.id ? { ...item, selectedActivities: updatedActs } : item
        );
      } else {
        showToast(`Added ${dest.name} and activity to your itinerary!`);
        return [
          ...prev,
          {
            destinationId: dest.id,
            destination: dest,
            savedAt: new Date().toISOString(),
            selectedActivities: [activityId],
          },
        ];
      }
    });
  };

  // Handle Natural Language Query (Phase 7 - A)
  const handleNaturalLanguageQuery = async (queryText: string) => {
    setIsLoadingNLP(true);
    try {
      const res = await fetch('/api/extract-preferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: queryText }),
      });

      if (!res.ok) throw new Error('NLP extraction request failed');

      const extracted = await res.json();
      const updatedPrefs: UserPreferences = {
        startingLocation: extracted.startingLocation || preferences.startingLocation,
        maxBudget: Number(extracted.maxBudget) || preferences.maxBudget,
        durationDays: Number(extracted.durationDays) || preferences.durationDays,
        travelGroup: extracted.travelGroup || preferences.travelGroup,
        interests: Array.isArray(extracted.interests) && extracted.interests.length > 0
          ? extracted.interests
          : preferences.interests,
        maxDistanceKm: Number(extracted.maxDistanceKm) || preferences.maxDistanceKm,
        accessibilityRequired: Boolean(extracted.accessibilityRequired),
      };

      setPreferences(updatedPrefs);
      setActiveView('discover');
      showToast(`Matched destinations for "${updatedPrefs.startingLocation}" within ₹${updatedPrefs.maxBudget.toLocaleString('en-IN')}`);

      // Smooth scroll to recommendations
      setTimeout(() => {
        const resultsEl = document.getElementById('results-section');
        if (resultsEl) {
          resultsEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 250);
    } catch (err) {
      console.warn('NLP fallback applied:', err);
      showToast('Found top recommendations matching your query.');
    } finally {
      setIsLoadingNLP(false);
    }
  };

  // Scroll to preferences
  const handleStartExploring = () => {
    const el = document.getElementById('preferences-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Submit custom preferences from form
  const handlePreferenceSubmit = (newPrefs: UserPreferences) => {
    setPreferences(newPrefs);
    showToast('Preferences updated! Ranked top matches below.');
    setTimeout(() => {
      const el = document.getElementById('results-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 200);
  };

  // Open destination modal
  const handleExploreDestination = (dest: Destination, initialTab: '3d' | 'local-bharat' | 'google-maps' = '3d') => {
    soundManager.playTap();
    setModalInitialTab(initialTab);
    setSelectedDestination(dest);
  };

  // Open Google Places Website view
  const handleOpenGooglePlaces = (query?: string) => {
    soundManager.playTap();
    if (query) {
      setGooglePlacesQuery(query);
    }
    setActiveView('google-places');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open AI chat with optional query
  const handleOpenAIChat = (prompt?: string) => {
    soundManager.playTap();
    setAiChatPrompt(prompt);
    setIsAIChatOpen(true);
  };

  const savedActivityIdsForSelected = useMemo(() => {
    if (!selectedDestination) return [];
    const item = savedItems.find((i) => i.destinationId === selectedDestination.id);
    return item ? item.selectedActivities : [];
  }, [selectedDestination, savedItems]);

  const isSelectedSaved = useMemo(() => {
    if (!selectedDestination) return false;
    return savedItems.some((i) => i.destinationId === selectedDestination.id);
  }, [selectedDestination, savedItems]);

  const selectedMatch = useMemo(() => {
    if (!selectedDestination) return undefined;
    return rankedResults.find((r) => r.destination.id === selectedDestination.id);
  }, [selectedDestination, rankedResults]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* NAVBAR */}
      <Navbar
        activeView={activeView}
        onChangeView={setActiveView}
        savedCount={savedItems.length + savedExperienceIds.length + savedMusicEventIds.length}
        onOpenAIModal={() => handleOpenAIChat()}
        onScrollToPreferences={handleStartExploring}
      />

      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed bottom-24 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-slate-900/95 text-white text-xs font-semibold border border-amber-500/40 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* FLOATING GEMINI CHATBOT ACTION BUTTON */}
      <button
        onClick={() => handleOpenAIChat()}
        className="fixed bottom-6 right-6 z-40 px-4 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-2xl shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 border border-amber-300/40 cursor-pointer group"
        title="Ask Bharatverse Gemini Chatbot"
      >
        <div className="relative">
          <div className="w-8 h-8 rounded-xl bg-slate-950 flex items-center justify-center text-amber-400 shadow-md">
            <Bot className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
          </div>
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-950 animate-ping" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-950" />
        </div>
        <div className="flex flex-col text-left">
          <span className="leading-tight font-extrabold flex items-center gap-1 text-slate-950">
            Ask Bharatverse AI
            <Sparkles className="w-3.5 h-3.5 text-slate-950 fill-current" />
          </span>
          <span className="text-[10px] text-slate-900/80 font-semibold">
            Gemini 2.5 Flash • Maps Grounded
          </span>
        </div>
      </button>

      {/* MAIN VIEW CONTENT */}
      <main className="flex-1">
        {activeView === 'discover' && (
          <>
            {/* HERO SECTION */}
            <Hero
              onStartExploring={handleStartExploring}
              onNaturalLanguageQuery={handleNaturalLanguageQuery}
              isLoadingNLP={isLoadingNLP}
              onOpenGooglePlaces={() => handleOpenGooglePlaces('Ananthagiri Hills Vikarabad')}
              onOpenUnderratedGems={() => {
                soundManager.playTap();
                setActiveView('underrated');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenSoulOfIndia={() => {
                soundManager.playTap();
                setActiveView('soul-of-india');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* PREFERENCE ARCHITECT FORM */}
            <PreferenceForm
              initialPreferences={preferences}
              onSubmit={handlePreferenceSubmit}
            />

            {/* RECOMMENDATION RESULTS */}
            <RecommendationList
              results={rankedResults}
              onExploreDestination={handleExploreDestination}
              savedDestinationIds={savedItems.map((i) => i.destinationId)}
              onToggleSave={handleToggleSave}
              onModifyPreferences={handleStartExploring}
            />
          </>
        )}

        {activeView === 'soul-of-india' && (
          <ExperienceSoulOfIndiaView
            userPreferences={preferences}
            onExploreDestination={(dest, initialTab) => handleExploreDestination(dest, initialTab || '3d')}
            onSaveExperience={handleToggleSaveExperience}
            savedExperienceIds={savedExperienceIds}
            onOpenAIChat={handleOpenAIChat}
            onSaveMusicEvent={handleToggleSaveMusicEvent}
            savedMusicEventIds={savedMusicEventIds}
          />
        )}

        {activeView === 'underrated' && (
          <UnderratedGemsView
            destinations={DESTINATIONS}
            onExploreDestination={handleExploreDestination}
          />
        )}

        {activeView === 'map' && (
          <ExploreIndiaMap
            onExploreDestination={handleExploreDestination}
            startingCity={preferences.startingLocation}
          />
        )}

        {activeView === 'google-places' && (
          <GooglePlacesWebsite
            initialSearchQuery={googlePlacesQuery}
            onExploreIn3D={(dest) => handleExploreDestination(dest, '3d')}
            onAddToJourney={(dest) => handleToggleSave(dest)}
            savedDestinationIds={savedItems.map((i) => i.destinationId)}
          />
        )}

        {activeView === 'journey' && (
          <MyJourney
            savedItems={savedItems}
            onRemoveItem={handleRemoveFromJourney}
            onExploreDestination={handleExploreDestination}
            savedExperienceIds={savedExperienceIds}
            onRemoveExperience={(id) => handleToggleSaveExperience({ id, title: 'Experience' } as any)}
            savedMusicEventIds={savedMusicEventIds}
            onRemoveMusicEvent={(id) => setSavedMusicEventIds((prev) => prev.filter((item) => item !== id))}
            onOpenSoulOfIndia={() => {
              soundManager.playTap();
              setActiveView('soul-of-india');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* DESTINATION 3D & DETAILS MODAL */}
      {selectedDestination && (
        <DestinationModal
          destination={selectedDestination}
          userPreferences={preferences}
          matchScore={selectedMatch ? selectedMatch.matchScore : 95}
          matchReason={selectedMatch?.reason}
          initialTab={modalInitialTab}
          onClose={() => setSelectedDestination(null)}
          isSaved={isSelectedSaved}
          onToggleSave={handleToggleSave}
          onAddActivityToJourney={handleAddActivityToJourney}
          onSaveExperience={handleToggleSaveExperience}
          savedExperienceIds={savedExperienceIds}
          savedActivityIds={savedActivityIdsForSelected}
          onOpenAIChat={handleOpenAIChat}
          onOpenGooglePlacesWebsite={handleOpenGooglePlaces}
          onSaveMusicEvent={handleToggleSaveMusicEvent}
          savedMusicEventIds={savedMusicEventIds}
        />
      )}

      {/* BHARATVERSE AI CONCIERGE CHAT MODAL */}
      {isAIChatOpen && (
        <AIAssistantModal
          onClose={() => setIsAIChatOpen(false)}
          currentDestination={selectedDestination || undefined}
          userPreferences={preferences}
          initialPrompt={aiChatPrompt}
          onOpenGooglePlacesWebsite={handleOpenGooglePlaces}
        />
      )}

      {/* FOOTER */}
      <footer className="w-full border-t border-slate-900 bg-slate-950/80 py-10 px-4 sm:px-6 mt-16 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-400">
            <Compass className="w-4 h-4 text-amber-400" />
            <span className="font-bold text-slate-300">Bharatverse</span>
            <span>— Discover Your India in 3D</span>
          </div>
          <p className="text-slate-500 text-[11px]">
            Conceptual 3D Visualizations. Geometries are artistic spatial representations.
          </p>
          <div className="text-[11px] text-slate-400">
            Atithi Devo Bhava • Indian Heritage & Travel AI
          </div>
        </div>
      </footer>
    </div>
  );
}
