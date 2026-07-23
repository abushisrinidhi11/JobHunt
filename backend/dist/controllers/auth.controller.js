"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.logout = exports.login = exports.register = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const cookieOptions_1 = __importDefault(require("../utils/cookieOptions"));
const register = async (req, res) => {
    try {
        console.log("Register API called");
        const { fullName, email, password, role } = req.body;
        console.log("Checking if user already exists");
        const existingUser = await User_1.default.findOne({ email });
        if (existingUser) {
            console.log("User already exists");
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }
        console.log("Hashing password");
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        console.log("Creating user");
        const user = await User_1.default.create({
            fullName,
            email,
            password: hashedPassword,
            role
        });
        console.log("Generating token");
        const token = (0, generateToken_1.default)(user._id.toString());
        res.cookie("token", token, cookieOptions_1.default);
        console.log("User registered successfully");
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role
            }
        });
    }
    catch (error) {
        console.log("Register Error:", error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        console.log("Login API called");
        const { email, password } = req.body;
        console.log("Finding user");
        const user = await User_1.default.findOne({ email }).select("+password");
        if (!user) {
            console.log("User not found");
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }
        console.log("Comparing password");
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            console.log("Password incorrect");
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }
        console.log("Generating token");
        const token = (0, generateToken_1.default)(user._id.toString());
        res.cookie("token", token, cookieOptions_1.default);
        console.log("Login successful");
        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role
            }
        });
    }
    catch (error) {
        console.log("Login Error:", error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
exports.login = login;
const logout = async (req, res) => {
    try {
        console.log("Logout API called");
        res.clearCookie("token", cookieOptions_1.default);
        console.log("Logout successful");
        return res.status(200).json({
            success: true,
            message: "Logout successful"
        });
    }
    catch (error) {
        console.log("Logout Error:", error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
exports.logout = logout;
const getMe = async (req, res) => {
    try {
        console.log("Get Me API called");
        return res.status(200).json({
            success: true,
            user: req.user
        });
    }
    catch (error) {
        console.log("Get Me Error:", error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
exports.getMe = getMe;
