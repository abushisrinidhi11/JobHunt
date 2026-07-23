"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const protect = async (req, res, next) => {
    try {
        console.log("Protect middleware called");
        const token = req.cookies.token;
        if (!token) {
            console.log("Token not found");
            return res.status(401).json({
                success: false,
                message: "Please login first"
            });
        }
        console.log("Verifying token");
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        console.log("Finding user");
        const user = await User_1.default.findById(decoded.id).select("-password");
        if (!user) {
            console.log("User not found");
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }
        req.user = user;
        console.log("User authenticated");
        next();
    }
    catch (error) {
        console.log("Protect Middleware Error:", error.message);
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};
exports.protect = protect;
const authorize = (...roles) => {
    return (req, res, next) => {
        try {
            console.log("Authorize middleware called");
            if (!roles.includes(req.user.role)) {
                console.log("Access denied");
                return res.status(403).json({
                    success: false,
                    message: "Access denied"
                });
            }
            console.log("User authorized");
            next();
        }
        catch (error) {
            console.log("Authorize Middleware Error:", error.message);
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    };
};
exports.authorize = authorize;
