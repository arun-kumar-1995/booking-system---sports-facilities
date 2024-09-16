import Facility from "../models/facility.models.js";
import CatchAsyncError from "../utils/catchAsyncError.utils.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendResponse from "../utils/responseHandler.js";

export const createFacilate = async (req, res, next) => {
  // Facility
  return sendResponse(res, 200, "Route hits");
};
