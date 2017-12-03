export default class InvalidCredError extends Error {
  constructor(message) {
    super(); // (A)
    this.name = 'InvalidCredError';
    this.message = message;
    Error.captureStackTrace(this, InvalidCredError); // added
  }
}

