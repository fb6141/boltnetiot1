import { SensorData } from '../types/sensor';

export const sensors: SensorData[] = [
  {
    id: '1',
    name: 'Sensor Alpha',
    location: [37.522915839657514, -120.8539648526561],
    voltage: 3.3,
    distance: 25.7, // Will show green
    lastUpdated: '2024-03-14T12:00:00Z'
  },
  {
    id: '2',
    name: 'Sensor Beta',
    location: [37.527, -120.857],
    voltage: 3.1,
    distance: 45.3, // Will show orange
    lastUpdated: '2024-03-14T12:00:00Z'
  },
  {
    id: '3',
    name: 'Sensor Gamma',
    location: [37.524, -120.853],
    voltage: 3.2,
    distance: 82.9, // Will show red
    lastUpdated: '2024-03-14T12:00:00Z'
  }
];