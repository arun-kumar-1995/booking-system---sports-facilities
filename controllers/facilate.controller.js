import Facility from "../models/facility.models.js";
import CatchAsyncError from "../utils/catchAsyncError.utils.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendResponse from "../utils/responseHandler.js";

export const createFacilate = CatchAsyncError(async (req, res, next) => {
  const { name, type } = req.body;

  if (!type) return ErrorHandler(res, 400, "Facilate type is required");

  let facility = await Facility.findOne({
    $and: [{ name, type }],
  }).lean();

  if (facility)
    return ErrorHandler(res, 400, "This name facility is already exists");

  facility = await Facility.create({
    ...req.body,
    "pricing.regularPrice": req.body.price,
    managedBy: req.user._id,
  });

  return sendResponse(res, 201, "Facility created");
}, true);


