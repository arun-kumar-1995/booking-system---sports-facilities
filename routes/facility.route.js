import express from "express";
const router = express.Router();

import isAuthenticated from "../middlewares/auth.middleware.js";
// import contsoller
import {
  createFacilate,
  addFacilateInfo,
} from "../controllers/facilate.controller.js";

// define facilate related routes
router.route("/create-facilate").post(isAuthenticated, createFacilate);
// router.route("/add-facilate-info").post(isAuthenticated, addFacilateInfo);

export default router;
