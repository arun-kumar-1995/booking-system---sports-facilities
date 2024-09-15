import mongoose from "mongoose";

const CatchAsyncError = (controller) => async (req, res, next) => {
  // start mongoose session
  const session = await mongoose.startSession();
  // begin the transaction
  session.startTransaction();
  try {
    //catch async error and pass to next middleware
    // Pass session to controller
    await Promise.resolve(controller(req, res, next, session));
    // Commit if all succeeds
    await session.commitTransaction();
  } catch (err) {
    // rollback transaction if error happens
    await session.abortTransaction();
    // Pass the error to the next middleware
    next(err);
  } finally {
    // end mongoose session either success or failure
    session.endSession();
  }
};

export default CatchAsyncError;
