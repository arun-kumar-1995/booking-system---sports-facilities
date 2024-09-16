import User from "../models/user.models.js";
import CatchAsyncError from "../utils/catchAsyncError.utils.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendResponse from "../utils/responseHandler.js";
import setCookie from "../utils/setCookie.utils.js";

export const signUp = CatchAsyncError(async (req, res, next, session) => {
  //find user by email or phone number
  const user = await User.findOne({
    $or: [{ email: req.body.email }, { phone: parseInt(req.body.phone) }],
  }).lean();

  if (user) return ErrorHandler(res, 409, "user already exists");

  // else create a new user
  await User.create([req.body], { session });
  sendResponse(res, 201, "User registered");
}, true);

export const signIn = async (req, res, next) => {
  // sign in using email and password or phone otp
  // find user
  const user = await User.findOne({ email: req.body.email })
    .select("+password")
    .lean();
  if (!user) return ErrorHandler(res, 404, "user not found");

  //match password
  const isMatch = user.matchPassword(req.body.password);
  if (!isMatch) return ErrorHandler(res, 400, "Invalid email or password");

  //create session cookie
  setCookie(res, user);
  // send response
  sendResponse(res, 200, "You are logged in", { token });
};
