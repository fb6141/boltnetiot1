import { Marker, Popup } from 'react-leaflet';
import { Wifi } from 'lucide-react';
import type { SensorData } from '../../types/sensor';
import { createCustomIcon } from '../../utils/markerUtils';
import { getMarkerColor } from '../../utils/markerUtils';

interface MapMarkerProps {
  sensor: SensorData;
  isSelected: boolean;
  onMarkerRef: (id: string, marker: any) => void;
}

export function MapMarker({ sensor, isSelected, onMarkerRef }: MapMarkerProps) {
  const markerColor = getMarkerColor(sensor.distance);
  
  return (
    <Marker 
      position={sensor.location}
      icon={createCustomIcon(markerColor)}
      ref={(ref) => {
        if (ref) {
          onMarkerRef(sensor.id, ref);
          ref._icon?.classList.add('transition-all', 'duration-300');
          if (isSelected) {
            ref._icon?.classList.add('scale-125', 'z-50');
          } else {
            ref._icon?.classList.remove('scale-125', 'z-50');
          }
        }
      }}
    >
      <Popup>
        <div className="p-2">
          <div className="flex items-center space-x-2 mb-2">
            <Wifi className="h-4 w-4" style={{ color: markerColor }} />
            <h3 className="font-semibold text-gray-900">{sensor.name}</h3>
          </div>
          <div className="space-y-1">
            <p className="text-sm">
              <span className="font-medium text-gray-600">Voltage:</span>{' '}
              <span className="text-gray-900">{sensor.voltage}V</span>
            </p>
            <p className="text-sm">
              <span className="font-medium text-gray-600">Distance:</span>{' '}
              <span style={{ color: markerColor }} className="font-medium">
                {sensor.distance}m
              </span>
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Last updated: {new Date(sensor.lastUpdated).toLocaleString()}
            </p>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}