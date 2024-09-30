import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAGWsgj7jXWvHm_Hsrnwo-8PYzsQ2AMaiw",
  authDomain: "altec-school-monitor.firebaseapp.com",
  databaseURL: "https://altec-school-monitor-default-rtdb.firebaseio.com",
  projectId: "altec-school-monitor",
  storageBucket: "altec-school-monitor.appspot.com",
  messagingSenderId: "517523341179",
  appId: "1:517523341179:web:2bfc397d0f71e15ef707de"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth,db,storage,firebaseConfig };
