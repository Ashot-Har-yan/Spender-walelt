import { initializeApp } from "firebase/app";
import { getAuth} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCtDGaj3EgyhPZWaFul2lk3eTS6O7bHhLw",
  authDomain: "spender-wallet.firebaseapp.com",
  projectId: "spender-wallet",
  storageBucket: "spender-wallet.firebasestorage.app",
  messagingSenderId: "215116785850",
  appId: "1:215116785850:web:81bfa3cefbd78ea5f57a83",
  measurementId: "G-J3MHH08BJF"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
export {
    auth,
    db
}