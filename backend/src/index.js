import dotenv from "dotenv";

import { connectDB } from "./lib/db.js";
import { server } from "./server.js";

dotenv.config();

const PORT = process.env.PORT || 5001;

const startServer = async () => {
  try {
    await connectDB();
    server.listen(PORT, () => {
      console.log("server is running on PORT:" + PORT);
    });
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
};

startServer();