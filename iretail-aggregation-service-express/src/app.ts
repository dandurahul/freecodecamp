import express from "express";
import routes from "./api/routes/routes";
import dotenv from "dotenv";
import "reflect-metadata";
import httpContext from "express-http-context";
import { constants } from "./api/constants/constants.constants";
import globalErrorHandlerModel from "./api/models/global-error-handler.model"
// import correlationId from 'express-correlation-id';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(correlationId());

dotenv.config();
const PORT = process.env.PORT ?? 3000;

app.use(httpContext.middleware);
app.use((req, res, next) => {
  httpContext.set(
    constants.BUSINESS_UNIT_ID,
    req.headers[constants.BUSINESS_UNIT_ID]
  );
  next();
});

app.use("/" + process.env.CONTEXT_PATH, routes);

app.get("/" + "/ping", (_req, res) => {
  res.send("Service " + " is responding to Ping");
});

app.get("/" + "/health", (_req, res) => {
  res.status(200).send("Service " + " is healthy");
});

app.use((req, res) => {
  res.status(404).send(`Error: Api not found for route "${req.url}"`);
});


app.use(globalErrorHandlerModel)
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Promise Rejection:", reason);
  // Optionally, you can perform some cleanup or logging here.

  // Prevent the process from exiting by adding a dummy catch block.
  // promise.catch((err) => {});
});

process.on("uncaughtException", (error) => {
  console.error("Unhandled Exception:", error && error.message);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Promise Rejection:", reason);
  // Optionally, you can perform some cleanup or logging here.

  // Prevent the process from exiting by adding a dummy catch block.
  promise.catch((err) => {});
});

app.listen(PORT, () =>
  console.log(`IRetail Aggregation Service is running on port ${PORT}`)
);
