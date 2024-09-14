import app from "./app.js";
import db from "./config/db.config.js";

const { PORT: port = 8000 } = process.env;

process.on("SIGINT", async () => {
  await db.close();
  console.log("MongoDB connection closed on app termination");
  process.exit(0);
});

// connect express app only if connected to db instance
db.once("open", function () {
  console.log("Connected to Database", db.host);
  // Start the Express server
  const expressServer = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
