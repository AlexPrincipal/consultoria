// Configuración de Firebase - funciona tanto en local como en producción
const isDev = process.env.NODE_ENV === 'development';

export const firebaseConfig = {
  apiKey: isDev ? "AIzaSyCnF_MlhDwxPx3IO53HnB-3tW03E8nXXek" : process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: isDev ? "studio-3427277360-60843.firebaseapp.com" : process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: isDev ? "studio-3427277360-60843" : process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: isDev ? "studio-3427277360-60843.appspot.com" : process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: isDev ? "815018812396" : process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: isDev ? "1:815018812396:web:1ed8da39fb91ad36de16c9" : process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || ""
};
