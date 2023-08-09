import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";

// import config from './../config';
import todoRouter from "./routes/todoRoutes";
import userRouter from "./routes/userRoutes";

import { notFound, errorHandler } from "./middleware/ErrorMiddleware";

const app = express();

dotenv.config();
connectDB();

// Middleware to parse JSON requests
app.use(express.json());

// Use the morgan middleware for logging HTTP requests to the console
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Use the cors middleware for enabling Cross-Origin Resource Sharing (CORS)
// This allows requests from different origins to access the API
app.use(cors());

// Use the bodyParser middleware for parsing JSON request bodies
app.use(bodyParser.json());

// Routes
app.use("/api/todos", todoRouter);
app.use("/api/auth", userRouter);

// Middleware
app.use(notFound);
app.use(errorHandler);

// Start the server
const PORT: string | number = process.env.PORT || 4000;
app.listen(PORT, (): void => console.log(`Server is running on ${PORT}`));
