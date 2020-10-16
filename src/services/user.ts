import { auth } from './firebase';

export function login(email: string, password: string) {
  return auth.signInWithEmailAndPassword(email, password);
}

export function logout() {
  return auth.signOut();
}

export default {
  login,
  logout,
};
