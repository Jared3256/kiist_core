// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import system_data from "../environment/env.constants.js";
import multer from "multer";
import { getStorage } from"firebase/storage";


const firebaseConfig = {
  apiKey: system_data.FIREBASE_API_KEY,
  authDomain: system_data.FIREBASE_AUTH_DOMAIN,
  projectId: system_data.FIREBASE_PROJECT_ID,
  storageBucket: system_data.FIREBASE_STORAGE_BUCKETS,
  messagingSenderId: system_data.FIREBASE_MESSAGING_SENDER_ID,
  appId: system_data.FIREBASE_APP_ID,
  measurementId: system_data.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const multerStorage = multer.memoryStorage();
const multerUpload = multer({ multerStorage });

const firestore = getStorage(firebaseApp);

export { firebaseApp,  multerUpload,firestore };
