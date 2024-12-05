import React, { useRef, useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import type { Marker as LeafletMarker } from 'leaflet';
import { useSensorStore } from '../store/sensorStore';
import { MapMarker } from './map/MapMarker';
import { useMapCenter } from '../hooks/useMapCenter';

import 'leaflet/dist/leaflet.css';

function MapController({ selectedIds }: { selectedIds: Set<string> }) {
  const map = useMap();
  const markers = useRef<{ [key: string]: LeafletMarker }>({});
  const { updateMapCenter } = useMapCenter(map, 15);

  useEffect(() => {
    updateMapCenter(selectedIds, markers.current);
  }, [selectedIds, updateMapCenter]);

  const handleMarkerRef = useCallback((id: string, marker: LeafletMarker) => {
    markers.current[id] = marker;
  }, []);

  return null;
}

interface SensorMapProps {
  selectedSensorIds: Set<string>;
}

export default function SensorMap({ selectedSensorIds }: SensorMapProps) {
  const sensors = useSensorStore((state) => state.sensors);
  const handleMarkerRef = useCallback((id: string, marker: LeafletMarker) => {
    // This is needed to properly type the marker reference
    if (marker) {
      return marker;
    }
  }, []);

  return (
    <div className="map-container">
      <MapContainer
        center={[37.525978249222725, -120.85551660912895]}
        zoom={15}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.maxar.com">Maxar</a>'
          url="https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />
        <MapController selectedIds={selectedSensorIds} />
        {sensors.map((sensor) => (
          <MapMarker
            key={sensor.id}
            sensor={sensor}
            isSelected={selectedSensorIds.has(sensor.id)}
            onMarkerRef={handleMarkerRef}
          />
        ))}
      </MapContainer>
    </div>
  );
}