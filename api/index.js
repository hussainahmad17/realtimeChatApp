import dotenv from "dotenv";

import { server } from "../backend/src/server.js";
import { connectDB } from "../backend/src/lib/db.js";

dotenv.config();

let isConnected = false;

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }

  if (req.headers.upgrade?.toLowerCase() === "websocket") {
    server.emit("upgrade", req, req.socket, Buffer.alloc(0));
    return;
  }

  server.emit("request", req, res);
}
