"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateJobRecruiterProfileValidation = exports.updateJobSeekerProfileValidation = void 0;
const yup = __importStar(require("yup"));
exports.updateJobSeekerProfileValidation = yup.object({
    phone: yup
        .string()
        .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number")
        .required("Phone number is required"),
    education: yup
        .string()
        .oneOf([
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
    ], "Invalid education")
        .required("Education is required"),
    experience: yup
        .string()
        .oneOf([
        "Student",
        "Fresher",
        "0 Years",
        "1 Year",
        "2 Years",
        "3 Years",
        "4-6 Years",
        "7-10 Years",
        "10+ Years"
    ], "Invalid experience")
        .required("Experience is required"),
    skills: yup
        .array()
        .of(yup.string().trim())
        .min(1, "Add at least one skill")
        .required("Skills are required")
});
exports.updateJobRecruiterProfileValidation = yup.object({
    phone: yup
        .string()
        .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number")
        .required("Phone number is required"),
    companyName: yup
        .string()
        .trim()
        .required("Company name is required")
        .min(2, "Company name must be at least 2 characters")
        .max(100, "Company name cannot exceed 100 characters"),
    designation: yup
        .string()
        .trim()
        .required("Designation is required")
        .min(2, "Designation must be at least 2 characters")
        .max(100, "Designation cannot exceed 100 characters")
});
