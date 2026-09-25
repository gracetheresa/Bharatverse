import { DESTINATIONS, MAJOR_CITIES } from '../data/destinations';
import { Destination, RecommendationResult, UserPreferences } from '../types/travel';

// Haversine formula to compute great-circle distance between two points in km
export function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

export function getCoordinatesForLocation(locationName: string): { lat: number; lng: number } {
  const normalized = locationName.trim().toLowerCase();
  for (const [city, coords] of Object.entries(MAJOR_CITIES)) {
    if (normalized.includes(city.toLowerCase()) || city.toLowerCase().includes(normalized)) {
      return coords;
    }
  }
  // Default fallback center of India (near Nagpur)
  return { lat: 21.1458, lng: 79.0882 };
}

export function generateDeterministicReason(
  destination: Destination,
  prefs: UserPreferences,
  distanceKm: number,
  interestOverlap: string[]
): string {
  const parts: string[] = [];

  // Distance highlight
  if (distanceKm < 150) {
    parts.push(`An effortless ${distanceKm} km getaway from ${prefs.startingLocation}`);
  } else if (distanceKm < 450) {
    parts.push(`Within convenient driving/train distance (${distanceKm} km) from ${prefs.startingLocation}`);
  } else {
    parts.push(`Prime destination in ${destination.state} (${distanceKm} km away)`);
  }

  // Budget highlight
  if (destination.typicalBudgetPerPerson <= prefs.maxBudget) {
    const savings = prefs.maxBudget - destination.typicalBudgetPerPerson;
    if (savings > 1000) {
      parts.push(`comfortably within your ₹${prefs.maxBudget.toLocaleString('en-IN')} budget (approx ₹${destination.typicalBudgetPerPerson.toLocaleString('en-IN')})`);
    } else {
      parts.push(`fits your ₹${prefs.maxBudget.toLocaleString('en-IN')} budget`);
    }
  } else {
    parts.push(`worth the slight stretch on budget for its exceptional experiences`);
  }

  // Interest match highlight
  if (interestOverlap.length > 0) {
    parts.push(`perfect for ${interestOverlap.slice(0, 2).join(' & ')}`);
  } else {
    parts.push(`offering memorable ${destination.categories.slice(0, 2).join(' & ')}`);
  }

  // Group compatibility
  if (destination.recommendedGroups.includes(prefs.travelGroup)) {
    parts.push(`tailored for ${prefs.travelGroup} travelers`);
  }

  return parts.join(', ') + '.';
}

export function rankDestinations(
  preferences: UserPreferences,
  destinations: Destination[] = DESTINATIONS,
  limit: number = 5
): RecommendationResult[] {
  const userCoords = getCoordinatesForLocation(preferences.startingLocation);

  const scoredResults: RecommendationResult[] = destinations.map((dest) => {
    // 1. Distance Calculation
    const distanceKm = calculateDistanceKm(
      userCoords.lat,
      userCoords.lng,
      dest.coordinates.lat,
      dest.coordinates.lng
    );

    let distanceScore = 0;
    if (distanceKm <= preferences.maxDistanceKm) {
      // Closer is rewarded, but anywhere within maxDistance gets high points
      const ratio = distanceKm / preferences.maxDistanceKm;
      distanceScore = 25 - ratio * 10; // 15 to 25 pts
    } else {
      // Over budget on distance
      const excess = distanceKm - preferences.maxDistanceKm;
      distanceScore = Math.max(0, 15 - (excess / 400) * 10);
    }

    // 2. Budget Score (0 - 25)
    let budgetScore = 0;
    const destBudget = dest.typicalBudgetPerPerson;
    const userBudget = preferences.maxBudget;
    if (destBudget <= userBudget) {
      budgetScore = 25;
    } else {
      const overRatio = (destBudget - userBudget) / userBudget;
      budgetScore = Math.max(0, 25 - overRatio * 35);
    }

    // 3. Interests Score (0 - 25)
    let interestScore = 0;
    const overlap = dest.categories.filter((cat) => preferences.interests.includes(cat));
    if (preferences.interests.length === 0) {
      interestScore = 20; // neutral default
    } else {
      const overlapRatio = overlap.length / Math.min(preferences.interests.length, 3);
      interestScore = Math.min(25, overlapRatio * 25);
    }

    // 4. Duration Score (0 - 15)
    const durationDiff = Math.abs(dest.idealDurationDays - preferences.durationDays);
    let durationScore = 15;
    if (durationDiff === 1) durationScore = 12;
    else if (durationDiff === 2) durationScore = 8;
    else if (durationDiff >= 3) durationScore = 4;

    // 5. Travel Group Match (0 - 10)
    const groupMatch = dest.recommendedGroups.includes(preferences.travelGroup);
    const groupScore = groupMatch ? 10 : 4;

    // 6. Accessibility Check (bonus/penalty)
    let accessibilityModifier = 0;
    if (preferences.accessibilityRequired) {
      if (dest.accessibilityFriendly) {
        accessibilityModifier = 5;
      } else {
        accessibilityModifier = -12;
      }
    }

    // Total raw score out of 100
    const rawScore = distanceScore + budgetScore + interestScore + durationScore + groupScore + accessibilityModifier;
    // Normalize into pleasant 55% - 98% percentage
    const matchScore = Math.min(99, Math.max(48, Math.round(rawScore)));

    const reason = generateDeterministicReason(dest, preferences, distanceKm, overlap);

    return {
      destination: dest,
      matchScore,
      distanceKm,
      reason,
      matchBreakdown: {
        budgetMatch: destBudget <= userBudget * 1.15,
        durationMatch: durationDiff <= 1,
        distanceMatch: distanceKm <= preferences.maxDistanceKm,
        interestOverlap: overlap,
        groupMatch,
        accessibilityMatch: !preferences.accessibilityRequired || dest.accessibilityFriendly,
      },
    };
  });

  // Sort descending by match score, secondary sort by distance
  scoredResults.sort((a, b) => {
    if (b.matchScore !== a.matchScore) {
      return b.matchScore - a.matchScore;
    }
    return a.distanceKm - b.distanceKm;
  });

  return scoredResults.slice(0, limit);
}
