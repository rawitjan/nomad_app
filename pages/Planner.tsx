import React, { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Map, Navigation, Locate } from 'lucide-react';
import PlaceCard from '../components/PlaceCard';
import { useStore } from '../store/useStore';
import { ALMATY_COORDINATES, TRANSLATIONS } from '../constants';
import { calculateDistance } from '../utils/geo';
import { Coordinates } from '../types';

const Planner: React.FC = () => {
  const { plannedPlaces, language } = useStore();
  const t = TRANSLATIONS[language];

  // User location state
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [locationStatus, setLocationStatus] = useState<'loading' | 'found' | 'denied'>('loading');

  // Attempt to get user location on mount
  useEffect(() => {
    if (!navigator.geolocation) {
        setLocationStatus('denied');
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            setUserLocation({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            });
            setLocationStatus('found');
        },
        (error) => {
            console.warn("Geolocation denied or failed:", error);
            setLocationStatus('denied');
        }
    );
  }, []);

  // Determine origin based on status
  const origin = userLocation || ALMATY_COORDINATES;

  // Logic: Smart Route Sorting
  const sortedPlaces = useMemo(() => {
    return [...plannedPlaces].sort((a, b) => {
      const distA = calculateDistance(origin, a.coordinates);
      const distB = calculateDistance(origin, b.coordinates);
      return distA - distB;
    });
  }, [plannedPlaces, origin]);

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 md:px-8 max-w-4xl mx-auto">
      <header className="mb-12 text-center md:text-left">
        <div className="inline-flex items-center gap-2 text-neo-lime mb-2">
            <Navigation className="w-5 h-5 animate-pulse" />
            <span className="text-sm font-bold tracking-widest uppercase">
                {locationStatus === 'found' ? t.planner.subtitleLoc : t.planner.subtitle}
            </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black font-display text-white mb-4">
          {t.planner.title}
        </h1>
        
        {/* Location Status Indicator */}
        <div className="flex flex-col md:flex-row items-center gap-2 text-xs md:text-sm text-white/50">
            {locationStatus === 'loading' && (
                <span className="flex items-center gap-2">
                    <Locate className="w-4 h-4 animate-spin" />
                    {t.planner.calculating}
                </span>
            )}
            {locationStatus === 'denied' && (
                 <span className="text-neo-sand/60">{t.planner.locDenied}</span>
            )}
            {locationStatus === 'found' && (
                 <span className="text-neo-lime flex items-center gap-1">
                     <Locate className="w-4 h-4" />
                     GPS Signal Active
                 </span>
            )}
        </div>
      </header>

      <div className="grid gap-6">
        {sortedPlaces.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center p-12 border border-dashed border-white/20 rounded-3xl bg-white/5 text-center"
          >
            <Map className="w-16 h-16 text-white/20 mb-4" />
            <p className="text-xl text-neo-sand/60 font-medium">{t.planner.empty}</p>
          </motion.div>
        ) : (
          <div className="relative border-l-2 border-white/10 pl-8 ml-4 md:ml-0 space-y-8">
            {sortedPlaces.map((place, index) => {
               const distance = calculateDistance(origin, place.coordinates);
               return (
                  <div key={place.id} className="relative">
                      {/* Timeline Dot */}
                      <div className="absolute -left-[41px] top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-neo-dark border-4 border-neo-lime z-10"></div>
                      
                      {/* Connector if not last */}
                      {index !== sortedPlaces.length - 1 && (
                          <div className="absolute -left-[33px] top-1/2 h-full w-0.5 bg-neo-lime/30"></div>
                      )}
                      
                      <PlaceCard 
                        place={place} 
                        minimal 
                        distance={distance} 
                        distanceLabel={locationStatus === 'found' ? t.planner.distanceFromYou : t.planner.distanceFromAlmaty} 
                      />
                  </div>
               )
            })}
          </div>
        )}
      </div>

      {sortedPlaces.length > 0 && (
          <div className="mt-12 p-6 bg-neo-lime text-neo-dark rounded-2xl flex items-center justify-between shadow-[0_0_30px_rgba(204,255,0,0.2)]">
              <div>
                  <div className="text-xs font-bold uppercase opacity-60">Total Stops</div>
                  <div className="text-2xl font-black">{sortedPlaces.length}</div>
              </div>
              <div className="text-right">
                   <div className="text-xs font-bold uppercase opacity-60">
                       {locationStatus === 'found' ? t.planner.distanceFromYou : t.planner.distanceFromAlmaty}
                   </div>
                   <div className="text-2xl font-black">
                       {sortedPlaces.reduce((acc, curr) => acc + calculateDistance(origin, curr.coordinates), 0)} {t.planner.km}
                   </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default Planner;