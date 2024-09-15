const CatchAsyncError = (controller) => (req, res, next) => {
  try {
    //catch async error and pass to next middleware
    Promise.resolve(controller(req, res, next)).catch(next);
  } catch (err) {
    // catch synchronous error and pass to next middleware
    // happerns when this function is invoked
    next(err);
  }
};

export default CatchAsyncError;
