"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.getProfile = void 0;
const User_1 = __importDefault(require("../models/User"));
const getProfile = async (req, res) => {
    try {
        console.log("Get Profile API called");
        console.log("Finding user");
        const user = await User_1.default.findById(req.user._id).select("-password");
        if (!user) {
            console.log("User not found");
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        console.log("Profile fetched successfully");
        return res.status(200).json({
            success: true,
            user
        });
    }
    catch (error) {
        console.log("Get Profile Error:", error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
exports.getProfile = getProfile;
const updateProfile = async (req, res) => {
    try {
        console.log("Update Profile API called");
        const user = await User_1.default.findById(req.user._id);
        if (!user) {
            console.log("User not found");
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        console.log("Checking user role");
        if (user.role === "jobSeeker") {
            console.log("Updating Job Seeker Profile");
            user.phone = req.body.phone;
            user.education = req.body.education;
            user.experience = req.body.experience;
            user.skills = req.body.skills;
        }
        else {
            console.log("Updating Job Recruiter Profile");
            user.phone = req.body.phone;
            user.companyName = req.body.companyName;
            user.designation = req.body.designation;
        }
        await user.save();
        console.log("Profile updated successfully");
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user
        });
    }
    catch (error) {
        console.log("Update Profile Error:", error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
exports.updateProfile = updateProfile;
