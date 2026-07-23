import Job from "../models/Job";
import {Request,Response} from "express";
import Category from "../models/Category";
export const createJob = async (req: any, res: Response) =>
{
    try
    {
        console.log("Create Job API called");

        const
        {
            title,
            company,
            location,
            workplaceType,
            employmentType,
            experience,
            salary,
            description,
            category
        } = req.body;

        console.log("Checking whether category exists");

        const existingCategory = await Category.findById(category);

        if (!existingCategory)
        {
            console.log("Category not found");

            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        console.log("Creating job");

        const job = await Job.create({
            title,
            company,
            location,
            workplaceType,
            employmentType,
            experience,
            salary,
            description,
            category,
            postedBy: req.user._id
        });

        console.log("Job created successfully");

        return res.status(201).json({
            success: true,
            message: "Job created successfully",
            job
        });
    }
    catch (error: any)
    {
        console.log("Create Job Error:", error.message);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getAllJobs=async(req:Request,res:Response)=>
{
    try
    {
        console.log("Get All Jobs API called");

        const jobs=await Job.find()
        .populate("category")
        .populate("postedBy","fullName email companyName designation");

        console.log("Jobs fetched successfully");

        return res.status(200).json({
            success:true,
            count:jobs.length,
            jobs
        });
    }
    catch(error:any)
    {
        console.log("Get All Jobs Error:",error.message);

        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

export const getJobById=async(req:Request,res:Response)=>
{
    try
    {
        console.log("Get Job By Id API called");

        const job=await Job.findById(req.params.id)
        .populate("category")
        .populate("postedBy","fullName email companyName designation");

        if(!job)
        {
            console.log("Job not found");

            return res.status(404).json({
                success:false,
                message:"Job not found"
            });
        }

        console.log("Job fetched successfully");

        return res.status(200).json({
            success:true,
            job
        });
    }
    catch(error:any)
    {
        console.log("Get Job By Id Error:",error.message);

        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

export const updateJob=async(req:any,res:Response)=>
{
    try
    {
        console.log("Update Job API called");

        const job=await Job.findById(req.params.id);

        if(!job)
        {
            console.log("Job not found");

            return res.status(404).json({
                success:false,
                message:"Job not found"
            });
        }

        if(job.postedBy.toString()!=req.user._id.toString())
        {
            console.log("Access denied");

            return res.status(403).json({
                success:false,
                message:"You can update only your own jobs"
            });
        }

        job.title=req.body.title||job.title;
        job.company=req.body.company||job.company;
        job.location=req.body.location||job.location;
        job.workplaceType=req.body.workplaceType||job.workplaceType;
        job.employmentType=req.body.employmentType||job.employmentType;
        job.experience=req.body.experience||job.experience;
        job.salary=req.body.salary||job.salary;
        job.description=req.body.description||job.description;
        job.category=req.body.category||job.category;

        await job.save();

        console.log("Job updated successfully");

        return res.status(200).json({
            success:true,
            message:"Job updated successfully",
            job
        });
    }
    catch(error:any)
    {
        console.log("Update Job Error:",error.message);

        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

export const deleteJob=async(req:any,res:Response)=>
{
    try
    {
        console.log("Delete Job API called");

        const job=await Job.findById(req.params.id);

        if(!job)
        {
            console.log("Job not found");

            return res.status(404).json({
                success:false,
                message:"Job not found"
            });
        }

        if(job.postedBy.toString()!=req.user._id.toString())
        {
            console.log("Access denied");

            return res.status(403).json({
                success:false,
                message:"You can delete only your own jobs"
            });
        }

        await job.deleteOne();

        console.log("Job deleted successfully");

        return res.status(200).json({
            success:true,
            message:"Job deleted successfully"
        });
    }
    catch(error:any)
    {
        console.log("Delete Job Error:",error.message);

        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
};