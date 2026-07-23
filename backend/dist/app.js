"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const category_routes_1 = __importDefault(require("./routes/category.routes"));
const job_routes_1 = __importDefault(require("./routes/job.routes"));
const application_routes_1 = __importDefault(require("./routes/application.routes"));
const app = (0, express_1.default)();
console.log("Creating Express application");
app.use((req, res, next) => {
    console.log("New Request");
    console.log("Method:", req.method);
    console.log("URL:", req.url);
    next();
});
console.log("Loading JSON middleware");
app.use(express_1.default.json());
console.log("Loading Cookie Parser");
app.use((0, cookie_parser_1.default)());
console.log("Loading CORS");
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true
}));
console.log("Loading Authentication Routes");
app.use("/api/auth", auth_routes_1.default);
console.log("Loading User Routes");
app.use("/api/users", user_routes_1.default);
console.log("Loading Category Routes");
app.use("/api/categories", category_routes_1.default);
console.log("Loading Job Routes");
app.use("/api/jobs", job_routes_1.default);
console.log("Loading Application Routes");
app.use("/api/applications", application_routes_1.default);
app.get("/", (req, res) => {
    console.log("Home route called");
    res.status(200).json({
        success: true,
        message: "Welcome to JobHunt API"
    });
});
app.use((req, res) => {
    console.log("Route not found");
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});
exports.default = app;
