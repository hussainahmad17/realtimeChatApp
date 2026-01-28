import http from "http";

import { createApp } from "./app.js";
import { initSocket } from "./lib/socket.js";

const app = createApp();
const server = http.createServer(app);

initSocket(server);

export { app, server };
