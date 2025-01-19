import Logger from "./logger.js";

export const requestLogger = (request, _response, next) => {
  Logger.info("Method : ", request.method, " | Path :", request.path);
  Logger.info("Body:  ", request.body);
  Logger.info("-----------------------------------------------------");
  next();
};

export const unknownEndpoint = (_req, res) => {
  return res.status(404).send({ error: "unknown endpoint" });
};

export const errorHandler = (error, _req, res, next) => {
  Logger.error(error.message);

  if (error.name === "PrismaClientInitializationError") {
    return res.status(404).send({ error: "Initialization value wrong(wrong config)" });
  } else if (error.name === "PrismaClientKnownRequestError") {
    return res.status(404).send({ error: "Inconsitency of data" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return res.status(401).json({ error: "Invalid Token" });
  } else if (error.name === "TokenExpiredError") {
    return res.status(401).json({ error: "Token Expired" });
  }
  next(error);
};
