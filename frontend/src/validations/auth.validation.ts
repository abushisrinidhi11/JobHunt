import * as Yup from "yup";

console.log("Auth Validation Loaded");

export const loginValidation = Yup.object({

    email: Yup.string()
        .email("Invalid Email")
        .required("Email is required"),

    password: Yup.string()
        .required("Password is required")

});

export const registerValidation = Yup.object({

    fullName: Yup.string()
        .required("Full Name is required"),

    email: Yup.string()
        .email("Invalid Email")
        .required("Email is required"),

    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),

    role: Yup.string()
        .oneOf(
            [
                "jobSeeker",
                "jobRecruiter"
            ],
            "Invalid Role"
        )
        .required("Role is required")

});