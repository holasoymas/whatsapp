import express from "express";
import path from "node:path";
import * as Middleware from "./utils/middleware.js";
import { loginRoute } from "./routes/loginRoute.js";
import { chatRoute } from "./routes/chatRoute.js";
import cookieParser from "cookie-parser";

const app = express();

//!NOTE: middleware : parse the incoming json request body, convert it into js object

// withot it res.body would be undefined
app.use(express.json());

//middleware for cookie parsing
app.use(cookieParser());

app.use(Middleware.requestLogger);
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "public")));

//!NOTE: Route mmiddleware
app.use("/login", loginRoute);

app.use("/chat", chatRoute);
//!NOTE: if none of the route match execute this
app.use(Middleware.unknownEndpoint);

//!NOTE: if any error occurs during the req,res execute this middleware
app.use(Middleware.errorHandler);

export default app;
