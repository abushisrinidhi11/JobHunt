import User from "../models/User";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken";
import cookieOptions from "../utils/cookieOptions";
import {Request,Response} from "express";

export const register=async(req:Request,res:Response)=>
{
    try
    {
        console.log("Register API called");

        const {fullName,email,password,role}=req.body;
        console.log("Register Request Body");
console.log(req.body);

console.log("Received Role");
console.log(role);

        console.log("Checking if user already exists");

        const existingUser=await User.findOne({email});

        if(existingUser)
        {
            console.log("User already exists");

            return res.status(400).json({
                success:false,
                message:"User already exists"
            });
        }

        console.log("Hashing password");

        const hashedPassword=await bcrypt.hash(password,10);

        console.log("Creating user");

        const user = await User.create({
    fullName,
    email,
    password: hashedPassword,
    role
});
        console.log("Generating token");

        const token=generateToken(user._id.toString());

        res.cookie("token",token,cookieOptions);

        console.log("User registered successfully");

        return res.status(201).json({
            success:true,
            message:"User registered successfully",
            user:{
                id:user._id,
                fullName:user.fullName,
                email:user.email,
                role:user.role
            }
        });

    }
    catch(error:any)
    {
        console.log("Register Error:",error.message);

        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

export const login=async(req:Request,res:Response)=>
{
    try
    {
        console.log("Login API called");

        const {email,password}=req.body;

        console.log("Finding user");

        const user=await User.findOne({email}).select("+password");

        if(!user)
        {
            console.log("User not found");

            return res.status(401).json({
                success:false,
                message:"Invalid email or password"
            });
        }

        console.log("Comparing password");

        const isMatch=await bcrypt.compare(password,user.password);

        if(!isMatch)
        {
            console.log("Password incorrect");

            return res.status(401).json({
                success:false,
                message:"Invalid email or password"
            });
        }

        console.log("Generating token");

        const token=generateToken(user._id.toString());

        res.cookie("token",token,cookieOptions);

        console.log("Login successful");

        return res.status(200).json({
            success:true,
            message:"Login successful",
            user:{
                id:user._id,
                fullName:user.fullName,
                email:user.email,
                role:user.role
            }
        });

    }
    catch(error:any)
    {
        console.log("Login Error:",error.message);

        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

export const logout=async(req:Request,res:Response)=>
{
    try
    {
        console.log("Logout API called");

        res.clearCookie("token",cookieOptions);

        console.log("Logout successful");

        return res.status(200).json({
            success:true,
            message:"Logout successful"
        });
    }
    catch(error:any)
    {
        console.log("Logout Error:",error.message);

        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

export const getMe=async(req:any,res:Response)=>
{
    try
    {
        console.log("Get Me API called");

        return res.status(200).json({
            success:true,
            user:req.user
        });
    }
    catch(error:any)
    {
        console.log("Get Me Error:",error.message);

        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
};