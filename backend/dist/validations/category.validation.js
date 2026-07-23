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
exports.updateCategoryValidation = exports.createCategoryValidation = void 0;
const yup = __importStar(require("yup"));
exports.createCategoryValidation = yup.object({
    name: yup
        .string()
        .trim()
        .required("Category name is required")
        .min(3, "Category name must be at least 3 characters")
        .max(50, "Category name cannot exceed 50 characters"),
    description: yup
        .string()
        .trim()
        .required("Category description is required")
        .min(10, "Description must be at least 10 characters")
        .max(300, "Description cannot exceed 300 characters")
});
exports.updateCategoryValidation = yup.object({
    name: yup
        .string()
        .trim()
        .min(3, "Category name must be at least 3 characters")
        .max(50, "Category name cannot exceed 50 characters"),
    description: yup
        .string()
        .trim()
        .min(10, "Description must be at least 10 characters")
        .max(300, "Description cannot exceed 300 characters")
});
