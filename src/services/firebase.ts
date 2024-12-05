import { initializeApp } from '@firebase/app';
import { getDatabase, ref, onValue, off, DatabaseReference, set } from '@firebase/database';
import type { SensorData } from '../types/sensor';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase only if it hasn't been initialized yet
let app;
try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  app = getApp();
}

const db = getDatabase(app);

export class FirebaseService {
  private static sensorsRef: DatabaseReference = ref(db, 'sensors');

  static subscribeSensors(callback: (sensors: SensorData[]) => void): void {
    onValue(this.sensorsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const sensorArray = Object.values(data) as SensorData[];
        callback(sensorArray);
      } else {
        callback([]); // Return empty array if no data
      }
    }, (error) => {
      console.error('Error subscribing to sensors:', error);
    });
  }

  static unsubscribeSensors(): void {
    off(this.sensorsRef);
  }

  static async updateSensorData(sensorId: string, data: Partial<SensorData>): Promise<void> {
    const sensorRef = ref(db, `sensors/${sensorId}`);
    await set(sensorRef, data);
  }
}