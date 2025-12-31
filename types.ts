export type Language = 'EN' | 'KZ' | 'RU';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Panorama {
  title: Record<Language, string>;
  embedUrl: string;
  thumbnailUrl: string;
}

export interface VideoReview {
  url: string; // URL to the video file
  creditName: string; // e.g. @username
  creditUrl: string; // e.g. instagram.com/username
  thumbnailUrl: string;
  platform: 'instagram' | 'tiktok' | 'youtube' | 'other';
}

export interface Place {
  id: string;
  name: Record<Language, string>;
  description: Record<Language, string>;
  season: Record<Language, string>;
  coordinates: Coordinates;
  images: string[]; // Array of real URLs
  type: 'Canyon' | 'Lake' | 'Mountain' | 'Desert';
  locationLabel: Record<Language, string>; // e.g. Almaty Region
  isTrending: boolean;
  panoramas: Panorama[];
  videoReviews: VideoReview[];
}

export interface Translations {
  nav: {
    home: string;
    planner: string;
    tours: string;
    map: string;
  };
  hero: {
    explore: string;
    bestSeason: string;
    trending: string;
    allDestinations: string;
  };
  details: {
    addToPlan: string;
    added: string;
    coordinates: string;
    share: string;
    viewDetails: string;
    video: string;
    gallery: string;
    interactiveMap: string;
    panoramas: string;
    view3D: string;
    videoReviews: string;
    source: string;
  };
  planner: {
    title: string;
    subtitle: string;
    subtitleLoc: string;
    empty: string;
    distanceFromAlmaty: string;
    distanceFromYou: string;
    km: string;
    calculating: string;
    locDenied: string;
  };
  tours: {
    comingSoon: string;
    collab: string;
    notify: string;
  };
  filter: {
    searchPlaceholder: string;
    sortBy: string;
    sortTrending: string;
    sortNearest: string;
    sortName: string;
    noResults: string;
    prev: string;
    next: string;
    page: string;
  };
}