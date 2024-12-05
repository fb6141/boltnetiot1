import { create } from 'zustand';
import type { SensorData } from '../types/sensor';
import { FirebaseService } from '../services/firebase';
import { sensors as initialSensors } from '../data/mockSensors';

interface SensorStore {
  sensors: SensorData[];
  updateSensor: (id: string, data: Partial<SensorData>) => void;
  addSensor: (sensor: SensorData) => void;
  initializeRealtimeUpdates: () => void;
  cleanup: () => void;
}

export const useSensorStore = create<SensorStore>((set) => ({
  sensors: initialSensors,
  updateSensor: (id, data) =>
    set((state) => ({
      sensors: state.sensors.map((sensor) =>
        sensor.id === id ? { ...sensor, ...data } : sensor
      ),
    })),
  addSensor: (sensor) =>
    set((state) => ({
      sensors: [...state.sensors, sensor],
    })),
  initializeRealtimeUpdates: () => {
    FirebaseService.subscribeSensors((sensors) => {
      set({ sensors });
    });
  },
  cleanup: () => {
    FirebaseService.unsubscribeSensors();
  },
}));