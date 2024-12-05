import React from 'react';
import { Wifi, CheckSquare, Square } from 'lucide-react';
import { useSensorStore } from '../store/sensorStore';
import { getMarkerColor } from '../utils/markerUtils';

interface SensorListProps {
  onSensorToggle: (sensorId: string) => void;
  selectedSensorIds: Set<string>;
}

export default function SensorList({ onSensorToggle, selectedSensorIds }: SensorListProps) {
  const sensors = useSensorStore((state) => state.sensors);
  
  // Sort sensors by distance in descending order
  const sortedSensors = [...sensors].sort((a, b) => b.distance - a.distance);

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mt-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Sensors by Distance</h2>
        <div className="text-sm text-gray-500">
          {selectedSensorIds.size} selected
        </div>
      </div>
      <div className="space-y-2">
        {sortedSensors.map((sensor) => {
          const markerColor = getMarkerColor(sensor.distance);
          const isSelected = selectedSensorIds.has(sensor.id);
          
          return (
            <button
              key={sensor.id}
              onClick={() => onSensorToggle(sensor.id)}
              className={`w-full text-left p-3 rounded-lg transition-all ${
                isSelected
                  ? 'bg-indigo-50 ring-1 ring-indigo-500'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    {isSelected ? (
                      <CheckSquare className="h-5 w-5 text-indigo-600" />
                    ) : (
                      <Square className="h-5 w-5 text-gray-400" />
                    )}
                    <Wifi className="h-5 w-5" style={{ color: markerColor }} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{sensor.name}</h3>
                    <p className="text-sm text-gray-500">
                      <span style={{ color: markerColor }} className="font-medium">
                        {sensor.distance}m
                      </span>
                      {' • '}
                      {sensor.voltage}V
                    </p>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(sensor.lastUpdated).toLocaleTimeString()}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}