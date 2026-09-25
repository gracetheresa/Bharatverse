export type TravelGroup = 'Solo' | 'Couple' | 'Friends' | 'Family' | 'Senior Friendly';

export type Category = 
  | 'Nature & Hills'
  | 'Heritage & History'
  | 'Spiritual & Sacred'
  | 'Adventure & Trekking'
  | 'Culinary & Food'
  | 'Coastal & Beaches'
  | 'Art & Architecture'
  | 'Wildlife & Forests';

export interface Activity {
  id: string;
  title: string;
  description: string;
  duration: string; // e.g. "2 hours"
  timeOfDay: 'Morning' | 'Afternoon' | 'Evening' | 'Night';
  cost: number; // in INR
  tag: string;
}

export interface Hotspot3D {
  id: string;
  name: string;
  description: string;
  position: [number, number, number]; // x, y, z
  cameraTarget: [number, number, number];
  cameraPosition: [number, number, number];
  category: string;
  highlightFact: string;
}

export interface Destination {
  id: string;
  name: string;
  tagline: string;
  state: string;
  nearestCity: string;
  distanceFromNearestCityKm: number;
  // Approximate lat/lng for distance calculations
  coordinates: {
    lat: number;
    lng: number;
  };
  categories: Category[];
  budgetTier: 'Budget' | 'Moderate' | 'Comfort' | 'Luxury';
  typicalBudgetPerPerson: number; // INR for recommended duration
  idealDurationDays: number;
  recommendedGroups: TravelGroup[];
  accessibilityFriendly: boolean;
  bestSeason: string;
  coverImage: string;
  galleryImages?: string[];
  overview: string;
  highlights: string[];
  activities: Activity[];
  hotspots3D: Hotspot3D[];
  threeSceneType: 'hills' | 'temple_ruins' | 'coastal' | 'desert' | 'ghats' | 'valley';
  travelTips: string[];
}

export interface UserPreferences {
  startingLocation: string;
  maxBudget: number; // in INR
  durationDays: number;
  travelGroup: TravelGroup;
  interests: Category[];
  maxDistanceKm: number; // e.g., 200, 500, 1000, 3000
  accessibilityRequired: boolean;
}

export interface RecommendationResult {
  destination: Destination;
  matchScore: number; // 0 - 100%
  distanceKm: number;
  reason: string;
  matchBreakdown: {
    budgetMatch: boolean;
    durationMatch: boolean;
    distanceMatch: boolean;
    interestOverlap: string[];
    groupMatch: boolean;
    accessibilityMatch: boolean;
  };
}

export interface SavedJourneyItem {
  destinationId: string;
  destination: Destination;
  savedAt: string;
  selectedActivities: string[];
  selectedExperienceIds?: string[];
  notes?: string;
}

export interface DayItinerarySlot {
  timeOfDay: 'Morning' | 'Afternoon' | 'Evening';
  destinationName: string;
  activityTitle: string;
  activityDescription: string;
  estimatedCost: number;
}

export interface DayItinerary {
  dayNumber: number;
  title: string;
  slots: DayItinerarySlot[];
}

// ==========================================
// 🎵 LIVE MUSIC & CONCERTS TYPES
// ==========================================

export type MusicGenre =
  | 'Indian Classical'
  | 'Carnatic'
  | 'Hindustani'
  | 'Folk Music'
  | 'Sufi Music'
  | 'Indie Music'
  | 'Bollywood Live'
  | 'Regional Music'
  | 'Fusion'
  | 'Cultural Music Festivals'
  | 'Traditional Instrument Performances';

export type EventSourceStatus = 'LIVE / VERIFIED' | 'CURATED' | 'DEMO';

export interface LiveMusicEvent {
  id: string;
  artistOrEventName: string;
  artist: string;
  venue: string;
  city: string;
  state: string;
  date: string;
  time: string;
  genre: MusicGenre;
  price: string;
  priceInr?: number;
  image: string;
  status: EventSourceStatus;
  statusExplanation: string;
  setting: 'Indoor' | 'Outdoor' | 'Both';
  suitableFor: TravelGroup[];
  description: string;
  highlights: string[];
  bookingOrInfoUrl?: string;
  googleMapsQuery?: string;
  organizer?: string;
  isFeatured?: boolean;
}

// ==========================================
// ✨ EXPERIENCE THE SOUL OF INDIA TYPES
// ==========================================

export type SoulCategory =
  | 'Workshops & Crafts'
  | 'Local Food & Flavours'
  | 'Performing Arts & Folk'
  | 'Village & Community'
  | 'Heritage & Stories'
  | 'Nature & Trails';

export type MakeSomethingType =
  | 'weaving'
  | 'pottery'
  | 'painting'
  | 'block_printing'
  | 'embroidery'
  | 'cooking'
  | 'crafts'
  | 'dance_music';

export interface ExperienceMakerInfo {
  name: string;
  roleOrCooperative: string;
  craft: string;
  experienceYears?: string;
  location: string;
  story: string;
  whatVisitorsExperience: string;
  isDemoProfile: boolean;
  avatarUrl?: string;
  workshopAvailability?: string;
  journeyPathway?: string[];
  makerCategory?: 'weaver' | 'potter' | 'sculptor' | 'artisan' | 'community' | 'small_business';
}

export interface FoodInsight {
  dishOrTradition: string;
  whatMakesItSpecial: string;
  keyIngredients: string[];
  culturalOccasion: string;
  cookingMethod?: string;
}

export interface ExperienceScoreBreakdown {
  interestMatch: number; // out of 30
  destinationRelevance: number; // out of 20
  culturalRelevance: number; // out of 15
  groupSuitability: number; // out of 15
  durationFit: number; // out of 10
  budgetFit: number; // out of 10
  totalScore: number; // out of 100
}

export interface SoulExperience {
  id: string;
  title: string;
  tagline: string;
  category: SoulCategory;
  makeSomethingType?: MakeSomethingType;
  destinationId: string;
  destinationName: string;
  state: string;
  location: string;
  duration: string;
  difficulty: 'Beginner Friendly' | 'Intermediate' | 'Masterclass' | 'All Skill Levels';
  priceLevel: 'Free' | 'Budget (₹300 - ₹800)' | 'Moderate (₹800 - ₹2000)' | 'Specialized (₹2000+)';
  priceInr: number;
  image: string;
  shortStory: string;
  whatYouExperience: string[];
  makerInfo?: ExperienceMakerInfo;
  foodInsights?: FoodInsight;
  isDemoExperience: boolean;
  googlePlaceQuery?: string;
  tags: string[];
}

export interface StateWorkshopItem {
  title: string;
  type: string;
  location: string;
  description: string;
  duration: string;
}

export interface StateArtisanCommunity {
  name: string;
  craft: string;
  location: string;
  heritageStory: string;
  visitingGuidance: string;
}

export interface StateDNA {
  state: string;
  tagline: string;
  heroImage: string;
  signatureCrafts: Array<{ name: string; description: string; GIStatus?: boolean }>;
  signatureFood: Array<{ name: string; description: string; mustTryAt: string }>;
  performingArts: Array<{ name: string; description: string }>;
  festivals: Array<{ name: string; month: string; significance: string }>;
  culturalStories: Array<{ title: string; story: string }>;
  famousArtisanProducts: string[];
  localExperiences: string[];
  workshops?: StateWorkshopItem[];
  artisanCommunities?: StateArtisanCommunity[];
}

export type CulturalEventCategory =
  | 'Festival'
  | 'Cultural Performance'
  | 'Fair'
  | 'Craft Fair'
  | 'Folk Arts'
  | 'Seasonal Event'
  | 'Seasonal Celebration'
  | 'Traditional Celebration'
  | 'Music & Folk';

export interface CulturalEvent {
  id: string;
  title: string;
  state: string;
  location: string;
  timePeriod: string;
  seasonOrFrequency?: string;
  category: CulturalEventCategory;
  description: string;
  highlight: string;
  status: 'Curated Event' | 'Verified Event' | 'Demo Event' | 'Live/Upcoming';
  statusExplanation: string;
  isDemoEvent: boolean;
  image?: string;
  culturalSignificance?: string;
  traditionalVenue?: string;
  accessInfo?: string;
  bestViewingTip?: string;
}

export interface SavedJourneyExperience {
  experienceId: string;
  experience: SoulExperience;
  savedAt: string;
}

export type LocalBharatPillar = 'STAY LOCAL' | 'EAT LOCAL' | 'MEET LOCAL' | 'SHOP LOCAL';

export interface LocalBharatPlace {
  id: string;
  name: string;
  pillar: LocalBharatPillar;
  category: string;
  subCategory?: string;
  rating?: number | null;
  userRatingCount?: number | null;
  address: string;
  distanceKm: number;
  formattedDistance: string;
  photoUrl?: string | null;
  googleMapsUri: string;
  isVerifiedArtisanOrProducer: boolean;
  classificationEvidence: string;
  editorialSummary?: string | null;
  source: 'Google Places API (New)' | 'Local Demo Dataset (Fallback)';
  priceLevel?: string | null;
}

export interface LocalBharatData {
  destinationId: string;
  destinationName: string;
  state: string;
  pillars: {
    stayLocal: LocalBharatPlace[];
    eatLocal: LocalBharatPlace[];
    meetLocal: LocalBharatPlace[];
    shopLocal: LocalBharatPlace[];
  };
  totalCount: number;
  source: 'Google Places API (New)' | 'Local Demo Dataset (Fallback)' | 'Hybrid Verified';
}

export interface SerpApiUnderratedResult {
  id: string;
  position: number;
  title: string;
  link: string;
  domain: string;
  source: string;
  snippet: string;
  snippetHighlights?: string[];
  date?: string | null;
  thumbnail?: string | null;
  matchedDestinations?: Array<{ id: string; name: string }>;
}

export interface SerpApiRelatedQuestion {
  question: string;
  snippet?: string;
  title?: string;
  link?: string;
}

export interface SerpApiUnderratedPayload {
  query: string;
  language: 'en' | 'hi';
  googleSearchUrl?: string;
  totalResults: number | string;
  organicResults: SerpApiUnderratedResult[];
  relatedQuestions: SerpApiRelatedQuestion[];
  relatedSearches: Array<{ query: string; link?: string }>;
  source: string;
  timestamp: string;
}

