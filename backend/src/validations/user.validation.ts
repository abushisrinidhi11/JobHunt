import * as yup from "yup";

export const updateJobSeekerProfileValidation=yup.object({

    phone:yup
        .string()
        .matches(
            /^[6-9]\d{9}$/,
            "Enter a valid 10-digit mobile number"
        )
        .required("Phone number is required"),

    education:yup
        .string()
        .oneOf(
            [
                "10th",
                "Intermediate",
                "Diploma",
                "ITI",
                "B.Tech",
                "B.E",
                "B.Sc",
                "BCA",
                "B.Com",
                "B.A",
                "BBA",
                "B.Pharm",
                "B.Arch",
                "MBBS",
                "BDS",
                "B.Sc Nursing",
                "LLB",
                "M.Tech",
                "M.E",
                "M.Sc",
                "MCA",
                "M.Com",
                "M.A",
                "MBA",
                "M.Pharm",
                "MDS",
                "LLM",
                "Ph.D",
                "Other"
            ],
            "Invalid education"
        )
        .required("Education is required"),

    experience:yup
        .string()
        .oneOf(
            [
                "Student",
                "Fresher",
                "0 Years",
                "1 Year",
                "2 Years",
                "3 Years",
                "4-6 Years",
                "7-10 Years",
                "10+ Years"
            ],
            "Invalid experience"
        )
        .required("Experience is required"),

    skills:yup
        .array()
        .of(yup.string().trim())
        .min(1,"Add at least one skill")
        .required("Skills are required")

});

export const updateJobRecruiterProfileValidation=yup.object({

    phone:yup
        .string()
        .matches(
            /^[6-9]\d{9}$/,
            "Enter a valid 10-digit mobile number"
        )
        .required("Phone number is required"),

    companyName:yup
        .string()
        .trim()
        .required("Company name is required")
        .min(2,"Company name must be at least 2 characters")
        .max(100,"Company name cannot exceed 100 characters"),

    designation:yup
        .string()
        .trim()
        .required("Designation is required")
        .min(2,"Designation must be at least 2 characters")
        .max(100,"Designation cannot exceed 100 characters")

});