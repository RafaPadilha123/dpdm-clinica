import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyDpO-S_3lwlcp-gvD8hvCRi27dV4iqOz1o",
  authDomain: "espaco-morada.firebaseapp.com",
  projectId: "espaco-morada",
  storageBucket: "espaco-morada.appspot.com",
  messagingSenderId: "612039547811",
  appId: "1:612039547811:web:97c160b721e1f7e5ca5816",
  measurementId: "G-SZR72LKPSP"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let analytics;
isSupported().then((yes) => {
  if (yes) analytics = getAnalytics(app);
});

export { auth, db, analytics };
