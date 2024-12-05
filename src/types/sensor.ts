export interface SensorData {
  id: string;
  name: string;
  location: [number, number];
  voltage: number;
  distance: number;
  lastUpdated: string;
}