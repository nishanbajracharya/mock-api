import { User } from 'firebase';

import { auth, firebase } from './firebase';
import { GUEST_USER } from '../constants/user';

export function login(email: string, password: string) {
  return auth.signInWithEmailAndPassword(email, password);
}

export function logout() {
  return auth.signOut();
}

export function loginWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('email');

  return auth.signInWithPopup(provider);
}

export function linkGoogleAccount() {
  const provider = new firebase.auth.GoogleAuthProvider();

  return auth.currentUser?.linkWithPopup(provider);
}

export function loginAsGuest() {
  return login(GUEST_USER.EMAIL, GUEST_USER.PASSWORD);
}

export function isGuest(user: User | undefined) {
  return user?.email === GUEST_USER.EMAIL;
}

export default {
  login,
  logout,
  isGuest,
  loginAsGuest,
  loginWithGoogle,
  linkGoogleAccount,
};
