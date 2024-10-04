import "reflect-metadata";
import express from "express";
import {router} from "./api/routes/routes";
import dotenv from "dotenv";
import "./infrastructure/datasources/catalogues.datasource";
import globalErrorHandlerModel from "./api/models/global-error-handler.model";
const app = express();
// app.use(express.json());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));

dotenv.config();
const PORT = process.env.PORT || 3000;

app.use("/" + process.env.CONTEXT_PATH, router);

app.get("/" + process.env.CONTEXT_PATH + "ping", (_req, res) => {
    res.send("Service " + process.env.CONTEXT_PATH + " is responding to Ping");
});

app.get("/" + process.env.CONTEXT_PATH + "health", (_req, res) => {
    res.status(200).send("Service " + process.env.CONTEXT_PATH + " is healthy");
});

app.all('*', (req, res) => {
    res
        .status(404)
        .send(`Error: Api not found in payment service for route "${req.url}"`);
});

app.use(globalErrorHandlerModel)

// process.on("unhandledRejection", (reason) => {
//   console.error("Unhandled Promise Rejection:", reason);
// });

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
