import "dotenv/config";
import app from "./app.js";
import http from "node:http";
import Logger from "./utils/logger.js";
import Config from "./utils/config.js";

const httpServer = http.createServer(app);

httpServer.listen(Config.PORT, () => {
  Logger.info(`Listening on port : ${Config.PORT}`);
});
