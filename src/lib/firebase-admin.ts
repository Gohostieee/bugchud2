import admin from 'firebase-admin';

// Check if Firebase admin is not already initialized
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(process.env.firebase_admin_key || "")),
      databaseURL: "https://mmm2-c6151-default-rtdb.firebaseio.com",
    });
  } catch (error) {
    console.log('Firebase admin initialization error', error);
  }
}

export const firestore = admin.firestore();
export const database = admin.database();
export const auth = admin.auth(); 