"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateApplicationStatus = exports.getApplicationsByJob = exports.getApplicationById = exports.getMyApplications = exports.applyJob = void 0;
const Application_1 = __importDefault(require("../models/Application"));
const Job_1 = __importDefault(require("../models/Job"));
const applyJob = async (req, res) => {
    try {
        console.log("Apply Job API called");
        const { jobId, resume } = req.body;
        console.log("Checking if job exists");
        const job = await Job_1.default.findById(jobId);
        if (!job) {
            console.log("Job not found");
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }
        console.log("Checking if already applied");
        const existingApplication = await Application_1.default.findOne({
            jobId,
            userId: req.user._id
        });
        if (existingApplication) {
            console.log("Already applied");
            return res.status(400).json({
                success: false,
                message: "You have already applied for this job"
            });
        }
        console.log("Creating application");
        const application = await Application_1.default.create({
            jobId,
            userId: req.user._id,
            resume
        });
        console.log("Application submitted successfully");
        return res.status(201).json({
            success: true,
            message: "Job applied successfully",
            application
        });
    }
    catch (error) {
        console.log("Apply Job Error:", error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
exports.applyJob = applyJob;
const getMyApplications = async (req, res) => {
    try {
        console.log("Get My Applications API called");
        const applications = await Application_1.default.find({
            userId: req.user._id
        })
            .populate("jobId")
            .populate("userId", "fullName email");
        console.log("Applications fetched successfully");
        return res.status(200).json({
            success: true,
            count: applications.length,
            applications
        });
    }
    catch (error) {
        console.log("Get My Applications Error:", error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
exports.getMyApplications = getMyApplications;
const getApplicationById = async (req, res) => {
    try {
        console.log("Get Application By Id API called");
        const application = await Application_1.default.findById(req.params.id)
            .populate("jobId")
            .populate("userId", "fullName email");
        if (!application) {
            console.log("Application not found");
            return res.status(404).json({
                success: false,
                message: "Application not found"
            });
        }
        console.log("Application fetched successfully");
        return res.status(200).json({
            success: true,
            application
        });
    }
    catch (error) {
        console.log("Get Application By Id Error:", error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
exports.getApplicationById = getApplicationById;
const getApplicationsByJob = async (req, res) => {
    try {
        console.log("Get Applications By Job API called");
        const applications = await Application_1.default.find({
            jobId: req.params.jobId
        })
            .populate("userId", "fullName email phone education experience skills");
        console.log("Applications fetched successfully");
        return res.status(200).json({
            success: true,
            count: applications.length,
            applications
        });
    }
    catch (error) {
        console.log("Get Applications By Job Error:", error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
exports.getApplicationsByJob = getApplicationsByJob;
const updateApplicationStatus = async (req, res) => {
    try {
        console.log("Update Application Status API called");
        const application = await Application_1.default.findById(req.params.id);
        if (!application) {
            console.log("Application not found");
            return res.status(404).json({
                success: false,
                message: "Application not found"
            });
        }
        application.status = req.body.status;
        await application.save();
        console.log("Application status updated successfully");
        return res.status(200).json({
            success: true,
            message: "Application status updated successfully",
            application
        });
    }
    catch (error) {
        console.log("Update Application Status Error:", error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
exports.updateApplicationStatus = updateApplicationStatus;
