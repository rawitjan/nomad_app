import { create } from 'zustand';
import { Language, Place } from '../types';

interface StoreState {
  language: Language;
  plannedPlaces: Place[];
  setLanguage: (lang: Language) => void;
  addToPlan: (place: Place) => void;
  removeFromPlan: (placeId: string) => void;
  isPlanned: (placeId: string) => boolean;
}

export const useStore = create<StoreState>((set, get) => ({
  language: 'EN',
  plannedPlaces: [],
  setLanguage: (lang) => set({ language: lang }),
  addToPlan: (place) => {
    const { plannedPlaces } = get();
    if (!plannedPlaces.find((p) => p.id === place.id)) {
      set({ plannedPlaces: [...plannedPlaces, place] });
    }
  },
  removeFromPlan: (placeId) => {
    set({ plannedPlaces: get().plannedPlaces.filter((p) => p.id !== placeId) });
  },
  isPlanned: (placeId) => {
    return !!get().plannedPlaces.find((p) => p.id === placeId);
  }
}));