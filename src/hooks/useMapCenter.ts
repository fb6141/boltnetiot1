import { useCallback } from 'react';
import type { Map as LeafletMap, Marker as LeafletMarker } from 'leaflet';

export function useMapCenter(map: LeafletMap, defaultZoom: number) {
  const updateMapCenter = useCallback((
    selectedIds: Set<string>,
    markers: { [key: string]: LeafletMarker }
  ) => {
    if (selectedIds.size === 1) {
      const selectedId = Array.from(selectedIds)[0];
      const marker = markers[selectedId];
      if (marker) {
        map.setView(marker.getLatLng(), defaultZoom);
        marker.openPopup();
      }
    } else if (selectedIds.size > 1) {
      const selectedMarkers = Array.from(selectedIds)
        .map(id => markers[id]?.getLatLng())
        .filter(Boolean);

      if (selectedMarkers.length > 0) {
        const center = selectedMarkers.reduce(
          (acc, latLng) => [acc[0] + latLng.lat, acc[1] + latLng.lng],
          [0, 0]
        ).map(coord => coord / selectedMarkers.length);
        
        map.setView([center[0], center[1]], defaultZoom);
      }
    }
  }, [map, defaultZoom]);

  return { updateMapCenter };
}