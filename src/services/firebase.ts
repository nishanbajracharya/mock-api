import firebaseApp from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import { config } from '../config/firebase';

export const app = firebaseApp.initializeApp(config);
export const auth = app.auth();
export const firestore = app.firestore();
export const firebase = firebaseApp;

const firebaseService = {
  app,
  auth,
  firestore,
  firebase: firebaseApp,
};

export default firebaseService;
