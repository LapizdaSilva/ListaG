import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCuCUbvHAwPkyikc37bIm93ssNkh5dwsH0',
  projectId: 'gestor-1dfc4',
  storageBucket: 'gestor-1dfc4.firebasestorage.app',
  messagingSenderId: '390047195871',
  appId: '1:390047195871:web:ed7b57d5f312157923bf6a'
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export default app;