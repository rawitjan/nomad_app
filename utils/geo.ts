import { Coordinates } from "../types";

// Radius of the earth in km
const R = 6371; 

const toRad = (value: number) => (value * Math.PI) / 180;

export const calculateDistance = (coord1: Coordinates, coord2: Coordinates): number => {
  const dLat = toRad(coord2.lat - coord1.lat);
  const dLon = toRad(coord2.lng - coord1.lng);
  const lat1 = toRad(coord1.lat);
  const lat2 = toRad(coord2.lat);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  
  return Math.round(d); // Return rounded kilometers
};