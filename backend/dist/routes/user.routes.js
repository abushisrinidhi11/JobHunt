"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const validate_middleware_1 = __importDefault(require("../middlewares/validate.middleware"));
const user_validation_1 = require("../validations/user.validation");
const router = express_1.default.Router();
router.get("/profile", auth_middleware_1.protect, user_controller_1.getProfile);
router.put("/profile", auth_middleware_1.protect, async (req, res, next) => {
    try {
        console.log("Checking user role for validation");
        if (req.user.role === "jobSeeker") {
            return (0, validate_middleware_1.default)(user_validation_1.updateJobSeekerProfileValidation)(req, res, next);
        }
        return (0, validate_middleware_1.default)(user_validation_1.updateJobRecruiterProfileValidation)(req, res, next);
    }
    catch (error) {
        next(error);
    }
}, user_controller_1.updateProfile);
exports.default = router;
