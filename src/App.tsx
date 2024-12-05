import React, { useEffect } from 'react';
import Header from './components/Header';
import SensorMap from './components/SensorMap';
import SensorList from './components/SensorList';
import { useSensorSelection } from './hooks/useSensorSelection';
import { useSensorStore } from './store/sensorStore';

export default function App() {
  const { selectedSensorIds, toggleSensor } = useSensorSelection();
  const initializeRealtimeUpdates = useSensorStore((state) => state.initializeRealtimeUpdates);
  const cleanup = useSensorStore((state) => state.cleanup);

  useEffect(() => {
    initializeRealtimeUpdates();
    return cleanup;
  }, [initializeRealtimeUpdates, cleanup]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <SensorMap selectedSensorIds={selectedSensorIds} />
          </div>
          <SensorList 
            onSensorToggle={toggleSensor}
            selectedSensorIds={selectedSensorIds}
          />
        </div>
      </main>
    </div>
  );
}