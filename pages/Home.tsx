import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight, Locate, Search, SlidersHorizontal, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import PlaceCard from '../components/PlaceCard';
import { PLACES, TRANSLATIONS, ALMATY_COORDINATES } from '../constants';
import { useStore } from '../store/useStore';
import { calculateDistance } from '../utils/geo';
import { Coordinates } from '../types';

const ITEMS_PER_PAGE = 16;

type SortOption = 'trending' | 'nearest' | 'name';

const Home: React.FC = () => {
  const { language } = useStore();
  const t = TRANSLATIONS[language];
  
  const trendingPlaces = PLACES.filter(p => p.isTrending);
  
  // Slider State
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1); // 1 for mobile, 3 for desktop

  // Geolocation State for Home Page Grid
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [locationStatus, setLocationStatus] = useState<'loading' | 'found' | 'denied'>('loading');

  // Filter & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('trending');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Parallax Hooks
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 1000], [0, -300]); // Moves up slower than scroll (parallax)
  const textY = useTransform(scrollY, [0, 1000], [0, 400]); // Text moves down (opposing parallax)
  const opacity = useTransform(scrollY, [0, 600], [1, 0.2]); // Fade out background on scroll

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
            // Quietly fail to fallback on home page
            setLocationStatus('denied');
        }
    );
  }, []);

  const origin = userLocation || ALMATY_COORDINATES;

  // Simple resize listener to change visible count
  useEffect(() => {
    const handleResize = () => {
        if (window.innerWidth >= 1024) {
            setVisibleCount(3);
        } else {
            setVisibleCount(1);
        }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setStartIndex((prev) => (prev + 1) % trendingPlaces.length);
  };

  const prevSlide = () => {
    setStartIndex((prev) => (prev - 1 + trendingPlaces.length) % trendingPlaces.length);
  };

  // Get visible items based on startIndex and visibleCount
  const getVisibleItems = () => {
      const items = [];
      for (let i = 0; i < visibleCount; i++) {
          const index = (startIndex + i) % trendingPlaces.length;
          items.push(trendingPlaces[index]);
      }
      return items;
  };

  // Active place for background
  const activePlace = trendingPlaces[startIndex];

  // --- Filtering & Sorting Logic ---
  const filteredPlaces = useMemo(() => {
    let result = [...PLACES];

    // Search Filter
    if (searchQuery) {
        const query = searchQuery.toLowerCase();
        result = result.filter(place => 
            place.name[language].toLowerCase().includes(query) ||
            place.locationLabel[language].toLowerCase().includes(query)
        );
    }

    // Sort
    result.sort((a, b) => {
        if (sortBy === 'trending') {
            return (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0);
        } else if (sortBy === 'nearest') {
            return calculateDistance(origin, a.coordinates) - calculateDistance(origin, b.coordinates);
        } else if (sortBy === 'name') {
            return a.name[language].localeCompare(b.name[language]);
        }
        return 0;
    });

    return result;
  }, [searchQuery, sortBy, language, origin]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredPlaces.length / ITEMS_PER_PAGE);
  const currentItems = filteredPlaces.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  // Reset page on search change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortBy]);

  const handlePageChange = (newPage: number) => {
      if (newPage >= 1 && newPage <= totalPages) {
          setCurrentPage(newPage);
          document.getElementById('destinations-grid')?.scrollIntoView({ behavior: 'smooth' });
      }
  };

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden pt-16 md:pt-24 bg-neo-dark">
      
      {/* Hero Background with Parallax */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <AnimatePresence mode='popLayout'>
            <motion.div 
                key={activePlace.id}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                style={{ y: backgroundY, opacity }}
                className="absolute top-0 left-0 w-full h-[85vh]"
            >
                 <div className="absolute inset-0 bg-gradient-to-b from-neo-dark/60 via-neo-dark/80 to-neo-dark z-10" />
                 <img 
                    src={activePlace.images[0]} 
                    alt="Background" 
                    className="w-full h-full object-cover blur-[2px] opacity-60"
                 />
            </motion.div>
          </AnimatePresence>
          
          <motion.h1 
            style={{ y: textY, opacity }}
            className="absolute top-[25%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[20vw] font-display font-black text-white/5 whitespace-nowrap select-none z-0"
          >
            NOMAD
         </motion.h1>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 pb-20">
        
        {/* SECTION 1: TRENDING SLIDER */}
        <div className="mb-24">
            <div className="flex justify-between items-end mb-8 px-2">
                <h2 className="text-3xl md:text-5xl font-black font-display text-white">
                    {t.hero.trending}
                </h2>
                <div className="flex gap-2">
                    <button onClick={prevSlide} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-neo-lime hover:text-neo-dark hover:border-transparent transition-all">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <button onClick={nextSlide} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-neo-lime hover:text-neo-dark hover:border-transparent transition-all">
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="relative overflow-hidden min-h-[55vh] md:min-h-[500px]">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode='popLayout'>
                        {getVisibleItems().map((place) => (
                            <motion.div
                                key={`${place.id}-${startIndex}`} // Unique key for animation on slide change
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.5, ease: "circOut" }}
                            >
                                <PlaceCard place={place} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
            
            {/* Mobile Indicators */}
            <div className="lg:hidden flex justify-center gap-2 mt-6">
                {trendingPlaces.map((_, idx) => (
                    <div 
                        key={idx} 
                        onClick={() => setStartIndex(idx)}
                        className={`h-1 cursor-pointer rounded-full transition-all duration-300 ${idx === startIndex ? 'w-6 bg-neo-lime' : 'w-2 bg-white/20'}`}
                    />
                ))}
            </div>
        </div>

        {/* SECTION 2: ALL DESTINATIONS GRID WITH FILTER */}
        <div id="destinations-grid">
            <div className="px-2 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
                 <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white/90">
                        {t.hero.allDestinations}
                    </h2>
                    <div className="h-1 w-20 bg-neo-lime mt-2 rounded-full"></div>
                 </div>
                 
                 {/* Search & Filter Controls */}
                 <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                     {/* Search Input */}
                     <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-neo-lime transition-colors" />
                        <input 
                            type="text" 
                            placeholder={t.filter.searchPlaceholder}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full sm:w-64 pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm outline-none focus:border-neo-lime/50 focus:bg-white/10 transition-all placeholder:text-white/20"
                        />
                     </div>

                     {/* Sort Dropdown */}
                     <div className="relative">
                         <button 
                            onClick={() => setIsSortOpen(!isSortOpen)}
                            className="w-full sm:w-40 flex items-center justify-between px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm hover:bg-white/10 transition-colors"
                         >
                            <div className="flex items-center gap-2">
                                <SlidersHorizontal className="w-4 h-4 text-white/60" />
                                <span>
                                    {sortBy === 'trending' && t.filter.sortTrending}
                                    {sortBy === 'nearest' && t.filter.sortNearest}
                                    {sortBy === 'name' && t.filter.sortName}
                                </span>
                            </div>
                            <ChevronDown className={`w-4 h-4 text-white/40 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
                         </button>

                         <AnimatePresence>
                             {isSortOpen && (
                                 <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute right-0 top-full mt-2 w-full sm:w-48 bg-neo-dark border border-white/10 rounded-xl shadow-xl overflow-hidden z-20"
                                 >
                                     {[
                                         { key: 'trending', label: t.filter.sortTrending },
                                         { key: 'nearest', label: t.filter.sortNearest },
                                         { key: 'name', label: t.filter.sortName }
                                     ].map((opt) => (
                                         <button
                                            key={opt.key}
                                            onClick={() => {
                                                setSortBy(opt.key as SortOption);
                                                setIsSortOpen(false);
                                            }}
                                            className={`w-full text-left px-4 py-3 text-sm hover:bg-white/5 transition-colors ${sortBy === opt.key ? 'text-neo-lime font-bold' : 'text-white/70'}`}
                                         >
                                             {opt.label}
                                         </button>
                                     ))}
                                 </motion.div>
                             )}
                         </AnimatePresence>
                     </div>
                 </div>
            </div>

            {/* Location Status (Only show if sorting by nearest or available) */}
            {userLocation && (
                <div className="px-2 mb-4 flex justify-end">
                     <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                        <Locate className="w-3 h-3 text-neo-lime" />
                        <span className="text-xs text-white/60">
                            {t.planner.distanceFromYou}
                        </span>
                     </div>
                </div>
            )}
           
            {/* Grid */}
            {filteredPlaces.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 min-h-[400px]">
                    {currentItems.map((place) => {
                        const dist = calculateDistance(origin, place.coordinates);
                        const label = locationStatus === 'found' ? t.planner.distanceFromYou : t.planner.distanceFromAlmaty;
                        return (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }}
                                key={place.id}
                            >
                                <PlaceCard 
                                    place={place} 
                                    compact 
                                    distance={dist}
                                    distanceLabel={label}
                                />
                            </motion.div>
                        );
                    })}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-white/40 border border-dashed border-white/10 rounded-2xl">
                    <Search className="w-12 h-12 mb-4 opacity-50" />
                    <p>{t.filter.noResults}</p>
                </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 mt-12">
                    <button 
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="w-10 h-10 rounded-lg flex items-center justify-center border border-white/10 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                    >
                        <ChevronLeft className="w-5 h-5 text-white" />
                    </button>
                    
                    <span className="text-sm text-white/60 font-mono">
                        {t.filter.page} <span className="text-neo-lime font-bold">{currentPage}</span> / {totalPages}
                    </span>

                    <button 
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="w-10 h-10 rounded-lg flex items-center justify-center border border-white/10 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                    >
                        <ChevronRight className="w-5 h-5 text-white" />
                    </button>
                </div>
            )}
        </div>

      </div>
    </div>
  );
};

export default Home;