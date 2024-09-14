import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT;

const server = app.listen(port, () => {
  console.log("Server listening on port " + port);
});

export default app;
