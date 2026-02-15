import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBFYMvCo-qgDNSD0MEShL43cAriDn7tVTw",
  authDomain: "tesoro-52415.firebaseapp.com",
  projectId: "tesoro-52415",
  storageBucket: "tesoro-52415.appspot.com",
  messagingSenderId: "483303461097",
  appId: "1:483303461097:web:faadb67523cfbe4d71a078",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
