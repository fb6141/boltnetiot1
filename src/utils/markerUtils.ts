import { Icon } from 'leaflet';

export const getMarkerColor = (distance: number): string => {
  const percentage = Math.min(100, Math.max(0, distance)) / 100;
  if (percentage <= 0.33) return '#22c55e'; // green-500
  if (percentage <= 0.66) return '#f97316'; // orange-500
  return '#ef4444'; // red-500
};

export const createCustomIcon = (color: string): Icon => {
  return new Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color === '#22c55e' ? 'green' : color === '#f97316' ? 'orange' : 'red'}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};