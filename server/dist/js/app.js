"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
// import config from './../config';
const todoRoutes_1 = __importDefault(require("./routes/todoRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const ErrorMiddleware_1 = require("./middleware/ErrorMiddleware");
const app = (0, express_1.default)();
dotenv_1.default.config();
(0, db_1.default)();
// Middleware to parse JSON requests
app.use(express_1.default.json());
// Use the morgan middleware for logging HTTP requests to the console
if (process.env.NODE_ENV === "development") {
    app.use((0, morgan_1.default)("dev"));
}
// Use the cors middleware for enabling Cross-Origin Resource Sharing (CORS)
// This allows requests from different origins to access the API
app.use((0, cors_1.default)());
// Use the bodyParser middleware for parsing JSON request bodies
app.use(body_parser_1.default.json());
// Routes
app.use("/api/todos", todoRoutes_1.default);
app.use("/api/auth", userRoutes_1.default);
// Middleware
app.use(ErrorMiddleware_1.notFound);
app.use(ErrorMiddleware_1.errorHandler);
// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
