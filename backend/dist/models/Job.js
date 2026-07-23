"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const jobSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    workplaceType: {
        type: String,
        enum: ["On-site",
            "Remote",
            "Hybrid"
        ],
        required: true
    },
    employmentType: {
        type: String,
        enum: ["Full-Time",
            "Part-Time",
            "Internship",
            "Contract",
            "Freelance",
            "Temporary"
        ],
        required: true
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
        ],
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    postedBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
});
const Job = mongoose_1.default.model("Job", jobSchema);
exports.default = Job;
