import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDa32Ls7NG1LrgwK6MU6ECzJndUPMGiPRU",
  authDomain: "my-portofolio-bc2c1.firebaseapp.com",
  databaseURL: "https://my-portofolio-bc2c1-default-rtdb.firebaseio.com",
  projectId: "my-portofolio-bc2c1",
  storageBucket: "my-portofolio-bc2c1.firebasestorage.app",
  messagingSenderId: "985022183868",
  appId: "1:985022183868:web:0a778e95f68946381793b9",
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Inisialisasi Realtime Database dan ekspor sebagai `db`
const db = getDatabase(app);
export { db };
