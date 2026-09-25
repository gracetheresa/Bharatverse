/// <reference types="@types/google.maps" />

/**
 * Google Maps JavaScript SDK Dynamic Loader
 * Loads Google Maps JS API with Places & Geometry libraries
 */

const GOOGLE_MAPS_KEY =
  (import.meta as any).env?.VITE_GOOGLE_MAPS_API_KEY ||
  'AIzaSyAO7oVjbx82MUqv2hMDaYd0KYhBi-kvl58';

let loadPromise: Promise<any> | null = null;

export function loadGoogleMaps(): Promise<any> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Window not available'));
  }

  if ((window as any).google?.maps) {
    return Promise.resolve((window as any).google.maps);
  }

  if (loadPromise) {
    return loadPromise;
  }

  loadPromise = new Promise((resolve, reject) => {
    const existingScript = document.querySelector('script[data-google-maps-script]');
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve((window as any).google.maps));
      existingScript.addEventListener('error', (e) => reject(e));
      return;
    }

    const script = document.createElement('script');
    script.setAttribute('data-google-maps-script', 'true');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_KEY}&libraries=places,geometry&loading=async`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      if ((window as any).google?.maps) {
        resolve((window as any).google.maps);
      } else {
        reject(new Error('Google Maps SDK loaded but google.maps is undefined'));
      }
    };

    script.onerror = (err) => {
      console.warn('Google Maps Script load failed:', err);
      reject(err);
    };

    document.head.appendChild(script);
  });

  return loadPromise;
}

