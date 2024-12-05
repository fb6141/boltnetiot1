import { useState, useCallback } from 'react';

export function useSensorSelection() {
  const [selectedSensorIds, setSelectedSensorIds] = useState<Set<string>>(new Set());

  const toggleSensor = useCallback((sensorId: string) => {
    setSelectedSensorIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sensorId)) {
        newSet.delete(sensorId);
      } else {
        newSet.add(sensorId);
      }
      return newSet;
    });
  }, []);

  return {
    selectedSensorIds,
    toggleSensor
  };
}