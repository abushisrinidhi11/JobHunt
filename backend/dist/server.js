"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
require("dotenv/config");
const database_1 = require("./config/database");
const env_1 = require("./config/env");
const startServer = async () => {
    try {
        console.log("Starting JobHunt Server");
        console.log("Connecting to MongoDB");
        await (0, database_1.connectDatabase)();
        console.log("MongoDB Connected");
        app_1.default.listen(env_1.env.PORT, () => {
            console.log(`Server running on http://localhost:${env_1.env.PORT}`);
        });
    }
    catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};
startServer();
