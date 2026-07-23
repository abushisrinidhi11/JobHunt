import User from "../models/User";
import {Request,Response} from "express";
export const getProfile=async(req:any,res:Response)=>
{
    try
    {
        console.log("Get Profile API called");

        console.log("Finding user");

        const user=await User.findById(req.user._id).select("-password");

        if(!user)
        {
            console.log("User not found");

            return res.status(404).json({
                success:false,
                message:"User not found"
            });
        }

        console.log("Profile fetched successfully");

        return res.status(200).json({
            success:true,
            user
        });
    }
    catch(error:any)
    {
        console.log("Get Profile Error:",error.message);

        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
};
export const updateProfile=async(req:any,res:Response)=>
{
    try
    {
        console.log("Update Profile API called");

        const user=await User.findById(req.user._id);

        if(!user)
        {
            console.log("User not found");

            return res.status(404).json({
                success:false,
                message:"User not found"
            });
        }

        console.log("Checking user role");

        if(user.role==="jobSeeker")
        {
            console.log("Updating Job Seeker Profile");

            user.phone = req.body.phone !== undefined ? req.body.phone : user.phone;
            user.education = req.body.education !== undefined ? req.body.education : user.education;
            user.experience = req.body.experience !== undefined ? req.body.experience : user.experience;
            user.skills = req.body.skills !== undefined ? req.body.skills : user.skills;
        }
        else
        {
            console.log("Updating Job Recruiter Profile");

            user.phone = req.body.phone !== undefined ? req.body.phone : user.phone;
            user.companyName = req.body.companyName !== undefined ? req.body.companyName : user.companyName;
            user.designation = req.body.designation !== undefined ? req.body.designation : user.designation;
        }

        await user.save();

        console.log("Profile updated successfully");

        return res.status(200).json({
            success:true,
            message:"Profile updated successfully",
            user
        });
    }
    catch(error:any)
    {
        console.log("Update Profile Error:",error.message);

        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
};
