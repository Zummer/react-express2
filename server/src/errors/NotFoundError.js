class NotFoundError extends Error {
  constructor(...args) {
    super(...args);
    this.name = this.constructor.name;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NotFoundError);
    }
  }
}

export default NotFoundError;

