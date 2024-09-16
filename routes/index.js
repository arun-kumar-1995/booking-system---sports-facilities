import express from "express";
const router = express.Router();

// import routes
import user_routes from "./user.routes.js";
import facility_routes from "./facility.route.js";
//use routes
router.use("/", user_routes);
router.use("/facilate", facility_routes);

export default router;
