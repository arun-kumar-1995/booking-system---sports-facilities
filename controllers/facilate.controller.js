import Facility from "../models/facility.models.js";
import CatchAsyncError from "../utils/catchAsyncError.utils.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendResponse from "../utils/responseHandler.js";

export const createFacilate = CatchAsyncError(
  async (req, res, next, session) => {
    const { name, type } = req.body;

    if (!type) return ErrorHandler(res, 400, "Facilate type is required");

    let facility = await Facility.findOne({
      $and: [{ name, type }],
    }).lean();

    if (facility)
      return ErrorHandler(res, 400, "This name facility is already exists");

    facility = await Facility.create(
      [
        {
          ...req.body,
          "pricing.regularPrice": req.body.price,
          managedBy: req.user._id,
        },
      ],
      { session }
    );

    return sendResponse(res, 201, "Facility created");
  },
  true
);

export const addPeakHours = CatchAsyncError(async (req, res, next) => {
  const { facilateId, peakPrice, peakHours } = req.body;

  if (!facilateId) return ErrorHandler(res, 400, "Facilate Id is required");

  if (!peakPrice)
    return ErrorHandler(res, 400, "Provide peak Price for peak hours");

  // if peak price is provided the pass peakHours
  if (peakPrice && (!peakHours || peakHours.length === 0)) {
    return ErrorHandler(res, 400, "Select Peak hours.");
  }

  // check for valid peakHours
  if (peakHours && Array.isArray(peakHours) && peakHours.length > 0) {
    const isValidPeakHours = peakHours.every(({ startTime, endTime }) => {
      if (!startTime || !endTime) {
        ErrorHandler(
          res,
          400,
          "Peak Hours must have both startTime and endTime"
        );
        return false;
      }

      if (new Date(startTime) >= new Date(endTime)) {
        ErrorHandler(res, 400, "startTime must be less than endTime");
        return false;
      }
      return true;
    });

    if (!isValidPeakHours) return ErrorHandler(res, 400, "Invalid peak hours");
  }

  const facilate = await Facility.findByIdAndUpdate(
    facilateId,
    {
      $set: { "pricing.peakPrice": peakPrice }, // Ensure peakPrice is updated
      $addToSet: { peakHours: { $each: peakHours } }, // Ensure no duplicates
    },
    {
      new: true,
      upsert: true,
    }
  );

  if (!facilate) return ErrorHandler(res, 400, "We don't found a facilate");

  return sendResponse(res, 200, "Peak hours added");
}, true);

export const addAvailability = CatchAsyncError(async (req, res, next) => {
  const { facilateId, availability } = req.body;

  if (!facilateId) return ErrorHandler(res, 400, "Facilate Id is required");

  if (availability && availability.length === 0)
    return ErrorHandler(res, 400, "Select availability");

  if (availability && Array.isArray(availability) && availability.length > 0) {
    const isValidAvailability = availability.every(({ date, timeSlots }) => {
      if (!date) {
        ErrorHandler(res, 400, "Select availability date");
        return false;
      }

      // Validate startTime and endTime in each timeSlot
      Array.isArray(timeSlots) &&
        timeSlots.every(({ startTime, endTime }) => {
          if (!startTime || !endTime) {
            ErrorHandler(
              res,
              400,
              "Each timeSlot must have both startTime and endTime"
            );
            return false;
          }

          if (new Date(startTime) >= new Date(endTime)) {
            ErrorHandler(res, 400, "startTime must be less than endTime");
            return false;
          }
        });

      return true;
    });

    if (!isValidAvailability) {
      ErrorHandler(res, 400, "Invalid availability or time slots data");
      return;
    }
  }

  const facilate = await Facility.findByIdAndUpdate(
    facilateId,
    {
      $addToSet: { availability: { $each: availability } },
    },
    {
      new: true,
      upsert: true,
    }
  );
  if (!facilate) return ErrorHandler(res, 400, "We don't found a facilate");

  return sendResponse(res, 200, "Availability date added");
}, true);
