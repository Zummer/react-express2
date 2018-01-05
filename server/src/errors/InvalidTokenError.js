class InvalidTokenError extends Error {
  constructor(...args) {
    super(...args);
    this.name = this.constructor.name;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InvalidTokenError);
    }
  }
}

export default InvalidTokenError;

