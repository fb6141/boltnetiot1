import { Handler } from '@netlify/functions';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

// Initialize Firebase only if it hasn't been initialized yet
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getDatabase(app);

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const payload = JSON.parse(event.body || '{}');
    const {
      end_device_ids: { device_id },
      uplink_message: {
        decoded_payload: { voltage, distance },
        received_at,
      },
    } = payload;

    const sensorRef = ref(db, `sensors/${device_id}`);
    await set(sensorRef, {
      id: device_id,
      name: `Sensor ${device_id}`,
      voltage,
      distance,
      lastUpdated: received_at,
      location: [37.525978249222725, -120.85551660912895], // Default location, update as needed
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Data updated successfully' }),
    };
  } catch (error) {
    console.error('Error processing webhook:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to process webhook' }),
    };
  }
}