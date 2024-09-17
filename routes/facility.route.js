import express from "express";
const router = express.Router();

import isAuthenticated from "../middlewares/auth.middleware.js";
// import contsoller
import {
  createFacilate,
  addAvailability,
  addPeakHours,
} from "../controllers/facilate.controller.js";

// define facilate related routes
router.route("/create-facilate").post(isAuthenticated, createFacilate);
router.route("/add-availability").post(isAuthenticated, addAvailability);
router.route("/add-peak-hours").post(isAuthenticated, addPeakHours);

export default router;
