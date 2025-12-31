import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Check, Plus, ArrowUpRight, Navigation } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Place } from '../types';
import { useStore } from '../store/useStore';
import { TRANSLATIONS } from '../constants';

interface PlaceCardProps {
  place: Place;
  minimal?: boolean; // For planner view
  compact?: boolean; // For grid view
  distance?: number;
  distanceLabel?: string;
}

const PlaceCard: React.FC<PlaceCardProps> = ({ place, minimal = false, compact = false, distance, distanceLabel }) => {
  const { language, addToPlan, removeFromPlan, isPlanned } = useStore();
  const navigate = useNavigate();
  const planned = isPlanned(place.id);
  const t = TRANSLATIONS[language];

  const handleTogglePlan = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (planned) {
      removeFromPlan(place.id);
    } else {
      addToPlan(place);
    }
  };

  const imageSrc = place.images[0];
  const thumbSrc = place.images[0]; // Can be optimized if needed, but using same URL for now

  if (minimal) {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        onClick={() => navigate(`/place/${place.id}`)}
        className="group relative flex items-center bg-neo-dark/50 border border-neo-sand/10 rounded-xl p-3 md:p-4 overflow-hidden hover:bg-neo-dark/80 transition-colors cursor-pointer"
      >
        <div className="h-16 w-16 md:h-20 md:w-20 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={thumbSrc}
            alt={place.name[language]}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="ml-3 md:ml-4 flex-grow min-w-0">
          <h3 className="text-lg md:text-xl font-bold font-display text-neo-sand truncate pr-8">{place.name[language]}</h3>
          <div className="flex items-center text-xs md:text-sm text-gray-400 mt-1">
            <MapPin className="w-3 h-3 md:w-4 md:h-4 mr-1 text-neo-lime shrink-0" />
            <span className="truncate">{distance} {t.planner.km} {distanceLabel || t.planner.distanceFromAlmaty}</span>
          </div>
        </div>
        <button
          onClick={handleTogglePlan}
          className="absolute right-2 top-2 md:static md:p-2 rounded-full hover:bg-red-500/20 text-gray-500 hover:text-red-500 transition-colors z-10"
        >
          <div className="sr-only">Remove</div>
          <Plus className="w-5 h-5 md:w-6 md:h-6 rotate-45" />
        </button>
      </motion.div>
    );
  }

  // Compact Grid Card
  if (compact) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative h-64 md:h-80 w-full rounded-2xl overflow-hidden group border border-white/10 cursor-pointer"
        >
            <Link to={`/place/${place.id}`} className="absolute inset-0">
                <img src={imageSrc} alt={place.name[language]} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-neo-dark/90 via-neo-dark/20 to-transparent" />
                
                {/* Distance Badge */}
                {distance !== undefined && (
                    <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-lg flex items-center gap-1.5 z-10">
                        <Navigation className="w-3 h-3 text-neo-lime" />
                        <span className="text-[10px] font-bold text-white tracking-wide">
                            {distance} {t.planner.km} {distanceLabel === t.planner.distanceFromYou ? 'from you' : ''}
                        </span>
                    </div>
                )}

                <div className="absolute bottom-0 left-0 p-4 w-full">
                    <div className="flex justify-between items-end">
                        <div className="w-full pr-8">
                            <h3 className="text-xl font-bold font-display text-white truncate">{place.name[language]}</h3>
                            <div className="flex items-center text-xs text-white/70 mt-1 gap-3">
                                <span className="flex items-center text-neo-lime">
                                   <MapPin className="w-3 h-3 mr-1" />
                                   {place.locationLabel[language]}
                                </span>
                                <span className="w-1 h-1 rounded-full bg-white/30"></span>
                                <span>{place.type}</span>
                            </div>
                        </div>
                        {planned && (
                            <div className="bg-neo-lime text-neo-dark p-1.5 rounded-full absolute bottom-4 right-4">
                                <Check className="w-4 h-4" />
                            </div>
                        )}
                    </div>
                </div>
            </Link>
        </motion.div>
    )
  }

  // Full Trending Card
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative h-[55vh] md:h-[500px] w-full max-w-[85vw] md:max-w-sm rounded-[24px] md:rounded-[32px] overflow-hidden group shadow-2xl border border-white/10 mx-auto"
    >
      <Link to={`/place/${place.id}`} className="absolute inset-0 z-0">
        <img
          src={imageSrc}
          alt={place.name[language]}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-neo-dark/95 md:to-neo-dark/90" />
      </Link>

      {/* Content */}
      <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-end pointer-events-none">
        <div className="transform md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-500">
          <div className="flex justify-between items-start mb-2">
            <span className="inline-block px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] md:text-xs font-semibold tracking-wider text-neo-lime uppercase">
              {place.season[language]}
            </span>
            <span className="flex items-center gap-1 text-[10px] md:text-xs text-white/80 bg-black/20 px-2 py-1 rounded-full border border-white/10">
               <MapPin className="w-3 h-3 text-neo-lime" />
               {place.locationLabel[language]}
            </span>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-black font-display text-white mb-2 leading-tight">
            {place.name[language]}
          </h2>
          
          <p className="text-xs md:text-sm text-white/80 line-clamp-2 mb-4 md:mb-6 md:group-hover:line-clamp-none transition-all duration-300">
            {place.description[language]}
          </p>

          <div className="flex gap-2 md:gap-3 pointer-events-auto">
             <button 
               onClick={handleTogglePlan}
               className={`flex-1 py-3 md:py-4 px-4 md:px-6 rounded-xl md:rounded-2xl font-bold flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 ${
                 planned 
                 ? 'bg-neo-sand text-neo-dark hover:bg-white' 
                 : 'bg-neo-lime text-neo-dark hover:bg-white'
               }`}
             >
               {planned ? <Check className="w-4 h-4 md:w-5 md:h-5" /> : <Plus className="w-4 h-4 md:w-5 md:h-5" />}
               <span className="text-sm md:text-base">{planned ? t.details.added : t.details.addToPlan}</span>
             </button>
             
             <Link 
                to={`/place/${place.id}`}
                className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors group/btn active:scale-95"
             >
                <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 text-white group-hover/btn:rotate-45 transition-transform" />
             </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PlaceCard;