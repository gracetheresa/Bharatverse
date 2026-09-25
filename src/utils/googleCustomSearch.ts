/**
 * Google Custom Search API Helper Module
 * Dynamically fetches high-quality images for destinations based on their name.
 */

export interface DestinationImage {
  url: string;
  title: string;
  thumbnailUrl?: string;
  contextLink?: string;
  author: string;
  category: string;
  width?: number;
  height?: number;
  source?: string;
  location?: string;
  googleImageSearchUrl?: string;
}

export interface CustomSearchResponse {
  query: string;
  count: number;
  source: 'google_custom_search' | 'google_search_real_photography' | 'curated_places_fallback';
  images: DestinationImage[];
  googleImageSearchUrl?: string;
  error?: string;
}

// In-memory cache to guarantee rapid navigation and reduce network roundtrips
const imageCache = new Map<string, { images: DestinationImage[]; googleImageSearchUrl?: string }>();

/**
 * Returns a direct Google Images Search URL for any destination or landmark name.
 */
export function getGoogleImagesSearchUrl(destinationName: string): string {
  return `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(destinationName + ' India travel sight')}`;
}

/**
 * Helper function using Google Custom Search API and real photography pipeline to dynamically fetch
 * high-quality real images for destinations based on their name.
 * 
 * @param destinationName - The name or keyword of the destination (e.g., 'Ananthagiri Hills', 'Hampi', 'Munnar')
 * @param options - Optional configuration for count and state disambiguation
 * @returns Promise<DestinationImage[]> - Array of verified, high-quality images with titles and author attributions
 */
export async function fetchGoogleCustomSearchImages(
  destinationName: string,
  options: { count?: number; state?: string } = {}
): Promise<DestinationImage[]> {
  const query = options.state ? `${destinationName} ${options.state}` : destinationName;
  const count = options.count || 8;
  const cacheKey = `${query.toLowerCase()}_${count}`;

  if (imageCache.has(cacheKey)) {
    return imageCache.get(cacheKey)!.images;
  }

  try {
    const url = `/api/google-custom-search-images?query=${encodeURIComponent(query)}&count=${count}`;
    const res = await fetch(url);
    
    if (res.ok) {
      const data: CustomSearchResponse = await res.json();
      if (data.images && data.images.length > 0) {
        const enriched = data.images.map(img => ({
          ...img,
          googleImageSearchUrl: img.googleImageSearchUrl || data.googleImageSearchUrl || getGoogleImagesSearchUrl(img.title || destinationName)
        }));
        imageCache.set(cacheKey, { images: enriched, googleImageSearchUrl: data.googleImageSearchUrl });
        return enriched;
      }
    }
  } catch (err) {
    console.warn(`[GoogleCustomSearch] Could not fetch images for ${destinationName}:`, err);
  }

  // Fallback to secondary place images endpoint if needed
  try {
    const fallbackRes = await fetch(`/api/google-place-images?query=${encodeURIComponent(destinationName)}`);
    if (fallbackRes.ok) {
      const fallbackData = await fallbackRes.json();
      if (fallbackData.photos && fallbackData.photos.length > 0) {
        const formatted: DestinationImage[] = fallbackData.photos.map((p: any) => ({
          url: p.url,
          title: p.title || destinationName,
          author: p.author || 'Google Local Guide',
          category: p.category || 'Scenic Views & Landmarks',
          location: p.location || destinationName,
          source: 'google_places_curated',
          googleImageSearchUrl: getGoogleImagesSearchUrl(p.title || destinationName),
        }));
        imageCache.set(cacheKey, { images: formatted });
        return formatted;
      }
    }
  } catch (err) {
    console.warn(`[GoogleCustomSearch] Secondary fallback error:`, err);
  }

  return [];
}

/**
 * Helper function to retrieve the single best hero cover image for a destination
 * 
 * @param destinationName - Name of the place
 * @param defaultFallbackUrl - Default cover if network is unavailable
 */
export async function getDestinationHeroImage(
  destinationName: string,
  defaultFallbackUrl?: string
): Promise<string> {
  try {
    const images = await fetchGoogleCustomSearchImages(destinationName, { count: 3 });
    if (images.length > 0 && images[0].url) {
      return images[0].url;
    }
  } catch {
    // fallback
  }
  return defaultFallbackUrl || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80';
}
