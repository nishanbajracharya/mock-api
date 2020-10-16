import { FIREBASE_ERROR, GENERIC_ERROR } from '../constants/error';

export type ErrorProp = {
  code?: string;
  message?: string;
};

export function getErrorMessage(error: ErrorProp) {
  if (error.code) {
    return FIREBASE_ERROR[error.code] || error.message || GENERIC_ERROR;
  }

  return error.message || GENERIC_ERROR;
}
