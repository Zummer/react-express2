class InvalidCredError extends Error {
  constructor(...args) {
    super(...args);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, InvalidCredError);
  }
}

export default InvalidCredError;

