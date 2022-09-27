import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBmqpVO-BxhJjhDxSYDiH5Lp-gj6c1V3CA',
  authDomain: 'arctube-6cb09.firebaseapp.com',
  projectId: 'arctube-6cb09',
  storageBucket: 'arctube-6cb09.appspot.com',
  messagingSenderId: '195246088345',
  appId: '1:195246088345:web:e31cd3220994436c20d808',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
