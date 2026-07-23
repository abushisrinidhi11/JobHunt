"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validate = (schema) => {
    return async (req, res, next) => {
        try {
            console.log("Validation middleware called");
            req.body = await schema.validate(req.body, {
                abortEarly: false,
                stripUnknown: true
            });
            console.log("Validation successful");
            next();
        }
        catch (error) {
            console.log("Validation failed");
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: error.errors
            });
        }
        finally {
            console.log("Validation middleware completed");
        }
    };
};
exports.default = validate;
