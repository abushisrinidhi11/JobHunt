"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.getCategoryById = exports.getAllCategories = exports.createCategory = void 0;
const Category_1 = __importDefault(require("../models/Category"));
const createCategory = async (req, res) => {
    try {
        console.log("Create Category API called");
        const { name, description } = req.body;
        console.log("Checking if category already exists");
        const existingCategory = await Category_1.default.findOne({ name });
        if (existingCategory) {
            console.log("Category already exists");
            return res.status(400).json({
                success: false,
                message: "Category already exists"
            });
        }
        console.log("Creating category");
        const category = await Category_1.default.create({
            name,
            description
        });
        console.log("Category created successfully");
        return res.status(201).json({
            success: true,
            message: "Category created successfully",
            category
        });
    }
    catch (error) {
        console.log("Create Category Error:", error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
exports.createCategory = createCategory;
const getAllCategories = async (req, res) => {
    try {
        console.log("Get All Categories API called");
        const categories = await Category_1.default.find();
        console.log("Categories fetched successfully");
        return res.status(200).json({
            success: true,
            count: categories.length,
            categories
        });
    }
    catch (error) {
        console.log("Get All Categories Error:", error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
exports.getAllCategories = getAllCategories;
const getCategoryById = async (req, res) => {
    try {
        console.log("Get Category By Id API called");
        const category = await Category_1.default.findById(req.params.id);
        if (!category) {
            console.log("Category not found");
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }
        console.log("Category fetched successfully");
        return res.status(200).json({
            success: true,
            category
        });
    }
    catch (error) {
        console.log("Get Category By Id Error:", error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
exports.getCategoryById = getCategoryById;
const updateCategory = async (req, res) => {
    try {
        console.log("Update Category API called");
        const category = await Category_1.default.findById(req.params.id);
        if (!category) {
            console.log("Category not found");
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }
        category.name = req.body.name || category.name;
        category.description = req.body.description || category.description;
        await category.save();
        console.log("Category updated successfully");
        return res.status(200).json({
            success: true,
            message: "Category updated successfully",
            category
        });
    }
    catch (error) {
        console.log("Update Category Error:", error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
exports.updateCategory = updateCategory;
const deleteCategory = async (req, res) => {
    try {
        console.log("Delete Category API called");
        const category = await Category_1.default.findById(req.params.id);
        if (!category) {
            console.log("Category not found");
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }
        await category.deleteOne();
        console.log("Category deleted successfully");
        return res.status(200).json({
            success: true,
            message: "Category deleted successfully"
        });
    }
    catch (error) {
        console.log("Delete Category Error:", error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
exports.deleteCategory = deleteCategory;
