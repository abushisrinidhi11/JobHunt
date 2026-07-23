import Application from "../models/Application";
import Job from "../models/Job";
import {Response} from "express";
import uploadToCloudinary from "../utils/uploadToCloudinary";


export const applyJob = async (req: any, res: Response) =>
{
    try
    {
        console.log("Apply Job API called");

        const { jobId } = req.body;

        if (!req.file)
        {
            console.log("Resume not uploaded");

            return res.status(400).json({
                success: false,
                message: "Resume is required"
            });
        }

        console.log("Checking if job exists");

        const job = await Job.findById(jobId);

        if (!job)
        {
            console.log("Job not found");

            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        console.log("Checking if already applied");

        const existingApplication = await Application.findOne({
            jobId,
            userId: req.user._id
        });

        if (existingApplication)
        {
            console.log("Already applied");

            return res.status(400).json({
                success: false,
                message: "You have already applied for this job"
            });
        }

        console.log("Uploading Resume To Cloudinary");

        const resume = await uploadToCloudinary(
            req.file.buffer,
            "jobhunt/resumes"
        );

        console.log("Resume Uploaded Successfully");

        console.log("Creating Application");

        const application = await Application.create({
            jobId,
            userId: req.user._id,
            resume
        });

        console.log("Application Submitted Successfully");

        return res.status(201).json({
            success: true,
            message: "Job applied successfully",
            application
        });
    }
    catch (error: any)
    {
        console.log("Apply Job Error:", error.message);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const getMyApplications=async(req:any,res:Response)=>
{
    try
    {
        console.log("Get My Applications API called");

        const applications=await Application.find({
            userId:req.user._id
        })
        .populate("jobId")
        .populate("userId","fullName email");

        console.log("Applications fetched successfully");

        return res.status(200).json({
            success:true,
            count:applications.length,
            applications
        });

    }
    catch(error:any)
    {
        console.log("Get My Applications Error:",error.message);

        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

export const getApplicationById = async (req: any, res: Response) =>
{
    try
    {
        console.log("Get Application By Id API called");

        const application = await Application.findById(req.params.id)
            .populate("jobId")
            .populate("userId", "fullName email phone education experience skills");

        if (!application)
        {
            console.log("Application not found");

            return res.status(404).json({
                success: false,
                message: "Application not found"
            });
        }

        console.log("Checking user role");

        // Job Seeker can only view their own application
        if (req.user.role === "jobSeeker")
        {
            if (application.userId._id.toString() !== req.user._id.toString())
            {
                console.log("Access denied");

                return res.status(403).json({
                    success: false,
                    message: "Access denied"
                });
            }
        }

        // Job Recruiter can only view applications for their own jobs
        if (req.user.role === "jobRecruiter")
        {
            const job = await Job.findById(application.jobId._id);

            if (!job)
            {
                return res.status(404).json({
                    success: false,
                    message: "Job not found"
                });
            }

            if (job.postedBy.toString() !== req.user._id.toString())
            {
                console.log("Access denied");

                return res.status(403).json({
                    success: false,
                    message: "Access denied"
                });
            }
        }

        console.log("Application fetched successfully");

        return res.status(200).json({
            success: true,
            application
        });
    }
    catch (error: any)
    {
        console.log("Get Application By Id Error:", error.message);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const updateApplicationStatus=async(req:any,res:Response)=>
{
    try
    {
        console.log("Update Application Status API called");

        const application=await Application.findById(req.params.id);

        if(!application)
        {
            console.log("Application not found");

            return res.status(404).json({
                success:false,
                message:"Application not found"
            });
        }

        console.log("Finding related job");

        const job=await Job.findById(application.jobId);

        if(!job)
        {
            console.log("Job not found");

            return res.status(404).json({
                success:false,
                message:"Job not found"
            });
        }

        console.log("Checking recruiter ownership");

        if(job.postedBy.toString()!==req.user._id.toString())
        {
            console.log("Access denied");

            return res.status(403).json({
                success:false,
                message:"Access denied"
            });
        }

        console.log("Updating application status");

        application.status=req.body.status;

        await application.save();

        console.log("Application status updated successfully");

        return res.status(200).json({
            success:true,
            message:"Application status updated successfully",
            application
        });
    }
    catch(error:any)
    {
        console.log("Update Application Status Error:",error.message);

        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
};
export const getApplicationsByJob = async (req: any, res: Response) =>
{
    try
    {
        console.log("Get Applications By Job API called");

        console.log("Checking if job exists");

        const job = await Job.findById(req.params.jobId);

        if (!job)
        {
            console.log("Job not found");

            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        console.log("Checking recruiter ownership");

        if (job.postedBy.toString() !== req.user._id.toString())
        {
            console.log("Access denied");

            return res.status(403).json({
                success: false,
                message: "You can view applications only for your own jobs"
            });
        }

        const applications = await Application.find({
            jobId: req.params.jobId
        })
        .populate(
            "userId",
            "fullName email phone education experience skills"
        );

        console.log("Applications fetched successfully");

        return res.status(200).json({
            success: true,
            count: applications.length,
            applications
        });
    }
    catch (error: any)
    {
        console.log("Get Applications By Job Error:", error.message);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
 

export const withdrawApplication = async (req: any, res: Response) =>
{
    try
    {
        console.log("Withdraw Application API called");

        console.log("Finding application");

        const application = await Application.findById(req.params.id);

        if (!application)
        {
            console.log("Application not found");

            return res.status(404).json({
                success: false,
                message: "Application not found"
            });
        }

        console.log("Checking application owner");

        if (application.userId.toString() !== req.user._id.toString())
        {
            console.log("Access denied");

            return res.status(403).json({
                success: false,
                message: "You can withdraw only your own application"
            });
        }

        console.log("Deleting application");

        await application.deleteOne();

        console.log("Application withdrawn successfully");

        return res.status(200).json({
            success: true,
            message: "Application withdrawn successfully"
        });
    }
    catch (error: any)
    {
        console.log("Withdraw Application Error:", error.message);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getAllApplications = async (req: any, res: Response) =>
{
    try
    {
        console.log("Get All Applications API called");

        console.log("Finding jobs posted by recruiter");

        const jobs = await Job.find({
            postedBy: req.user._id
        });

        const jobIds = jobs.map(job => job._id);

        console.log("Finding applications");

        const applications = await Application.find({
            jobId: { $in: jobIds }
        })
        .populate("jobId")
        .populate(
            "userId",
            "fullName email phone education experience skills"
        );

        console.log("Applications fetched successfully");

        return res.status(200).json({
            success: true,
            count: applications.length,
            applications
        });
    }
    catch (error: any)
    {
        console.log("Get All Applications Error:", error.message);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};