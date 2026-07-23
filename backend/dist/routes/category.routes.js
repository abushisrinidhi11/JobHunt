"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("../controllers/category.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const validate_middleware_1 = __importDefault(require("../middlewares/validate.middleware"));
const category_validation_1 = require("../validations/category.validation");
const router = express_1.default.Router();
router.post("/", auth_middleware_1.protect, (0, auth_middleware_1.authorize)("jobRecruiter"), (0, validate_middleware_1.default)(category_validation_1.createCategoryValidation), category_controller_1.createCategory);
router.get("/", auth_middleware_1.protect, category_controller_1.getAllCategories);
router.get("/:id", auth_middleware_1.protect, category_controller_1.getCategoryById);
router.put("/:id", auth_middleware_1.protect, (0, auth_middleware_1.authorize)("jobRecruiter"), (0, validate_middleware_1.default)(category_validation_1.updateCategoryValidation), category_controller_1.updateCategory);
router.delete("/:id", auth_middleware_1.protect, (0, auth_middleware_1.authorize)("jobRecruiter"), category_controller_1.deleteCategory);
exports.default = router;
