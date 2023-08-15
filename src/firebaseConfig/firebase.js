import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyA5zthMJUkpRzd_yFiJpRz5klaowEc5rJA",
  authDomain: "crud-fire-react-91495.firebaseapp.com",
  projectId: "crud-fire-react-91495",
  storageBucket: "crud-fire-react-91495.appspot.com",
  messagingSenderId: "131921415791",
  appId: "1:131921415791:web:7d06f01bfce4f3c66e479a"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)