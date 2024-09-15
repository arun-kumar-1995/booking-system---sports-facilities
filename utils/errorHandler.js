class ErrorHandler extends Error {
  constructor(statusCode, message) {
    //pass message to parent class error
    super(message);
    this.statusCode = statusCode;
  }
}

export default ErrorHandler;
