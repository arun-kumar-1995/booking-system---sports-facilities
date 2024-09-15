import User from "../models/user.models.js";
import CatchAsyncError from "../utils/catchAsyncError.utils.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendResponse from "../utils/responseHandler.js";

export const signUp = CatchAsyncError(async (req, res, next) => {
  //find user by email or phone number
  const user = await User.findOne({
    $or: [{ email: req.body.email }, { phone: parseInt(req.body.phone) }],
  }).lean();

  if (user) throw new ErrorHandler(409, "user already exists");

  // else create a new user
  await User.create(req.body);
  sendResponse(res, 201, "User registered");
});
