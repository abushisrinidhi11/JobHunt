import { useEffect } from "react";
import { useApplication } from "../context/ApplicationContext";
import JobSeekerLayout from "../layouts/JobSeekerLayout";
function MyApplications()
{
    console.log("My Applications Page Rendering");

    const application = useApplication();

    useEffect(() =>
    {
        console.log("Applications Page Loaded");

        console.log("Total Applications");

        console.log(application.applications.length);

    }, [application.applications]);

    if (application.loading)
    {
        console.log("Applications Loading");

        return <h2>Loading...</h2>;
    }

    const handleWithdraw = async (id: string) =>
    {
        console.log("Withdraw Button Clicked");

        try
        {
            await application.withdrawApplication(id);

            console.log("Application Withdrawn Successfully");
        }
        catch (error)
        {
            console.log("Withdraw Failed");

            console.log(error);
        }
    };

    return (
        <JobSeekerLayout>
        <div>

            <h1>

                My Applications

            </h1>

            <h3>

                Total Applications : {application.applications.length}

            </h3>

            <table border={1}>

                <thead>

                    <tr>

                        <th>Job Title</th>

                        <th>Company</th>

                        <th>Location</th>

                        <th>Status</th>

                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {
                        application.applications.length === 0 &&

                        <tr>

                            <td colSpan={5}>

                                No Applications Found

                            </td>

                        </tr>
                    }

                    {
                        application.applications.map((item: any) =>
                        (
                            <tr key={item._id}>

                                <td>

                                    {item.jobId?.title}

                                </td>

                                <td>

                                    {item.jobId?.company}

                                </td>

                                <td>

                                    {item.jobId?.location}

                                </td>

                                <td>

                                    {item.status}

                                </td>

                                <td>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleWithdraw(item._id)
                                        }
                                    >
                                        Withdraw
                                    </button>

                                </td>

                            </tr>
                        ))
                    }

                </tbody>

            </table>

        </div>
        </JobSeekerLayout>
    );
}

export default MyApplications;