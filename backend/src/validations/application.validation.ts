import * as yup from "yup";

console.log("Application Validation Loaded");

export const applyJobValidation = yup.object({

    jobId: yup
        .string()
        .required("Job ID is required")

});

export const updateApplicationStatusValidation = yup.object({

    status: yup
        .string()
        .oneOf(
            [
                "Applied",
                "Under Review",
                "Shortlisted",
                "Interview Scheduled",
                "Rejected",
                "Hired"
            ],
            "Invalid application status"
        )
        .required("Application status is required")

});