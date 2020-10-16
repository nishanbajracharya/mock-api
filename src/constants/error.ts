interface IFirebaseError {
  [key: string]: string;
}

export const FIREBASE_ERROR: IFirebaseError = {
  'auth/user-not-found': 'Username or password is incorrect.',
  'auth/wrong-password': 'Username or password is incorrect.',
};

export const GENERIC_ERROR = 'Something went wrong.';
