import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, MapPin, Share2, Check, Plus, Play, X, ImageIcon, Globe, Calendar, ExternalLink, Instagram, Youtube } from 'lucide-react';
import L from 'leaflet';
import { PLACES, TRANSLATIONS } from '../constants';
import { useStore } from '../store/useStore';
import { VideoReview } from '../types';

// Custom TikTok Icon
const TikTokIcon = ({ className }: { className?: string }) => (
    <svg 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        stroke="currentColor" 
        strokeWidth="0"
        className={className} 
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z"/>
    </svg>
);

// Simple Leaflet Wrapper to avoid React-Leaflet version conflicts in this environment
const InteractiveMap = ({ lat, lng }: { lat: number; lng: number }) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<L.Map | null>(null);

    useEffect(() => {
        if (!mapRef.current) return;

        if (!mapInstance.current) {
            mapInstance.current = L.map(mapRef.current, {
                scrollWheelZoom: false, // UX: Prevent accidental scrolling
                zoomControl: true
            }).setView([lat, lng], 13);

            L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
                subdomains: 'abcd',
                maxZoom: 20
            }).addTo(mapInstance.current);

            // Custom Icon
            const icon = L.divIcon({
                className: 'custom-icon',
                html: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#CCFF00" stroke="#1A2F23" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
                iconSize: [32, 32],
                iconAnchor: [16, 32]
            });

            L.marker([lat, lng], { icon }).addTo(mapInstance.current);
            
            // Fix for map sizing issues in some layouts
            setTimeout(() => {
                mapInstance.current?.invalidateSize();
            }, 100);
        } else {
            mapInstance.current.setView([lat, lng], 13);
        }

        return () => {
            // Cleanup handled by Leaflet usually, but good practice if needed
        };
    }, [lat, lng]);

    return <div ref={mapRef} className="w-full h-full z-0 outline-none" />;
};

// Video Card Component for Interactive Playback
const VideoCard = ({ video }: { video: VideoReview }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div className="relative aspect-[9/16] rounded-2xl overflow-hidden border border-white/10 bg-black group">
            {!isPlaying ? (
                <button 
                    onClick={() => setIsPlaying(true)}
                    className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors z-10 cursor-pointer"
                >
                    <img 
                        src={video.thumbnailUrl} 
                        alt="Video thumbnail" 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                    
                    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center pl-1 group-hover:scale-110 group-hover:bg-neo-lime group-hover:text-neo-dark group-hover:border-transparent transition-all shadow-2xl">
                        <Play className="w-6 h-6 fill-current" />
                    </div>
                </button>
            ) : (
                <video 
                    src={video.url} 
                    controls 
                    autoPlay
                    className="w-full h-full object-cover"
                    playsInline
                />
            )}
        </div>
    );
};

const PlaceDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language, addToPlan, removeFromPlan, isPlanned } = useStore();
  const t = TRANSLATIONS[language];

  const place = PLACES.find((p) => p.id === id);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showPanorama, setShowPanorama] = useState<string | null>(null); // URL of panorama
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!place) return null;

  const planned = isPlanned(place.id);

  const handleTogglePlan = () => {
    if (planned) removeFromPlan(place.id);
    else addToPlan(place);
  };

  const handleShare = async () => {
    const shareData = {
      title: place.name[language],
      text: place.description[language],
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log('Error sharing', error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    }
  };

  const scrollToMap = () => {
    document.getElementById('map-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const nextLightboxImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
        setLightboxIndex((lightboxIndex + 1) % place.images.length);
    }
  };

  const prevLightboxImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
        setLightboxIndex((lightboxIndex - 1 + place.images.length) % place.images.length);
    }
  };

  const getPlatformIcon = (platform: string) => {
      switch(platform) {
          case 'instagram': return <Instagram className="w-5 h-5" />;
          case 'tiktok': return <TikTokIcon className="w-5 h-5" />;
          case 'youtube': return <Youtube className="w-5 h-5" />;
          default: return <ExternalLink className="w-5 h-5" />;
      }
  };

  return (
    <div className="min-h-screen bg-neo-dark text-white font-sans pb-10">
      
      {/* 3D Panorama Modal */}
      <AnimatePresence>
          {showPanorama && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-[60] bg-black flex flex-col"
              >
                  <button onClick={() => setShowPanorama(null)} className="absolute top-4 right-4 z-50 p-2 bg-white/10 rounded-full hover:bg-white/20">
                      <X className="w-8 h-8 text-white" />
                  </button>
                  <iframe 
                      src={showPanorama}
                      className="w-full h-full border-0"
                      allowFullScreen
                      loading="lazy"
                  ></iframe>
              </motion.div>
          )}
      </AnimatePresence>

      {/* Gallery Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
            <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-[70] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
                onClick={() => setLightboxIndex(null)}
            >
                <button onClick={() => setLightboxIndex(null)} className="absolute top-4 right-4 z-50 p-2 bg-white/10 rounded-full hover:bg-white/20">
                    <X className="w-8 h-8 text-white" />
                </button>

                <div className="relative w-full max-w-6xl max-h-[85vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                    <img 
                        src={place.images[lightboxIndex]} 
                        alt="Full View" 
                        className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                    />
                    
                    {place.images.length > 1 && (
                        <>
                            <button 
                                onClick={prevLightboxImage}
                                className="absolute left-2 md:-left-12 top-1/2 -translate-y-1/2 p-3 bg-white/10 rounded-full hover:bg-neo-lime hover:text-neo-dark transition-colors"
                            >
                                <ArrowLeft className="w-6 h-6" />
                            </button>
                            <button 
                                onClick={nextLightboxImage}
                                className="absolute right-2 md:-right-12 top-1/2 -translate-y-1/2 p-3 bg-white/10 rounded-full hover:bg-neo-lime hover:text-neo-dark transition-colors"
                            >
                                <ArrowRight className="w-6 h-6" />
                            </button>
                        </>
                    )}
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Gallery */}
      <div className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden bg-black">
        <motion.div 
           key={activeImageIndex}
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 0.5 }}
           className="absolute inset-0"
        >
            <img
                src={place.images[activeImageIndex]}
                alt={place.name[language]}
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-neo-dark"></div>
        </motion.div>

        {/* Thumbnail Strip */}
        <div className="absolute bottom-24 right-4 md:right-10 flex gap-2 z-20">
            {place.images.map((img, idx) => (
                <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-12 h-12 md:w-16 md:h-16 rounded-lg overflow-hidden border-2 transition-all ${activeImageIndex === idx ? 'border-neo-lime scale-110' : 'border-white/30 opacity-70 hover:opacity-100'}`}
                >
                    <img src={img} className="w-full h-full object-cover" alt="" />
                </button>
            ))}
        </div>

        {/* Back Button */}
        <button 
            onClick={() => navigate(-1)}
            className="absolute top-20 md:top-24 left-4 md:left-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/20 backdrop-blur-lg border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all z-20 active:scale-95"
        >
            <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>

      {/* Content Sheet */}
      <div className="relative -mt-16 md:-mt-20 z-10 bg-neo-dark rounded-t-[32px] md:rounded-t-[40px] border-t border-white/10 px-5 md:px-12 pt-8 md:pt-12 pb-10 md:pb-24 max-w-6xl mx-auto shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
            <div className="w-full">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 mb-4 rounded-full bg-neo-lime text-neo-dark text-xs font-bold tracking-wider uppercase shadow-[0_0_20px_rgba(204,255,0,0.3)]">
                    <Calendar className="w-3.5 h-3.5" />
                    {t.hero.bestSeason} {place.season[language]}
                </span>
                <h1 className="text-3xl md:text-6xl font-black font-display text-white mb-2 leading-tight md:leading-none">
                    {place.name[language]}
                </h1>
                {/* Replaced static coordinates with scroll-to-map button */}
                <button 
                    onClick={scrollToMap}
                    className="flex items-center text-white/50 text-xs md:text-sm hover:text-neo-lime transition-colors group"
                >
                    <MapPin className="w-3 h-3 md:w-4 md:h-4 mr-1 group-hover:scale-110 transition-transform" />
                    <span>{t.details.interactiveMap} ({place.coordinates.lat.toFixed(4)}, {place.coordinates.lng.toFixed(4)})</span>
                </button>
            </div>
            
            <div className="flex gap-3 w-full md:w-auto mt-2 md:mt-0">
                 <button 
                    onClick={handleShare}
                    className="flex-1 md:flex-none h-12 md:h-14 px-4 md:px-6 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center gap-2 hover:bg-white/10 transition-colors font-semibold active:scale-95"
                 >
                    <Share2 className="w-5 h-5" />
                    <span className="inline md:inline">{t.details.share}</span>
                 </button>
                 <button 
                    onClick={handleTogglePlan}
                    className={`flex-[2] md:flex-none h-12 md:h-14 px-6 md:px-8 rounded-xl md:rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-neo-lime/10 active:scale-95 ${
                        planned 
                        ? 'bg-neo-sand text-neo-dark hover:bg-white' 
                        : 'bg-neo-lime text-neo-dark hover:bg-white'
                    }`}
                 >
                    {planned ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    {planned ? t.details.added : t.details.addToPlan}
                 </button>
            </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            
            {/* Left Col: Desc, Gallery, 3D Views */}
            <div className="md:col-span-2 space-y-10">
                
                {/* Text */}
                <div>
                    <p className="text-base md:text-xl text-white/80 leading-relaxed font-light mb-6">
                        {place.description[language]}
                    </p>
                    {/* Removed Lorem Ipsum */}
                </div>

                {/* Video Reviews Slider */}
                {place.videoReviews && place.videoReviews.length > 0 && (
                    <div className="overflow-hidden">
                        <h3 className="text-xl font-bold font-display mb-4 flex items-center gap-2">
                            <Play className="w-5 h-5 text-neo-lime" />
                            {t.details.videoReviews}
                        </h3>
                        {/* Scroll Container */}
                        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory no-scrollbar">
                            {place.videoReviews.map((video, idx) => (
                                <div key={idx} className="snap-center shrink-0 w-[280px] sm:w-[320px] flex flex-col gap-3">
                                    <VideoCard video={video} />
                                    
                                    {/* Source Credit */}
                                    <a 
                                        href={video.creditUrl} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl p-3 hover:bg-white/10 transition-colors group"
                                    >
                                        <div className="flex items-center gap-2">
                                            {/* Social Icon Circle */}
                                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/80 group-hover:bg-neo-lime group-hover:text-neo-dark transition-colors">
                                                 {getPlatformIcon(video.platform)}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-xs text-white/50 font-medium uppercase tracking-wider">{t.details.source}</span>
                                                <span className="text-sm font-bold text-white group-hover:text-neo-lime transition-colors">
                                                    {video.creditName}
                                                </span>
                                            </div>
                                        </div>
                                        <ExternalLink className="w-4 h-4 text-white/30 group-hover:text-white transition-colors" />
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Photo Gallery Grid */}
                <div>
                    <h3 className="text-xl font-bold font-display mb-4 flex items-center gap-2">
                        <ImageIcon className="w-5 h-5 text-neo-lime" />
                        {t.details.gallery}
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {place.images.map((img, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setLightboxIndex(idx)}
                                className="aspect-square rounded-xl overflow-hidden cursor-pointer border border-white/10 relative group"
                            >
                                <img 
                                    src={img} 
                                    alt="Gallery" 
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* 3D Panorama Cards */}
                {place.panoramas.length > 0 && (
                    <div>
                        <h3 className="text-xl font-bold font-display mb-4 flex items-center gap-2">
                            <Globe className="w-5 h-5 text-neo-lime" />
                            {t.details.panoramas}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {place.panoramas.map((pano, idx) => (
                                <div 
                                    key={idx}
                                    onClick={() => setShowPanorama(pano.embedUrl)}
                                    className="group relative aspect-video rounded-2xl overflow-hidden cursor-pointer border border-white/10"
                                >
                                    <img 
                                        src={pano.thumbnailUrl} 
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        alt="Pano Thumb" 
                                    />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-colors" />
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <div className="bg-white/20 backdrop-blur-md border border-white/40 px-4 py-2 rounded-full flex items-center gap-2">
                                            <Globe className="w-4 h-4 text-white" />
                                            <span className="text-xs font-bold uppercase text-white">{t.details.view3D}</span>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-3 left-3 text-sm font-bold text-white drop-shadow-md">
                                        {pano.title[language]}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Right Col: Map & Info */}
            <div className="md:col-span-1 space-y-8">
                
                {/* Interactive Map */}
                <div id="map-section" className="bg-white/5 rounded-3xl p-2 border border-white/10 shadow-xl scroll-mt-32">
                    <div className="flex items-center justify-between px-4 py-3">
                         <h3 className="text-sm font-bold font-display uppercase tracking-widest text-white/70">{t.details.interactiveMap}</h3>
                         <MapPin className="w-4 h-4 text-neo-lime" />
                    </div>
                    <div className="aspect-[4/5] w-full rounded-2xl overflow-hidden relative z-0">
                         <InteractiveMap lat={place.coordinates.lat} lng={place.coordinates.lng} />
                    </div>
                    <a 
                        href={`https://www.google.com/maps/search/?api=1&query=${place.coordinates.lat},${place.coordinates.lng}`}
                        target="_blank"
                        rel="noreferrer"
                        className="block text-center w-full py-3 mt-2 rounded-xl bg-neo-lime/10 text-neo-lime hover:bg-neo-lime/20 transition-colors text-xs font-bold uppercase tracking-wider"
                    >
                        Open Google Maps App
                    </a>
                </div>

            </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetails;