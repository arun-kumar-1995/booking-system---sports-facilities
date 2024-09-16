import express from "express";
const router = express.Router();

// import contsoller
import { createFacilate } from "../controllers/facilate.controller.js";
import isAuthenticated from "../middlewares/auth.middleware.js";

// define facilate related routes
// create a facilate

router.route("/create-facilate").post(isAuthenticated, createFacilate);

export default router;
