"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false,
        minlength: 8
    },
    phone: {
        type: String,
        trim: true
    },
    role: {
        type: String,
        enum: ["jobSeeker", "jobRecruiter"],
        default: "jobSeeker"
    },
    education: {
        type: String,
        enum: [
            "10th",
            "Intermediate",
            "Diploma",
            "ITI",
            "B.Tech",
            "B.E",
            "B.Sc",
            "BCA",
            "B.Com",
            "B.A",
            "BBA",
            "B.Pharm",
            "B.Arch",
            "MBBS",
            "BDS",
            "B.Sc Nursing",
            "LLB",
            "M.Tech",
            "M.E",
            "M.Sc",
            "MCA",
            "M.Com",
            "M.A",
            "MBA",
            "M.Pharm",
            "MDS",
            "LLM",
            "Ph.D",
            "Other"
        ]
    },
    experience: {
        type: String,
        enum: [
            "Student",
            "Fresher",
            "0 Years",
            "1 Year",
            "2 Years",
            "3 Years",
            "4-6 Years",
            "7-10 Years",
            "10+ Years"
        ]
    },
    skills: [
        {
            type: String,
            trim: true
        }
    ],
    companyName: {
        type: String,
        trim: true
    },
    designation: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});
const User = mongoose_1.default.models.User || mongoose_1.default.model("User", userSchema);
exports.default = User;
