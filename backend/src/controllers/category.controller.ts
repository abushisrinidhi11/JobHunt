import Category from "../models/Category";
import {Request,Response} from "express";

export const createCategory=async(req:Request,res:Response)=>
{
    try
    {
        console.log("Create Category API called");

        const{name,description}=req.body;

        console.log("Checking if category already exists");

        const existingCategory=await Category.findOne({name});

        if(existingCategory)
        {
            console.log("Category already exists");

            return res.status(400).json({
                success:false,
                message:"Category already exists"
            });
        }

        console.log("Creating category");

        const category=await Category.create({
            name,
            description
        });

        console.log("Category created successfully");

        return res.status(201).json({
            success:true,
            message:"Category created successfully",
            category
        });
    }
    catch(error:any)
    {
        console.log("Create Category Error:",error.message);

        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

export const getAllCategories=async(req:Request,res:Response)=>
{
    try
    {
        console.log("Get All Categories API called");

        const categories=await Category.find();

        console.log("Categories fetched successfully");

        return res.status(200).json({
            success:true,
            count:categories.length,
            categories
        });
    }
    catch(error:any)
    {
        console.log("Get All Categories Error:",error.message);

        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

export const getCategoryById=async(req:Request,res:Response)=>
{
    try
    {
        console.log("Get Category By Id API called");

        const category=await Category.findById(req.params.id);

        if(!category)
        {
            console.log("Category not found");

            return res.status(404).json({
                success:false,
                message:"Category not found"
            });
        }

        console.log("Category fetched successfully");

        return res.status(200).json({
            success:true,
            category
        });
    }
    catch(error:any)
    {
        console.log("Get Category By Id Error:",error.message);

        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

export const updateCategory=async(req:Request,res:Response)=>
{
    try
    {
        console.log("Update Category API called");

        const category=await Category.findById(req.params.id);

        if(!category)
        {
            console.log("Category not found");

            return res.status(404).json({
                success:false,
                message:"Category not found"
            });
        }

        category.name=req.body.name||category.name;
        category.description=req.body.description||category.description;

        await category.save();

        console.log("Category updated successfully");

        return res.status(200).json({
            success:true,
            message:"Category updated successfully",
            category
        });
    }
    catch(error:any)
    {
        console.log("Update Category Error:",error.message);

        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

export const deleteCategory=async(req:Request,res:Response)=>
{
    try
    {
        console.log("Delete Category API called");

        const category=await Category.findById(req.params.id);

        if(!category)
        {
            console.log("Category not found");

            return res.status(404).json({
                success:false,
                message:"Category not found"
            });
        }

        await category.deleteOne();

        console.log("Category deleted successfully");

        return res.status(200).json({
            success:true,
            message:"Category deleted successfully"
        });
    }
    catch(error:any)
    {
        console.log("Delete Category Error:",error.message);

        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
};