"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const application_controller_1 = require("../controllers/application.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const validate_middleware_1 = __importDefault(require("../middlewares/validate.middleware"));
const application_validation_1 = require("../validations/application.validation");
const router = express_1.default.Router();
router.post("/", auth_middleware_1.protect, (0, auth_middleware_1.authorize)("jobSeeker"), (0, validate_middleware_1.default)(application_validation_1.applyJobValidation), application_controller_1.applyJob);
router.get("/my-applications", auth_middleware_1.protect, (0, auth_middleware_1.authorize)("jobSeeker"), application_controller_1.getMyApplications);
router.get("/:id", auth_middleware_1.protect, application_controller_1.getApplicationById);
router.get("/job/:jobId", auth_middleware_1.protect, (0, auth_middleware_1.authorize)("jobRecruiter"), application_controller_1.getApplicationsByJob);
router.put("/:id", auth_middleware_1.protect, (0, auth_middleware_1.authorize)("jobRecruiter"), (0, validate_middleware_1.default)(application_validation_1.updateApplicationStatusValidation), application_controller_1.updateApplicationStatus);
exports.default = router;
