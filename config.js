// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from 'firebase/app';
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCV6ixB7m2jDOqIp3xySz6S5uiawz5dKqk",
  authDomain: "windy-nova-393010.firebaseapp.com",
  projectId: "windy-nova-393010",
  storageBucket: "windy-nova-393010.appspot.com",
  messagingSenderId: "995073929255",
  appId: "1:995073929255:web:ce8c57cf5f4b07cfd2de02"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP)