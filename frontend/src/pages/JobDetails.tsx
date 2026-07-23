import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useJob } from "../context/JobContext";
import { useApplication } from "../context/ApplicationContext";
import JobSeekerLayout from "../layouts/JobSeekerLayout";
import "../styles/jobDetails.css";

function JobDetails()
{
    console.log("Job Details Page Rendering");

    const { id } = useParams();

    const navigate = useNavigate();

    const jobContext = useJob();

    const application = useApplication();

    const [job, setJob] = useState<any>(null);

    const [loading, setLoading] = useState(true);

    useEffect(() =>
    {
        console.log("Loading Job Details");

        loadJob();

    }, [id]);

    const loadJob = async () =>
    {
        try
        {
            console.log("Calling Get Job By Id API");

            const selectedJob =
                await jobContext.getJobById(id as string);

            setJob(selectedJob);

            console.log("Job Loaded Successfully");
        }
        catch (error)
        {
            console.log("Failed To Load Job");

            console.log(error);
        }
        finally
        {
            setLoading(false);
        }
    };

    const handleApply = async () =>
    {
        console.log("Apply Button Clicked");

        try
        {
            console.log("Calling Apply Job API");

            await application.applyJob(job);

            console.log("Application Submitted Successfully");

            alert("Application Submitted Successfully");

            navigate("/my-applications");
        }
        catch (error)
        {
            console.log("Application Failed");

            console.log(error);

            alert("Failed To Apply");
        }
    };

    if (loading)
    {
        return (
            <JobSeekerLayout>

                <div className="loadingContainer">

                    <h2>Loading Job...</h2>

                </div>

            </JobSeekerLayout>
        );
    }

    if (!job)
    {
        return (
            <JobSeekerLayout>

                <div className="jobNotFound">

                    <h1>Job Not Found</h1>

                </div>

            </JobSeekerLayout>
        );
    }

    return (

        <JobSeekerLayout>

            <div className="jobDetailsPage">

                <div className="jobDetailsCard">

                    <div className="jobHeader">

                        <h1>

                            {job.title}

                        </h1>

                        <h3>

                            {job.company}

                        </h3>

                    </div>

                    <div className="detailsGrid">

                        <div className="detailItem">

                            <label>Location</label>

                            <p>{job.location}</p>

                        </div>

                        <div className="detailItem">

                            <label>Workplace</label>

                            <p>{job.workplaceType}</p>

                        </div>

                        <div className="detailItem">

                            <label>Employment</label>

                            <p>{job.employmentType}</p>

                        </div>

                        <div className="detailItem">

                            <label>Experience</label>

                            <p>{job.experience}</p>

                        </div>

                        <div className="detailItem">

                            <label>Salary</label>

                            <p>₹ {job.salary}</p>

                        </div>

                        <div className="detailItem">

                            <label>Category</label>

                            <p>

                                {
                                    job.category?.name ||
                                    "No Category"
                                }

                            </p>

                        </div>

                    </div>

                    <div className="descriptionCard">

                        <h2>

                            Job Description

                        </h2>

                        <p>

                            {job.description}

                        </p>

                    </div>

                    <div className="buttonContainer">

                        <button
                            className="applyButton"
                            onClick={handleApply}
                        >

                            Apply Job

                        </button>

                        <button
                            className="backButton"
                            onClick={() => navigate("/jobs")}
                        >

                            Back To Jobs

                        </button>

                    </div>

                </div>

            </div>

        </JobSeekerLayout>

    );
}

export default JobDetails;