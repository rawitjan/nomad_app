import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import { MapPin, Navigation, ArrowRight } from 'lucide-react';
import { PLACES, TRANSLATIONS, ALMATY_COORDINATES } from '../constants';
import { useStore } from '../store/useStore';
import { calculateDistance } from '../utils/geo';
import { Coordinates } from '../types';

const WorldMap: React.FC = () => {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<L.Map | null>(null);
    const { language } = useStore();
    const navigate = useNavigate();
    const t = TRANSLATIONS[language];
    
    // User Location
    const [userLocation, setUserLocation] = useState<Coordinates | null>(null);

    // Get Location
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                },
                (err) => console.warn("Geo access denied", err)
            );
        }
    }, []);

    const origin = userLocation || ALMATY_COORDINATES;

    // Initialize Map
    useEffect(() => {
        if (!mapRef.current) return;

        // Initialize only if not already present
        if (!mapInstance.current) {
            const map = L.map(mapRef.current, {
                zoomControl: false,
                attributionControl: false
            }).setView([48.0196, 66.9237], 5); // Center on Kazakhstan

            // Dark Matter Basemap
            L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
                subdomains: 'abcd',
                maxZoom: 19
            }).addTo(map);

            L.control.zoom({ position: 'bottomright' }).addTo(map);
            
            mapInstance.current = map;
        }

        const map = mapInstance.current;

        // Clear existing layers (except tiles)
        map.eachLayer((layer) => {
            if (layer instanceof L.Marker) {
                map.removeLayer(layer);
            }
        });

        // Add Markers
        PLACES.forEach((place) => {
            // Calculate distance
            const dist = calculateDistance(origin, place.coordinates);
            
            // Custom HTML Icon
            const iconHtml = `
                <div class="relative flex items-center justify-center w-8 h-8 group">
                    <div class="absolute inset-0 bg-neo-lime/30 rounded-full animate-ping"></div>
                    <div class="relative z-10 w-4 h-4 bg-neo-lime rounded-full shadow-[0_0_10px_#CCFF00] border-2 border-neo-dark transition-transform hover:scale-150"></div>
                </div>
            `;

            const icon = L.divIcon({
                className: 'custom-marker',
                html: iconHtml,
                iconSize: [32, 32],
                iconAnchor: [16, 16],
                popupAnchor: [0, -20] // Lift popup clearly above marker
            });

            // Popup Content
            const popupContent = document.createElement('div');
            popupContent.className = 'min-w-[200px] bg-neo-dark text-white p-2 rounded-lg font-sans'; // Increased padding
            popupContent.innerHTML = `
                <div class="flex items-start gap-3 p-1">
                    <img src="${place.images[0]}" class="w-12 h-12 rounded-lg object-cover bg-white/10" />
                    <div>
                        <h3 class="font-bold text-sm text-white leading-tight mb-1">${place.name[language]}</h3>
                        <div class="flex items-center gap-1 text-[10px] text-neo-lime font-mono">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg>
                            ${dist} ${t.planner.km}
                        </div>
                    </div>
                </div>
                <button id="btn-${place.id}" class="mt-2 w-full bg-white/10 hover:bg-white/20 text-xs font-bold py-1.5 rounded-md text-center transition-colors flex items-center justify-center gap-1">
                    ${t.details.viewDetails}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
            `;

            const marker = L.marker([place.coordinates.lat, place.coordinates.lng], { icon })
                .addTo(map)
                .bindPopup(popupContent, {
                    closeButton: false,
                    className: 'neo-popup',
                    offset: [0, 0] // Anchor handles offset now
                });

            // Handle button click inside popup
            marker.on('popupopen', () => {
                const btn = document.getElementById(`btn-${place.id}`);
                if (btn) {
                    btn.onclick = () => {
                        navigate(`/place/${place.id}`);
                    };
                }
            });
        });

    }, [language, origin, userLocation, navigate, t]);

    return (
        <div className="w-full h-screen pt-20 relative bg-neo-dark">
            <div className="absolute top-24 left-4 z-10 bg-neo-dark/80 backdrop-blur-md border border-white/10 p-4 rounded-xl max-w-xs pointer-events-none md:pointer-events-auto">
                 <h1 className="text-2xl font-black font-display text-white mb-1 flex items-center gap-2">
                    <MapPin className="text-neo-lime" />
                    {t.nav.map}
                 </h1>
                 <p className="text-xs text-white/60">
                    Explore all destinations on the map. Click a marker to see distance and details.
                 </p>
                 {!userLocation && (
                     <div className="mt-2 flex items-center gap-2 text-[10px] text-neo-sand bg-white/5 p-2 rounded-lg">
                        <Navigation className="w-3 h-3" />
                        Using Almaty as reference point
                     </div>
                 )}
            </div>
            
            <div ref={mapRef} className="w-full h-full z-0" />

            <style>{`
                .leaflet-popup-content-wrapper {
                    background: #1A2F23;
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 12px;
                    padding: 0;
                    overflow: hidden;
                }
                .leaflet-popup-tip {
                    background: #1A2F23;
                    border-top: 1px solid rgba(255,255,255,0.1);
                }
                .leaflet-popup-content {
                    margin: 0; /* Remove default margin to let inner div handle padding */
                }
            `}</style>
        </div>
    );
};

export default WorldMap;