import { ERROR_MESSAGE } from '../constants/errorMessage';

const isIncorrectPassword = (responseMsg: string) =>
  responseMsg === 'Incorrect password';
const isInvalidUser = (responseMsg: string) =>
  responseMsg === 'Cannot find user';
const isAlreadyExistEmail = (responseMsg: string) =>
  responseMsg === 'Email already exists';

export const validateLoginResponse = (response) => {
  if (isIncorrectPassword(response)) {
    throw new Error(ERROR_MESSAGE.INCORRECT_PASSWORD);
  }

  if (isInvalidUser(response)) {
    throw new Error(ERROR_MESSAGE.CANNOT_FIND_USER);
  }
};

export const validateSignupResponse = (response) => {
  if (isAlreadyExistEmail(response)) {
    throw new Error(ERROR_MESSAGE.EMAIL_ALREADY_EXIST);
  }
};
