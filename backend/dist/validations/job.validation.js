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
exports.updateJobValidation = exports.createJobValidation = void 0;
const yup = __importStar(require("yup"));
exports.createJobValidation = yup.object({
    title: yup
        .string()
        .trim()
        .required("Job title is required"),
    company: yup
        .string()
        .trim()
        .required("Company name is required"),
    location: yup
        .string()
        .trim()
        .required("Location is required"),
    workplaceType: yup
        .string()
        .oneOf([
        "On-site",
        "Remote",
        "Hybrid"
    ], "Invalid workplace type")
        .required("Workplace type is required"),
    employmentType: yup
        .string()
        .oneOf([
        "Full-Time",
        "Part-Time",
        "Internship",
        "Contract",
        "Freelance",
        "Temporary"
    ], "Invalid employment type")
        .required("Employment type is required"),
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
    salary: yup
        .number()
        .typeError("Salary must be a number")
        .positive("Salary must be greater than zero")
        .required("Salary is required"),
    description: yup
        .string()
        .trim()
        .required("Job description is required"),
    category: yup
        .string()
        .required("Category is required")
});
exports.updateJobValidation = yup.object({
    title: yup
        .string()
        .trim(),
    company: yup
        .string()
        .trim(),
    location: yup
        .string()
        .trim(),
    workplaceType: yup
        .string()
        .oneOf([
        "On-site",
        "Remote",
        "Hybrid"
    ], "Invalid workplace type"),
    employmentType: yup
        .string()
        .oneOf([
        "Full-Time",
        "Part-Time",
        "Internship",
        "Contract",
        "Freelance",
        "Temporary"
    ], "Invalid employment type"),
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
    ], "Invalid experience"),
    salary: yup
        .number()
        .typeError("Salary must be a number")
        .positive("Salary must be greater than zero"),
    description: yup
        .string()
        .trim(),
    category: yup
        .string()
});
