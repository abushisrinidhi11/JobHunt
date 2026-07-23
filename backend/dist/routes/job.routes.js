"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const job_controller_1 = require("../controllers/job.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const validate_middleware_1 = __importDefault(require("../middlewares/validate.middleware"));
const job_validation_1 = require("../validations/job.validation");
const router = express_1.default.Router();
router.post("/", auth_middleware_1.protect, (0, auth_middleware_1.authorize)("jobRecruiter"), (0, validate_middleware_1.default)(job_validation_1.createJobValidation), job_controller_1.createJob);
router.get("/", auth_middleware_1.protect, job_controller_1.getAllJobs);
router.get("/:id", auth_middleware_1.protect, job_controller_1.getJobById);
router.put("/:id", auth_middleware_1.protect, (0, auth_middleware_1.authorize)("jobRecruiter"), (0, validate_middleware_1.default)(job_validation_1.updateJobValidation), job_controller_1.updateJob);
router.delete("/:id", auth_middleware_1.protect, (0, auth_middleware_1.authorize)("jobRecruiter"), job_controller_1.deleteJob);
exports.default = router;
