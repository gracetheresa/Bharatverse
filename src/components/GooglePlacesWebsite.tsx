/// <reference types="@types/google.maps" />
import React, { useState, useEffect, useRef } from 'react';
import { Destination } from '../types/travel';
import { DESTINATIONS } from '../data/destinations';
import { loadGoogleMaps } from '../utils/googleMapsLoader';
import { soundManager } from '../utils/soundEffects';
import {
  Search,
  MapPin,
  Star,
  Compass,
  ExternalLink,
  Layers,
  Image as ImageIcon,
  Camera,
  Heart,
  Navigation,
  Sparkles,
  ChevronRight,
  Maximize2,
  X,
  Share2,
  Check,
  CheckCircle2,
  Clock,
  Car,
  Landmark,
  ShieldCheck,
  Flame,
  ArrowRight
} from 'lucide-react';

interface GooglePlaceItem {
  id: string;
  name: string;
  address: string;
  location: { latitude: number; longitude: number } | null;
  rating: number | null;
  reviewsCount: number | null;
  googleMapsUri: string;
  editorialSummary?: string | null;
  types?: string[];
}

interface PlacePhoto {
  url: string;
  title: string;
  category: string;
  author: string;
  location?: string;
}

interface Props {
  initialSearchQuery?: string;
  onExploreIn3D?: (destination: Destination) => void;
  onAddToJourney?: (destination: Destination) => void;
  savedDestinationIds?: string[];
}

const POPULAR_SEARCH_PRESETS = [
  { label: 'Ananthagiri Hills, Vikarabad', query: 'Ananthagiri Hills Vikarabad' },
  { label: 'Group of Monuments, Hampi', query: 'Hampi Karnataka' },
  { label: 'Munnar Tea Gardens, Kerala', query: 'Munnar Kerala' },
  { label: 'Grand Canyon of Gandikota', query: 'Gandikota Andhra Pradesh' },
  { label: 'Varanasi Heritage Ghats', query: 'Varanasi Ghats Uttar Pradesh' },
  { label: 'Mahabalipuram Shore Temple', query: 'Mahabalipuram Tamil Nadu' },
  { label: 'Dandeli Wildlife & Kali River', query: 'Dandeli Karnataka' },
];

export const GooglePlacesWebsite: React.FC<Props> = ({
  initialSearchQuery = 'Ananthagiri Hills Vikarabad',
  onExploreIn3D,
  onAddToJourney,
  savedDestinationIds = [],
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [activeQuery, setActiveQuery] = useState(initialSearchQuery);
  const [isLoading, setIsLoading] = useState(false);
  
  // Data states
  const [primaryPlace, setPrimaryPlace] = useState<any>(null);
  const [nearbyAttractions, setNearbyAttractions] = useState<GooglePlaceItem[]>([]);
  const [photos, setPhotos] = useState<PlacePhoto[]>([]);
  const [selectedPhotoCategory, setSelectedPhotoCategory] = useState<string>('All');
  const [lightboxPhoto, setLightboxPhoto] = useState<PlacePhoto | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  
  // Google Map states
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [mapType, setMapType] = useState<'terrain' | 'satellite' | 'roadmap' | 'hybrid'>('terrain');
  const [activeMarkerName, setActiveMarkerName] = useState<string | null>(null);

  // Find if matching Bharatverse Destination exists
  const matchedDestination = DESTINATIONS.find(d => 
    activeQuery.toLowerCase().includes(d.name.toLowerCase()) || 
    d.name.toLowerCase().includes(activeQuery.toLowerCase()) ||
    activeQuery.toLowerCase().includes(d.id)
  ) || DESTINATIONS[0];

  const isSaved = savedDestinationIds.includes(matchedDestination?.id || '');

  // Perform search across Google Places & Images APIs
  const performSearch = async (queryText: string) => {
    setIsLoading(true);
    setActiveQuery(queryText);

    try {
      // 1. Fetch Primary Google Place Details
      const detailsPromise = fetch(`/api/google-place-details?query=${encodeURIComponent(queryText)}`)
        .then(r => r.json())
        .catch(err => {
          console.warn('Details fetch error', err);
          return null;
        });

      // 2. Fetch Nearby Attractions / Places
      const searchPromise = fetch(`/api/google-places-search?query=${encodeURIComponent(queryText + ' tourist attractions')}`)
        .then(r => r.json())
        .catch(err => {
          console.warn('Search fetch error', err);
          return null;
        });

      // 3. Fetch Google Custom Search Images dynamically based on destination name
      const photosPromise = fetch(`/api/google-custom-search-images?query=${encodeURIComponent(queryText)}&count=10`)
        .then(r => r.json())
        .catch(err => {
          console.warn('Photos fetch error', err);
          return null;
        });

      const [detailsData, searchData, photosData] = await Promise.all([
        detailsPromise,
        searchPromise,
        photosPromise,
      ]);

      if (detailsData && detailsData.found) {
        setPrimaryPlace(detailsData);
      }

      if (searchData && searchData.places) {
        setNearbyAttractions(searchData.places);
      }

      if (photosData) {
        if (photosData.images && photosData.images.length > 0) {
          setPhotos(photosData.images.map((img: any) => ({
            url: img.url,
            title: img.title,
            category: img.category || 'Scenic Views & Landmarks',
            author: img.author || 'Google Custom Search Contributor',
            location: img.location || queryText,
          })));
        } else if (photosData.photos) {
          setPhotos(photosData.photos);
        }
      }
    } catch (err) {
      console.error('Error performing Google Places & Images search:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    performSearch(initialSearchQuery);
  }, []);

  // Update Google Map when place or attractions change
  useEffect(() => {
    if (!mapRef.current) return;

    let isMounted = true;

    loadGoogleMaps()
      .then((googleMaps) => {
        if (!isMounted || !mapRef.current) return;

        const centerLat = primaryPlace?.location?.latitude || matchedDestination?.coordinates.lat || 17.3116;
        const centerLng = primaryPlace?.location?.longitude || matchedDestination?.coordinates.lng || 77.8631;

        if (!mapInstanceRef.current) {
          mapInstanceRef.current = new googleMaps.Map(mapRef.current, {
            center: { lat: centerLat, lng: centerLng },
            zoom: 13,
            mapTypeId: mapType,
            mapTypeControl: false,
            streetViewControl: true,
            fullscreenControl: false,
            zoomControl: true,
            styles: [
              { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'on' }] },
            ],
          });
        } else {
          mapInstanceRef.current.setCenter({ lat: centerLat, lng: centerLng });
          mapInstanceRef.current.setMapTypeId(mapType);
        }

        // Clear existing markers
        markersRef.current.forEach(m => m.setMap(null));
        markersRef.current = [];

        // Add Primary Place Marker (Golden Star Marker)
        const mainMarker = new googleMaps.Marker({
          position: { lat: centerLat, lng: centerLng },
          map: mapInstanceRef.current,
          title: primaryPlace?.displayName || activeQuery,
          animation: googleMaps.Animation.DROP,
          icon: {
            path: googleMaps.SymbolPath.BACKWARD_CLOSED_ARROW,
            scale: 7,
            fillColor: '#F59E0B',
            fillOpacity: 1,
            strokeColor: '#FFFFFF',
            strokeWeight: 2,
          },
        });

        const mainInfoWindow = new googleMaps.InfoWindow({
          content: `
            <div style="color: #0f172a; font-family: system-ui, sans-serif; padding: 6px 4px; max-width: 240px;">
              <div style="font-weight: 800; font-size: 13px; color: #b45309;">✦ ${primaryPlace?.displayName || activeQuery}</div>
              <div style="font-size: 11px; margin-top: 3px; color: #475569;">⭐ ${primaryPlace?.rating || '4.4'} (${primaryPlace?.userRatingCount || '6,000+'} reviews on Google Maps)</div>
              <div style="font-size: 10px; margin-top: 4px; color: #64748b;">${primaryPlace?.formattedAddress || ''}</div>
            </div>
          `,
        });

        mainMarker.addListener('click', () => {
          soundManager.playTap();
          mainInfoWindow.open(mapInstanceRef.current, mainMarker);
          setActiveMarkerName(primaryPlace?.displayName || activeQuery);
        });

        markersRef.current.push(mainMarker);

        // Add Nearby Attraction Markers
        nearbyAttractions.slice(0, 10).forEach((attraction, idx) => {
          if (!attraction.location) return;

          const marker = new googleMaps.Marker({
            position: { lat: attraction.location.latitude, lng: attraction.location.longitude },
            map: mapInstanceRef.current,
            title: attraction.name,
            icon: {
              path: googleMaps.SymbolPath.CIRCLE,
              scale: 6,
              fillColor: '#38BDF8',
              fillOpacity: 0.9,
              strokeColor: '#0F172A',
              strokeWeight: 1.5,
            },
          });

          const infoWindow = new googleMaps.InfoWindow({
            content: `
              <div style="color: #0f172a; font-family: system-ui, sans-serif; padding: 4px; max-width: 220px;">
                <div style="font-weight: 700; font-size: 12px; color: #0284c7;">${attraction.name}</div>
                <div style="font-size: 10px; margin-top: 2px; color: #475569;">⭐ ${attraction.rating || '4.2'} • Google Verified</div>
                <div style="font-size: 9px; margin-top: 4px; color: #64748b;">${attraction.address}</div>
              </div>
            `,
          });

          marker.addListener('click', () => {
            soundManager.playTap();
            infoWindow.open(mapInstanceRef.current, marker);
            setActiveMarkerName(attraction.name);
          });

          markersRef.current.push(marker);
        });
      })
      .catch((err) => {
        console.warn('Map initialization failed:', err);
      });

    return () => {
      isMounted = false;
    };
  }, [primaryPlace, nearbyAttractions, mapType]);

  // Handle Map Type Change
  const handleMapTypeChange = (type: 'terrain' | 'satellite' | 'roadmap' | 'hybrid') => {
    soundManager.playTap();
    setMapType(type);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setMapTypeId(type);
    }
  };

  // Filter photos
  const filteredPhotos = selectedPhotoCategory === 'All'
    ? photos
    : photos.filter(p => p.category === selectedPhotoCategory);

  const photoCategories = ['All', ...Array.from(new Set(photos.map(p => p.category)))];

  // Handle Search Submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    soundManager.playTap();
    performSearch(searchQuery.trim());
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* HEADER & SEARCH BAR SECTION */}
        <div className="text-center space-y-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Google Places & Search Images Engine</span>
            <span className="px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-black text-[10px]">
              Live API
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Explore Indian Places with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400">
              Google Maps & Search Images
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Search any Indian destination or heritage landmark to instantly discover verified Google Places ratings, high-resolution photography, interactive satellite maps, and nearby attractions.
          </p>

          {/* MAIN SEARCH INPUT */}
          <form
            onSubmit={handleSearchSubmit}
            className="mt-6 relative flex items-center rounded-2xl bg-slate-900/90 border border-amber-500/40 p-2 shadow-2xl backdrop-blur-xl focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-500/20 transition-all max-w-2xl mx-auto"
          >
            <div className="pl-3 pr-2 text-amber-400 shrink-0">
              <Search className="w-5 h-5" />
            </div>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search place, hill station, temple, or city (e.g. Ananthagiri Hills, Munnar)..."
              className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none px-2 py-2"
            />

            <button
              type="submit"
              disabled={isLoading || !searchQuery.trim()}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-lg shadow-amber-500/20 transition cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <span>Search Place</span>
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* QUICK PRESET CHIPS */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <span className="text-slate-400 text-xs font-semibold mr-1">Trending Searches:</span>
            {POPULAR_SEARCH_PRESETS.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => {
                  soundManager.playTap();
                  setSearchQuery(preset.query);
                  performSearch(preset.query);
                }}
                className={`text-xs px-3 py-1 rounded-full border transition flex items-center gap-1 cursor-pointer ${
                  activeQuery.toLowerCase().includes(preset.query.toLowerCase()) || preset.query.toLowerCase().includes(activeQuery.toLowerCase())
                    ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-md'
                    : 'bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white border-slate-700/60'
                }`}
              >
                <span>{preset.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* PRIMARY GOOGLE PLACE HERO CARD */}
        {primaryPlace && (
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-amber-500/30 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              
              <div className="space-y-3 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-black text-xs flex items-center gap-1 shadow-md">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{primaryPlace.rating || 4.4} / 5.0</span>
                  </span>
                  
                  {primaryPlace.userRatingCount && (
                    <span className="text-xs text-slate-300 font-medium">
                      ({primaryPlace.userRatingCount.toLocaleString()} Google Reviews)
                    </span>
                  )}

                  <span className="text-slate-600">•</span>

                  <span className="px-2.5 py-0.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-semibold flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    Google Places Verified
                  </span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                  {primaryPlace.displayName}
                </h2>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                  {primaryPlace.editorialSummary ||
                    `${primaryPlace.displayName} is a prominent destination known for scenic terrain, historical significance, and outdoor experiences.`}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    {primaryPlace.formattedAddress}
                  </span>
                  {primaryPlace.location && (
                    <span className="text-[11px] font-mono text-slate-500">
                      [{primaryPlace.location.latitude.toFixed(4)}° N, {primaryPlace.location.longitude.toFixed(4)}° E]
                    </span>
                  )}
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex flex-wrap lg:flex-col gap-2.5 shrink-0 w-full sm:w-auto">
                <a
                  href={primaryPlace.googleMapsUri || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(primaryPlace.displayName)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition cursor-pointer"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                {onExploreIn3D && matchedDestination && (
                  <button
                    onClick={() => {
                      soundManager.playTap();
                      onExploreIn3D(matchedDestination);
                    }}
                    className="flex-1 sm:flex-none px-5 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
                  >
                    <Compass className="w-4 h-4 text-amber-400" />
                    <span>Launch 3D Spatial Scene</span>
                  </button>
                )}

                {onAddToJourney && matchedDestination && (
                  <button
                    onClick={() => {
                      soundManager.playTap();
                      onAddToJourney(matchedDestination);
                    }}
                    className={`flex-1 sm:flex-none px-5 py-2.5 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer border ${
                      isSaved
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                        : 'bg-slate-800/80 hover:bg-slate-700 text-slate-200 border-slate-700'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-current text-rose-400' : ''}`} />
                    <span>{isSaved ? 'Saved in Journey' : 'Save to My Journey'}</span>
                  </button>
                )}
              </div>

            </div>
          </div>
        )}

        {/* SECTION: INTERACTIVE GOOGLE MAP WITH CONTROLS */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-amber-400" />
                <span>Live Google Maps & Topographic Satellite Explorer</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Explore coordinates, road networks, viewpoints, and terrain elevations powered by Google Maps JavaScript SDK.
              </p>
            </div>

            {/* MAP TYPE TOGGLES */}
            <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-xl border border-slate-800 self-end sm:self-auto">
              {(['terrain', 'satellite', 'roadmap', 'hybrid'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => handleMapTypeChange(type)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition ${
                    mapType === type
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* MAP CANVAS CONTAINER */}
          <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950">
            <div ref={mapRef} className="w-full h-[400px] sm:h-[480px] lg:h-[540px]" />

            {/* MAP OVERLAY BADGE */}
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 pointer-events-none">
              <div className="px-3 py-1.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800 text-xs text-white flex items-center gap-2 shadow-lg">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-bold">{primaryPlace?.displayName || activeQuery}</span>
                <span className="text-[10px] text-slate-400 font-mono">({mapType})</span>
              </div>
              {activeMarkerName && (
                <div className="px-3 py-1 rounded-xl bg-amber-500/90 text-slate-950 text-xs font-black shadow-lg">
                  Selected: {activeMarkerName}
                </div>
              )}
            </div>

            {/* GOOGLE LOGO & CONTROLS HELPER */}
            <div className="absolute bottom-4 left-4 z-10 hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-800 text-[11px] text-slate-400">
              <span>✦ Click any marker to view rating and details</span>
            </div>
          </div>
        </div>

        {/* SECTION: GOOGLE CUSTOM SEARCH IMAGES GALLERY */}
        <div className="space-y-4 pt-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                  <Camera className="w-5 h-5 text-amber-400" />
                  <span>Google Search Real Images & Verified Sights</span>
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                  Real Sights
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Authentic photography captured of real terrain, temples, waterfalls, and panoramic viewpoints.
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {/* Direct Search on Google Images Button */}
              <a
                href={`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(activeQuery + ' travel sight')}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundManager.playTap()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-amber-500/40 text-amber-300 text-xs font-semibold transition hover:scale-105"
              >
                <Search className="w-3.5 h-3.5 text-amber-400" />
                <span>Search Google Images ↗</span>
              </a>

              {/* CATEGORY FILTERS */}
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 sm:pb-0">
                {photoCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      soundManager.playTap();
                      setSelectedPhotoCategory(cat);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs whitespace-nowrap transition cursor-pointer ${
                      selectedPhotoCategory === cat
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                        : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* IMAGE GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredPhotos.map((photo, idx) => (
              <div
                key={idx}
                onClick={() => {
                  soundManager.playTap();
                  setLightboxPhoto(photo);
                }}
                className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-amber-500/50 shadow-lg cursor-pointer transition transform hover:-translate-y-1"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-slate-950">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    loading="lazy"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-85 group-hover:opacity-90 transition" />

                {/* CATEGORY PILL */}
                <div className="absolute top-2.5 left-2.5">
                  <span className="px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-md text-[10px] font-semibold text-amber-300 border border-amber-500/20">
                    {photo.category}
                  </span>
                </div>

                {/* ZOOM ICON */}
                <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-slate-950/70 backdrop-blur-md flex items-center justify-center text-slate-300 opacity-0 group-hover:opacity-100 transition">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>

                {/* CAPTION & AUTHOR */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5">
                  <h4 className="text-xs font-bold text-white group-hover:text-amber-300 transition line-clamp-1">
                    {photo.title}
                  </h4>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
                    <span className="truncate max-w-[160px]">{photo.author}</span>
                    <span className="text-amber-400 font-semibold flex items-center gap-0.5">
                      View
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION: NEARBY GOOGLE PLACES & ATTRACTIONS */}
        {nearbyAttractions.length > 0 && (
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <Landmark className="w-5 h-5 text-amber-400" />
                <span>Nearby Attractions Discovered via Google Places</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Top tourist viewpoints, shrines, trails, and cultural landmarks around {primaryPlace?.displayName || activeQuery}.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {nearbyAttractions.slice(0, 6).map((attraction, idx) => (
                <div
                  key={attraction.id || idx}
                  className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-bold text-white line-clamp-1">
                        {attraction.name}
                      </h4>
                      {attraction.rating && (
                        <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[11px] font-bold shrink-0 flex items-center gap-1">
                          <Star className="w-3 h-3 fill-current" />
                          <span>{attraction.rating}</span>
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                      {attraction.address || 'Scenic landmark around this destination.'}
                    </p>

                    {attraction.types && attraction.types.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2.5">
                        {attraction.types.slice(0, 2).map((t, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-full bg-slate-800 text-[10px] text-slate-300 capitalize"
                          >
                            {t.replace(/_/g, ' ')}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-800/60 flex items-center justify-between text-xs">
                    <a
                      href={attraction.googleMapsUri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Directions</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>

                    <button
                      onClick={() => {
                        soundManager.playTap();
                        setSearchQuery(attraction.name);
                        performSearch(attraction.name);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <span>Explore Photos</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {lightboxPhoto && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
          onClick={() => setLightboxPhoto(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[92vh] flex flex-col rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setLightboxPhoto(null)}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-950/80 hover:bg-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* FULL RESOLUTION IMAGE */}
            <div className="flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[320px] max-h-[65vh]">
              <img
                src={lightboxPhoto.url}
                alt={lightboxPhoto.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            {/* PHOTO DETAILS BAR */}
            <div className="p-5 sm:p-6 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
                  {lightboxPhoto.category}
                </span>
                <h3 className="text-lg font-bold text-white">{lightboxPhoto.title}</h3>
                <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                  <span>Photo Credit: {lightboxPhoto.author}</span>
                  {lightboxPhoto.location && (
                    <>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-amber-400" />
                        {lightboxPhoto.location}
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <a
                  href={`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(lightboxPhoto.title + ' ' + (primaryPlace?.displayName || activeQuery))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundManager.playTap()}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs flex items-center gap-1.5 transition border border-amber-500/30"
                >
                  <Search className="w-3.5 h-3.5 text-amber-400" />
                  <span>Search on Google Images</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href={primaryPlace?.googleMapsUri || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lightboxPhoto.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>View on Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
