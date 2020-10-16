import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import { config } from '../config/firebase';

export const firebase = app.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default {
  app: firebase,
  auth,
  firestore,
};