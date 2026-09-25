import React from 'react';
import { LiveMusicEvent } from '../types/travel';
import { soundManager } from '../utils/soundEffects';
import {
  X,
  Music,
  User,
  MapPin,
  Calendar,
  Clock,
  Tag,
  Heart,
  ExternalLink,
  Navigation,
  ShieldCheck,
  Sparkles,
  Info
} from 'lucide-react';

interface Props {
  event: LiveMusicEvent | null;
  onClose: () => void;
  onToggleSave?: (event: LiveMusicEvent) => void;
  isSaved?: boolean;
}

export const MusicEventDetailsModal: React.FC<Props> = ({
  event,
  onClose,
  onToggleSave,
  isSaved = false,
}) => {
  if (!event) return null;

  const isVerified = event.status === 'LIVE / VERIFIED';
  const isCurated = event.status === 'CURATED';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-slate-900 border border-amber-500/40 p-5 sm:p-8 shadow-2xl space-y-6 text-left text-slate-100">
        
        {/* MODAL HEADER */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                🎶 {event.genre}
              </span>

              {/* Status Badge */}
              <span
                className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold border flex items-center gap-1 shadow-sm ${
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
                <span>{event.status}</span>
              </span>

              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-950 text-slate-300 border border-slate-700">
                {event.setting}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
              🎵 {event.artistOrEventName}
            </h3>

            <div className="text-xs sm:text-sm font-semibold text-amber-300 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-amber-400" />
              <span>Artist: {event.artist}</span>
            </div>
          </div>

          <button
            onClick={() => {
              soundManager.playTap();
              onClose();
            }}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* EVENT PHOTO */}
        {event.image && (
          <div className="relative h-56 w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
            <img
              src={event.image}
              alt={event.artistOrEventName}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
            
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
              <span className="text-xs font-bold px-3 py-1 rounded-xl bg-slate-950/90 text-amber-300 border border-amber-500/40">
                💰 {event.price}
              </span>
              <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-lg bg-slate-950/80 text-slate-300 border border-slate-800">
                📍 {event.city}, {event.state}
              </span>
            </div>
          </div>
        )}

        {/* KEY DETAILS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Venue & Location</span>
            </span>
            <div className="font-bold text-white text-xs sm:text-sm">{event.venue}</div>
            <div className="text-[11px] text-slate-400">{event.city}, {event.state}</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Schedule & Timing</span>
            </span>
            <div className="font-bold text-white text-xs sm:text-sm">{event.date}</div>
            <div className="text-[11px] text-amber-300 font-mono flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-400" />
              <span>{event.time}</span>
            </div>
          </div>
        </div>

        {/* STATUS EXPLANATION (TRANSPARENCY NOTE) */}
        <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-amber-500/20 text-xs space-y-1">
          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Transparency & Verification Context</span>
          </span>
          <p className="text-slate-300 leading-relaxed font-normal">
            {event.statusExplanation}
          </p>
        </div>

        {/* DESCRIPTION & EXPERIENCE STORY */}
        <div className="space-y-2 text-xs sm:text-sm">
          <h4 className="font-black text-white text-sm">About the Performance & Heritage</h4>
          <p className="text-slate-300 leading-relaxed font-normal">
            {event.description}
          </p>
        </div>

        {/* HIGHLIGHTS */}
        {event.highlights && event.highlights.length > 0 && (
          <div className="space-y-2 pt-1">
            <h5 className="font-bold text-white text-xs uppercase tracking-wider text-amber-400">
              Acoustic Highlights
            </h5>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {event.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold shrink-0">✦</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* AUDIENCE & ORGANIZER */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800 text-[11px] text-slate-400">
          <div>
            <strong>Ideal For:</strong> {event.suitableFor.join(', ')}
          </div>
          {event.organizer && (
            <div>
              <strong>Presented by:</strong> {event.organizer}
            </div>
          )}
        </div>

        {/* MODAL ACTIONS */}
        <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-800">
          {onToggleSave && (
            <button
              onClick={() => {
                soundManager.playTap();
                onToggleSave(event);
              }}
              className={`flex-1 py-3 px-4 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer ${
                isSaved
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30'
                  : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20'
              }`}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-current text-rose-400' : ''}`} />
              <span>{isSaved ? 'Saved in My Journey' : 'Add to My Journey'}</span>
            </button>
          )}

          {event.bookingOrInfoUrl && (
            <a
              href={event.bookingOrInfoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 font-bold text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" />
              <span>View Source</span>
            </a>
          )}

          {event.googleMapsQuery && (
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.googleMapsQuery)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition cursor-pointer"
            >
              <Navigation className="w-3.5 h-3.5 text-sky-400" />
              <span>Google Maps</span>
            </a>
          )}

          <button
            onClick={() => {
              soundManager.playTap();
              onClose();
            }}
            className="py-3 px-5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs sm:text-sm font-semibold transition cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
