import { auth, firebase } from './firebase';

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

export default {
  login,
  logout,
  loginWithGoogle,
  linkGoogleAccount,
};
