/// <reference types="@types/google.maps" />
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { DESTINATIONS, MAJOR_CITIES } from '../data/destinations';
import { Destination } from '../types/travel';
import { loadGoogleMaps } from '../utils/googleMapsLoader';
import { soundManager } from '../utils/soundEffects';
import {
  MapPin,
  Sparkles,
  Compass,
  Box,
  Layers,
  Info,
  Map as MapIcon,
  Navigation,
  ExternalLink,
  ChevronRight,
  ShoppingBag,
  Clock,
  Car,
  Maximize2,
  Minimize2,
  RefreshCw,
  Eye
} from 'lucide-react';

interface Props {
  onExploreDestination: (destination: Destination, initialTab?: '3d' | 'local-bharat' | 'google-maps') => void;
  startingCity?: string;
}

const DARK_MAP_STYLE = [
  { elementType: 'geometry', stylers: [{ color: '#0b0f19' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#020617' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#94a3b8' }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#f59e0b' }],
  },
  {
    featureType: 'administrative.country',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#d97706' }, { weight: 1.5 }],
  },
  {
    featureType: 'administrative.province',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#334155' }, { weight: 0.8 }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#cbd5e1' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#132a24' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#1e293b' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#0f172a' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#475569' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#1e293b' }],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#1e293b' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#031428' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#38bdf8' }],
  },
];

const REGION_BOUNDS: Record<string, { lat: number; lng: number; zoom: number }> = {
  All: { lat: 21.7679, lng: 79.5, zoom: 5 },
  South: { lat: 14.5, lng: 77.8, zoom: 6.2 },
  North: { lat: 30.5, lng: 77.5, zoom: 6.2 },
  West: { lat: 25.5, lng: 72.8, zoom: 6.2 },
  East: { lat: 24.5, lng: 86.8, zoom: 6.2 },
  Central: { lat: 20.8, lng: 79.5, zoom: 6.2 },
};

export const ExploreIndiaMap: React.FC<Props> = ({
  onExploreDestination,
  startingCity = 'Hyderabad',
}) => {
  const [viewMode, setViewMode] = useState<'google-map' | 'spatial-grid'>('google-map');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activePin, setActivePin] = useState<Destination>(DESTINATIONS[0]);
  const [mapType, setMapType] = useState<'dark' | 'terrain' | 'satellite' | 'roadmap'>('dark');
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const polylineRef = useRef<any>(null);

  // Region categorization helper
  const getRegion = (dest: Destination): 'North' | 'South' | 'West' | 'East' | 'Central' => {
    if (dest.coordinates.lat < 16) return 'South';
    if (dest.coordinates.lat > 27) return 'North';
    if (dest.coordinates.lng > 86) return 'East';
    if (dest.coordinates.lng < 74) return 'West';
    return 'Central';
  };

  const filteredDestinations = useMemo(() => {
    return DESTINATIONS.filter((d) => {
      if (selectedRegion !== 'All') {
        const r = getRegion(d);
        if (r !== selectedRegion) return false;
      }
      if (selectedCategory !== 'All' && !d.categories.includes(selectedCategory as any)) {
        return false;
      }
      return true;
    });
  }, [selectedRegion, selectedCategory]);

  // Normalized coordinate projection for schematic grid fallback
  const projectCoords = (lat: number, lng: number): { x: number; y: number } => {
    const minLat = 7.5;
    const maxLat = 35.5;
    const minLng = 67.5;
    const maxLng = 95.5;

    const x = ((lng - minLng) / (maxLng - minLng)) * 82 + 9;
    const y = ((maxLat - lat) / (maxLat - minLat)) * 82 + 9;
    return { x: Math.max(8, Math.min(92, x)), y: Math.max(8, Math.min(92, y)) };
  };

  // Starting location coordinate
  const startCoords = MAJOR_CITIES[startingCity] || MAJOR_CITIES['Hyderabad'];

  // Initialize Google Maps instance
  useEffect(() => {
    let isCancelled = false;

    if (viewMode !== 'google-map') return;

    loadGoogleMaps()
      .then((googleMaps) => {
        if (isCancelled || !mapContainerRef.current) return;

        const defaultRegion = REGION_BOUNDS[selectedRegion] || REGION_BOUNDS.All;

        if (!mapInstanceRef.current) {
          const map = new googleMaps.Map(mapContainerRef.current, {
            center: { lat: defaultRegion.lat, lng: defaultRegion.lng },
            zoom: defaultRegion.zoom,
            mapTypeId: mapType === 'dark' ? 'roadmap' : mapType,
            styles: mapType === 'dark' ? DARK_MAP_STYLE : undefined,
            disableDefaultUI: false,
            zoomControl: true,
            mapTypeControl: false,
            scaleControl: true,
            streetViewControl: false,
            rotateControl: true,
            fullscreenControl: true,
            backgroundColor: '#0b0f19',
          });

          mapInstanceRef.current = map;
        }

        setIsMapLoaded(true);
      })
      .catch((err) => {
        console.warn('Google Maps initialization failed in ExploreIndiaMap:', err);
        if (!isCancelled) {
          setMapError('Interactive map loading fallback active.');
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [viewMode]);

  // Update map type and styles
  useEffect(() => {
    if (!mapInstanceRef.current || !(window as any).google?.maps) return;

    if (mapType === 'dark') {
      mapInstanceRef.current.setMapTypeId('roadmap');
      mapInstanceRef.current.setOptions({ styles: DARK_MAP_STYLE });
    } else {
      mapInstanceRef.current.setMapTypeId(mapType);
      mapInstanceRef.current.setOptions({ styles: null });
    }
  }, [mapType]);

  // Render markers and polyline when filtered destinations change or active pin changes
  useEffect(() => {
    const google = (window as any).google;
    if (!mapInstanceRef.current || !google?.maps) return;

    // Clear existing markers
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];

    // Create marker for start city (Hub)
    const hubMarker = new google.maps.Marker({
      position: { lat: startCoords.lat, lng: startCoords.lng },
      map: mapInstanceRef.current,
      title: `Origin Hub: ${startingCity}`,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 7,
        fillColor: '#38bdf8',
        fillOpacity: 0.95,
        strokeColor: '#0284c7',
        strokeWeight: 2,
      },
      zIndex: 5,
    });
    markersRef.current.push(hubMarker);

    // Create markers for filtered destinations
    filteredDestinations.forEach((dest) => {
      const isSelected = activePin?.id === dest.id;

      // Custom SVG Marker Icon with gold/amber styling
      const markerIcon = {
        path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z',
        fillColor: isSelected ? '#fbbf24' : '#f59e0b',
        fillOpacity: 1,
        strokeColor: isSelected ? '#ffffff' : '#78350f',
        strokeWeight: isSelected ? 2.5 : 1.2,
        scale: isSelected ? 1.6 : 1.2,
        anchor: new google.maps.Point(12, 22),
      };

      const marker = new google.maps.Marker({
        position: { lat: dest.coordinates.lat, lng: dest.coordinates.lng },
        map: mapInstanceRef.current,
        title: `${dest.name} (${dest.state})`,
        icon: markerIcon,
        zIndex: isSelected ? 99 : 10,
        animation: isSelected ? google.maps.Animation.BOUNCE : undefined,
      });

      if (isSelected) {
        setTimeout(() => {
          marker.setAnimation(null);
        }, 1400);
      }

      marker.addListener('click', () => {
        soundManager.playChime();
        setActivePin(dest);
        mapInstanceRef.current?.panTo({ lat: dest.coordinates.lat, lng: dest.coordinates.lng });
      });

      markersRef.current.push(marker);
    });

    // Draw route polyline from start city to active destination
    if (polylineRef.current) {
      polylineRef.current.setMap(null);
      polylineRef.current = null;
    }

    if (activePin) {
      polylineRef.current = new google.maps.Polyline({
        path: [
          { lat: startCoords.lat, lng: startCoords.lng },
          { lat: activePin.coordinates.lat, lng: activePin.coordinates.lng },
        ],
        geodesic: true,
        strokeColor: '#f59e0b',
        strokeOpacity: 0.75,
        strokeWeight: 2.5,
        map: mapInstanceRef.current,
      });
    }
  }, [filteredDestinations, activePin, startCoords, startingCity]);

  // Handle region button clicks to smooth pan/zoom
  const handleRegionClick = (region: string) => {
    soundManager.playTap();
    setSelectedRegion(region);

    if (mapInstanceRef.current) {
      const target = REGION_BOUNDS[region] || REGION_BOUNDS.All;
      mapInstanceRef.current.panTo({ lat: target.lat, lng: target.lng });
      mapInstanceRef.current.setZoom(target.zoom);
    }
  };

  // Center on active pin
  const handleCenterOnPin = (dest: Destination) => {
    soundManager.playTap();
    setActivePin(dest);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.panTo({ lat: dest.coordinates.lat, lng: dest.coordinates.lng });
      mapInstanceRef.current.setZoom(7.5);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 animate-in fade-in duration-300">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/25 text-xs font-semibold mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>Interactive Cartography & Spatial Discovery</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Explore India Spatial Canvas
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Pan-India geographic discovery powered by Google Maps JavaScript Platform. 
            Navigate across regional coordinates, inspect topographies, and launch 3D virtual landscapes.
          </p>
        </div>

        {/* VIEW MODE & API BADGE */}
        <div className="flex flex-wrap items-center gap-2 self-start md:self-end">
          <div className="flex items-center p-1 rounded-2xl bg-slate-900 border border-slate-800">
            <button
              onClick={() => {
                soundManager.playTap();
                setViewMode('google-map');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                viewMode === 'google-map'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span>Google Maps</span>
            </button>
            <button
              onClick={() => {
                soundManager.playTap();
                setViewMode('spatial-grid');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                viewMode === 'spatial-grid'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Spatial Grid</span>
            </button>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Maps API Active</span>
          </div>
        </div>
      </div>

      {/* FILTER BAR: REGIONS & CATEGORIES */}
      <div className="space-y-3 mb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">Region:</span>
          {['All', 'South', 'North', 'West', 'East', 'Central'].map((reg) => (
            <button
              key={reg}
              onClick={() => handleRegionClick(reg)}
              className={`text-xs px-3 py-1.5 rounded-xl border transition cursor-pointer ${
                selectedRegion === reg
                  ? 'bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-md shadow-amber-500/10'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border-slate-700/60'
              }`}
            >
              {reg === 'All' ? '🇮🇳 Pan-India' : reg}
            </button>
          ))}

          {/* MAP TYPE TOGGLES (WHEN IN GOOGLE MAP VIEW) */}
          {viewMode === 'google-map' && (
            <div className="ml-auto flex items-center gap-1 p-1 bg-slate-900/90 rounded-xl border border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 px-2 uppercase">Theme:</span>
              {(['dark', 'terrain', 'satellite', 'roadmap'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    soundManager.playTap();
                    setMapType(type);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold capitalize transition ${
                    mapType === type
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {type === 'dark' ? 'Night Canvas' : type}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* CATEGORY FILTER CHIPS */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">Category:</span>
          {['All', 'Nature & Hills', 'Heritage & History', 'Spiritual & Sacred', 'Coastal & Beaches'].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundManager.playTap();
                setSelectedCategory(cat);
              }}
              className={`text-[11px] px-2.5 py-1 rounded-lg border transition cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-amber-400/20 text-amber-300 font-bold border-amber-400/50'
                  : 'bg-slate-900/50 hover:bg-slate-800 text-slate-400 border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
          <span className="ml-auto text-[11px] text-slate-500 font-medium">
            Showing {filteredDestinations.length} destinations
          </span>
        </div>
      </div>

      {/* MAIN SPATIAL GRID & INTERACTIVE PREVIEW SPLIT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT: MAP CONTAINER (7 COLS) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* VIEW: GOOGLE MAPS PLATFORM */}
          {viewMode === 'google-map' ? (
            <div className="relative h-[520px] sm:h-[600px] rounded-3xl bg-slate-950 border border-amber-500/25 overflow-hidden shadow-2xl">
              
              {/* Google Maps Canvas */}
              <div ref={mapContainerRef} className="w-full h-full" />

              {/* Map Loading State */}
              {!isMapLoaded && (
                <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
                  <div className="w-8 h-8 rounded-full border-2 border-amber-500 border-t-transparent animate-spin" />
                  <span className="text-xs font-bold text-slate-300">
                    Loading High-Fidelity Google Maps Canvas...
                  </span>
                </div>
              )}

              {/* Compass / Watermark Floating Tag */}
              <div className="absolute top-4 right-4 pointer-events-none p-2 rounded-xl bg-slate-950/85 backdrop-blur-md border border-amber-500/30 text-right shadow-xl">
                <div className="flex items-center justify-end gap-1 text-[11px] font-black text-amber-400">
                  <Compass className="w-3.5 h-3.5" />
                  <span>BHARAT SPATIAL</span>
                </div>
                <span className="text-[10px] text-slate-400 block font-mono">
                  {activePin ? `${activePin.coordinates.lat.toFixed(2)}°N, ${activePin.coordinates.lng.toFixed(2)}°E` : 'India'}
                </span>
              </div>

              {/* Bottom Quick-Switch Bar for Filtered Destinations */}
              <div className="absolute bottom-4 left-4 right-4 bg-slate-950/90 backdrop-blur-xl border border-slate-800 p-2.5 rounded-2xl flex items-center gap-2 overflow-x-auto scrollbar-none shadow-2xl">
                <span className="text-[10px] font-bold text-amber-400 shrink-0 uppercase tracking-wider pl-1">
                  Pins:
                </span>
                {filteredDestinations.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => handleCenterOnPin(d)}
                    className={`text-xs px-2.5 py-1 rounded-xl whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
                      activePin?.id === d.id
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                        : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                    }`}
                  >
                    <MapPin className="w-3 h-3 shrink-0" />
                    <span>{d.name}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* VIEW: SCHEMATIC SPATIAL GRID */
            <div className="relative h-[520px] sm:h-[600px] rounded-3xl bg-slate-950/85 border border-amber-500/25 p-4 overflow-hidden shadow-2xl backdrop-blur-xl">
              {/* Subtle Schematic Grid Lines & Coordinates */}
              <div className="absolute inset-0 bg-[radial-gradient(rgba(245,158,11,0.06)_1px,transparent_1px)] [background-size:24px_24px]" />
              
              {/* Compass Rose */}
              <div className="absolute top-4 right-4 pointer-events-none opacity-40 flex flex-col items-center">
                <span className="text-[10px] font-bold text-amber-400">N</span>
                <Compass className="w-8 h-8 text-amber-400" />
                <span className="text-[9px] text-slate-400">BHARAT</span>
              </div>

              {/* Regional Quadrant Watermarks */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 text-xs font-black tracking-widest text-slate-800 pointer-events-none uppercase">
                Himalayan & Northern Ranges
              </div>
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs font-black tracking-widest text-slate-800 pointer-events-none uppercase">
                Peninsular & Southern Ghats
              </div>

              {/* PLACED DESTINATION PINS */}
              {filteredDestinations.map((dest) => {
                const { x, y } = projectCoords(dest.coordinates.lat, dest.coordinates.lng);
                const isSelected = activePin?.id === dest.id;

                return (
                  <div
                    key={dest.id}
                    style={{ left: `${x}%`, top: `${y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-10 group"
                  >
                    <button
                      onClick={() => {
                        soundManager.playChime();
                        setActivePin(dest);
                      }}
                      className={`relative p-1.5 rounded-full transition-all duration-300 transform group-hover:scale-125 cursor-pointer ${
                        isSelected
                          ? 'bg-amber-400 text-slate-950 scale-125 ring-4 ring-amber-400/30'
                          : 'bg-slate-900/90 text-amber-400 hover:bg-amber-500 hover:text-slate-950 border border-amber-500/40'
                      }`}
                      title={dest.name}
                    >
                      <MapPin className="w-3.5 h-3.5 fill-current" />
                      {isSelected && (
                        <span className="absolute -inset-1 rounded-full bg-amber-400/40 animate-ping" />
                      )}
                    </button>

                    {/* Pin Tooltip */}
                    <div className="hidden sm:block absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 whitespace-nowrap px-2 py-0.5 rounded-md bg-slate-900/95 text-[10px] font-bold text-slate-200 border border-slate-700 pointer-events-none opacity-0 group-hover:opacity-100 transition shadow-lg">
                      {dest.name}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ORIGIN HUB INDICATOR */}
          <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <Navigation className="w-4 h-4 text-sky-400" />
              <span>Route Origin: <strong className="text-white">{startingCity}</strong> ({startCoords.lat.toFixed(2)}°N, {startCoords.lng.toFixed(2)}°E)</span>
            </div>
            <span className="text-[11px] text-amber-400">
              Yellow line indicates geodesic flight/drive trajectory
            </span>
          </div>
        </div>

        {/* RIGHT: SELECTED DESTINATION PREVIEW & ACTION DOCK (5 COLS) */}
        <div className="lg:col-span-5">
          {activePin ? (
            <div className="rounded-3xl bg-slate-900/90 border border-amber-500/30 overflow-hidden shadow-2xl p-6 space-y-5 animate-in fade-in duration-300">
              
              {/* COVER PHOTO & TITLE HEADER */}
              <div className="relative h-52 w-full rounded-2xl overflow-hidden bg-slate-950">
                <img
                  src={activePin.coverImage}
                  alt={activePin.name}
                  className="w-full h-full object-cover transition duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-950/85 text-amber-400 border border-amber-500/30 backdrop-blur-md">
                    {activePin.state}
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-950/80 text-sky-300 border border-sky-500/30 backdrop-blur-md">
                    {getRegion(activePin)} India
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-2xl font-black text-white leading-tight">{activePin.name}</h3>
                  <p className="text-xs text-slate-300 line-clamp-1 mt-0.5">{activePin.tagline}</p>
                </div>
              </div>

              {/* STATS: BUDGET, DURATION, COORDINATES */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                  <span className="text-slate-400 text-[10px] block">Typical Budget</span>
                  <span className="text-sm font-bold text-emerald-400 mt-0.5 block">
                    ₹{activePin.typicalBudgetPerPerson.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                  <span className="text-slate-400 text-[10px] block">Ideal Duration</span>
                  <span className="text-sm font-bold text-white mt-0.5 block">
                    {activePin.idealDurationDays}D / {activePin.idealDurationDays - 1}N
                  </span>
                </div>

                <div className="col-span-2 sm:col-span-1 p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                  <span className="text-slate-400 text-[10px] block">Hub Distance</span>
                  <span className="text-sm font-bold text-amber-300 mt-0.5 block">
                    ~{activePin.distanceFromNearestCityKm} km
                  </span>
                </div>
              </div>

              {/* OVERVIEW & HIGHLIGHTS */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Destination Highlights
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {activePin.highlights.slice(0, 3).map((h, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-amber-400 font-bold">✦</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* INTERACTIVE ACTION BUTTONS */}
              <div className="space-y-2 pt-2">
                {/* 1. Launch 3D Experience */}
                <button
                  onClick={() => {
                    soundManager.playTap();
                    onExploreDestination(activePin, '3d');
                  }}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 transition cursor-pointer"
                >
                  <Box className="w-4 h-4" />
                  <span>Launch Interactive 3D Spatial Scene</span>
                </button>

                {/* 2. Experience Bharat Locally */}
                <button
                  onClick={() => {
                    soundManager.playTap();
                    onExploreDestination(activePin, 'local-bharat');
                  }}
                  className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-orange-500/15 to-amber-500/15 hover:from-amber-500/25 hover:to-orange-500/25 text-amber-300 hover:text-white border border-amber-500/40 font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-amber-400" />
                  <span>Experience Bharat Locally (Stay • Eat • Meet • Shop)</span>
                </button>

                {/* 3. View Google Maps & Places */}
                <button
                  onClick={() => {
                    soundManager.playTap();
                    onExploreDestination(activePin, 'google-maps');
                  }}
                  className="w-full py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-sky-300 hover:text-white border border-sky-500/30 font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <MapIcon className="w-4 h-4 text-sky-400" />
                  <span>View Google Maps & Photos (Live API)</span>
                </button>
              </div>

            </div>
          ) : (
            <div className="p-8 text-center rounded-3xl bg-slate-900/40 border border-slate-800">
              <MapPin className="w-8 h-8 text-slate-500 mx-auto mb-2" />
              <p className="text-xs text-slate-400">Click any destination pin on the spatial map to view details.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
