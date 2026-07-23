import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { useJob } from "../context/JobContext";
import { useCategory } from "../context/CategoryContext";
import { jobValidation } from "../validations/job.validation";
import RecruiterLayout from "../layouts/RecruiterLayout";
import "../styles/job.css";

function Job()
{
    console.log("Job Page Rendering");

    const navigate = useNavigate();

    const job = useJob();

    const category = useCategory();

    if (job.loading || category.loading)
    {
        return (
            <RecruiterLayout>

                <div className="loadingContainer">

                    <h2>Loading...</h2>

                </div>

            </RecruiterLayout>
        );
    }

    const handleSubmit = async (
        values: any,
        { resetForm }: any
    ) =>
    {
        console.log("Job Form Submitted");

        try
        {
            console.log("Creating Job");

            await job.createJob(values);

            console.log("Job Created Successfully");

            resetForm();
        }
        catch (error)
        {
            console.log("Create Job Failed");

            console.log(error);
        }
    };

    const handleDelete = async (id: string) =>
    {
        console.log("Delete Button Clicked");

        try
        {
            await job.deleteJob(id);

            console.log("Job Deleted Successfully");
        }
        catch (error)
        {
            console.log(error);
        }
    };

    const handleView = () =>
    {
        console.log("Navigating To Jobs");

        navigate("/jobs");
    };

    return (

        <RecruiterLayout>

            <div className="jobPage">

                <div className="jobHeader">

                    <h1>Create Job</h1>

                    <p>

                        Total Jobs :

                        <span>

                            {" "}

                            {job.jobs.length}

                        </span>

                    </p>

                </div>

                <div className="jobFormCard">

                    <Formik
                        initialValues={{
                            title: "",
                            company: "",
                            location: "",
                            workplaceType: "",
                            employmentType: "",
                            experience: "",
                            salary: "",
                            description: "",
                            category: ""
                        }}
                        validationSchema={jobValidation}
                        onSubmit={handleSubmit}
                    >

                        <Form>

                            <div className="formGrid">

                                <div className="formGroup">

                                    <label>Job Title</label>

                                    <Field
                                        type="text"
                                        name="title"
                                    />

                                    <ErrorMessage
                                        name="title"
                                        component="p"
                                        className="error"
                                    />

                                </div>

                                <div className="formGroup">

                                    <label>Company</label>

                                    <Field
                                        type="text"
                                        name="company"
                                    />

                                    <ErrorMessage
                                        name="company"
                                        component="p"
                                        className="error"
                                    />

                                </div>

                                <div className="formGroup">

                                    <label>Location</label>

                                    <Field
                                        type="text"
                                        name="location"
                                    />

                                    <ErrorMessage
                                        name="location"
                                        component="p"
                                        className="error"
                                    />

                                </div>

                                <div className="formGroup">

                                    <label>Workplace Type</label>

                                    <Field
                                        as="select"
                                        name="workplaceType"
                                    >

                                        <option value="">Select</option>

                                        <option value="On-site">
                                            On-site
                                        </option>

                                        <option value="Remote">
                                            Remote
                                        </option>

                                        <option value="Hybrid">
                                            Hybrid
                                        </option>

                                    </Field>

                                    <ErrorMessage
                                        name="workplaceType"
                                        component="p"
                                        className="error"
                                    />

                                </div>

                                <div className="formGroup">

                                    <label>Employment Type</label>

                                    <Field
                                        as="select"
                                        name="employmentType"
                                    >

                                        <option value="">Select</option>

                                        <option value="Full-Time">
                                            Full-Time
                                        </option>

                                        <option value="Part-Time">
                                            Part-Time
                                        </option>

                                        <option value="Internship">
                                            Internship
                                        </option>

                                        <option value="Contract">
                                            Contract
                                        </option>

                                        <option value="Freelance">
                                            Freelance
                                        </option>

                                        <option value="Temporary">
                                            Temporary
                                        </option>

                                    </Field>

                                    <ErrorMessage
                                        name="employmentType"
                                        component="p"
                                        className="error"
                                    />

                                </div>

                                <div className="formGroup">

                                    <label>Experience</label>

                                    <Field
                                        as="select"
                                        name="experience"
                                    >

                                        <option value="">Select</option>

                                        <option value="Student">Student</option>

                                        <option value="Fresher">Fresher</option>

                                        <option value="0 Years">0 Years</option>

                                        <option value="1 Year">1 Year</option>

                                        <option value="2 Years">2 Years</option>

                                        <option value="3 Years">3 Years</option>

                                        <option value="4-6 Years">4-6 Years</option>

                                        <option value="7-10 Years">7-10 Years</option>

                                        <option value="10+ Years">10+ Years</option>

                                    </Field>

                                    <ErrorMessage
                                        name="experience"
                                        component="p"
                                        className="error"
                                    />

                                </div>

                                <div className="formGroup">

                                    <label>Salary</label>

                                    <Field
                                        type="number"
                                        name="salary"
                                    />

                                    <ErrorMessage
                                        name="salary"
                                        component="p"
                                        className="error"
                                    />

                                </div>

                                <div className="formGroup">

                                    <label>Category</label>

                                    <Field
                                        as="select"
                                        name="category"
                                    >

                                        <option value="">
                                            Select Category
                                        </option>

                                        {
                                            category.categories.map(
                                                (item: any) => (

                                                    <option
                                                        key={item._id}
                                                        value={item._id}
                                                    >

                                                        {item.name}

                                                    </option>

                                                )
                                            )
                                        }

                                    </Field>

                                    <ErrorMessage
                                        name="category"
                                        component="p"
                                        className="error"
                                    />

                                </div>

                            </div>

                            <div className="formGroup">

                                <label>Description</label>

                                <Field
                                    as="textarea"
                                    rows={5}
                                    name="description"
                                />

                                <ErrorMessage
                                    name="description"
                                    component="p"
                                    className="error"
                                />

                            </div>

                            <button
                                className="createButton"
                                type="submit"
                            >

                                Create Job

                            </button>

                        </Form>

                    </Formik>

                </div>

                <div className="tableCard">

                    <table className="jobTable">

                        <thead>

                            <tr>

                                <th>Title</th>

                                <th>Company</th>

                                <th>Location</th>

                                <th>Action</th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                job.jobs.length === 0 ?

                                    (

                                        <tr>

                                            <td
                                                colSpan={4}
                                                className="emptyRow"
                                            >

                                                No Jobs Created

                                            </td>

                                        </tr>

                                    )

                                    :

                                    job.jobs.map(
                                        (item: any) => (

                                            <tr key={item._id}>

                                                <td>{item.title}</td>

                                                <td>{item.company}</td>

                                                <td>{item.location}</td>

                                                <td>

                                                    <button
                                                        className="deleteButton"
                                                        onClick={() =>
                                                            handleDelete(item._id)
                                                        }
                                                    >

                                                        Delete

                                                    </button>

                                                </td>

                                            </tr>

                                        )
                                    )

                            }

                        </tbody>

                    </table>

                </div>

                <button
                    className="viewJobsButton"
                    onClick={handleView}
                >

                    View All Jobs

                </button>

            </div>

        </RecruiterLayout>

    );
}

export default Job;