import type { TTNUplink } from '../types/ttn';
import { useSensorStore } from '../store/sensorStore';

export async function handleTTNWebhook(data: TTNUplink) {
  const { updateSensor } = useSensorStore.getState();
  const {
    end_device_ids: { device_id },
    uplink_message: {
      decoded_payload: { voltage, distance },
      received_at,
    },
  } = data;

  updateSensor(device_id, {
    voltage,
    distance,
    lastUpdated: received_at,
  });
}