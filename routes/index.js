import express from "express";
const router = express.Router();

// import routes
import user_routes from "./user.routes.js";

//use routes
router.use("/", user_routes);

export default router;
