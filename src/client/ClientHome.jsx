// import React, { useEffect, useState } from "react";
// import "./ClientHome.css";

// function ClientHome() {

//     /* =========================
//        FREELANCER JOBS
//     ========================= */

//     const [freelancerJobs, setFreelancerJobs] = useState([]);
//     const [searchText, setSearchText] = useState("");
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");


//     /* =========================
//        POST JOB FORM
//     ========================= */

//     const [showJobForm, setShowJobForm] = useState(false);

//     const [jobTitle, setJobTitle] = useState("");
//     const [jobDescription, setJobDescription] = useState("");
//     const [jobSkills, setJobSkills] = useState("");
//     const [hourlyRate, setHourlyRate] = useState("");
//     const [jobCountry, setJobCountry] = useState("");
//     const [jobState, setJobState] = useState("");

//     const [postingJob, setPostingJob] = useState(false);
//     const [postMessage, setPostMessage] = useState("");


//     /* =========================
//        FETCH FREELANCER JOBS
//     ========================= */

//     useEffect(() => {

//         const fetchFreelancerJobs = async () => {

//             try {

//                 const token = localStorage.getItem("token");
// console.log("Token exists:", !!token);
// console.log("Token value:", token);
//                 const response = await fetch(
//                     "http://localhost:8080/freelancer-jobs",
//                     {
//                         method: "GET",
//                         headers: {
//                             Authorization: `Bearer ${token}`,
//                             "Content-Type": "application/json"
//                         }
//                     }
//                 );

//                 if (!response.ok) {
//                     throw new Error("Failed to fetch freelancer posts");
//                 }

//                 const data = await response.json();

//                 setFreelancerJobs(data);

//             } catch (err) {

//                 console.error(err);

//                 setError("Unable to load freelancer posts.");

//             } finally {

//                 setLoading(false);

//             }
//         };

//         fetchFreelancerJobs();

//     }, []);


//     /* =========================
//        SEARCH
//     ========================= */

//     const handleSearch = () => {

//         setSearchText(searchText.trim());

//     };


//     const handleKeyDown = (event) => {

//         if (event.key === "Enter") {
//             handleSearch();
//         }

//     };


//     /* =========================
//        FILTER FREELANCERS
//     ========================= */

//     const filteredFreelancers = freelancerJobs
//         .filter((job) => {

//             const search = searchText.toLowerCase().trim();

//             if (!search) {
//                 return true;
//             }

//             const title = job.title
//                 ? job.title.toLowerCase()
//                 : "";

//             const skills = job.skills
//                 ? job.skills.toLowerCase()
//                 : "";

//             const description = job.description
//                 ? job.description.toLowerCase()
//                 : "";

//             const country = job.country
//                 ? job.country.toLowerCase()
//                 : "";

//             const state = job.state
//                 ? job.state.toLowerCase()
//                 : "";

//             return (
//                 title.includes(search) ||
//                 skills.includes(search) ||
//                 description.includes(search) ||
//                 country.includes(search) ||
//                 state.includes(search)
//             );

//         })
//         .slice(0, 8);


//     /* =========================
//        CATEGORY SEARCH
//     ========================= */

//     const selectCategory = (category) => {

//         setSearchText(category);

//         window.scrollTo({
//             top: 0,
//             behavior: "smooth"
//         });

//     };


//     /* =========================
//        POST CLIENT JOB
//     ========================= */

//     const handlePostJob = async (event) => {

//         event.preventDefault();

//         try {

//             setPostingJob(true);
//             setPostMessage("");

//             const token = localStorage.getItem("token");

//             if (!token) {

//                 setPostMessage(
//                     "You are not logged in. Please login again."
//                 );

//                 return;
//             }


//             const response = await fetch(
//                 "http://localhost:8080/client-jobs",
//                 {
//                     method: "POST",

//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                         "Content-Type": "application/json"
//                     },

//                     body: JSON.stringify({
//                         title: jobTitle,
//                         description: jobDescription,
//                         skills: jobSkills,
//                         hourlyRate: Number(hourlyRate),
//                         country: jobCountry,
//                         state: jobState
//                     })
//                 }
//             );


//             if (!response.ok) {

//                 const errorText = await response.text();

//                 console.error(
//                     "Server response:",
//                     errorText
//                 );

//                 throw new Error(
//                     errorText || "Failed to post job"
//                 );
//             }


//             const data = await response.json();

//             console.log(
//                 "Job posted successfully:",
//                 data
//             );


//             setPostMessage(
//                 "Job posted successfully!"
//             );


//             /* =========================
//                CLEAR FORM
//             ========================= */

//             setJobTitle("");
//             setJobDescription("");
//             setJobSkills("");
//             setHourlyRate("");
//             setJobCountry("");
//             setJobState("");


//         } catch (error) {

//             console.error(
//                 "Post job error:",
//                 error
//             );

//             setPostMessage(
//                 "Failed to post job. Please try again."
//             );

//         } finally {

//             setPostingJob(false);

//         }

//     };


//     return (

//         <div className="client-home">


//             {/* =========================
//                 HERO / SEARCH
//             ========================= */}

//             <section className="client-hero">

//                 <div className="hero-content">

//                     <h1>
//                         Find the Right Freelancer
//                     </h1>

//                     <p>
//                         Discover skilled professionals for your projects.
//                     </p>


//                     <div className="client-search">

//                         <input
//                             type="text"
//                             value={searchText}
//                             onChange={(e) =>
//                                 setSearchText(e.target.value)
//                             }
//                             onKeyDown={handleKeyDown}
//                             placeholder="Search Java, React, Web Development..."
//                         />

//                         <button onClick={handleSearch}>
//                             Search
//                         </button>

//                     </div>

//                 </div>

//             </section>


//             {/* =========================
//                 AVAILABLE FREELANCERS
//             ========================= */}

//             <section className="available-section">

//                 <div className="section-heading">

//                     <h2>
//                         {searchText
//                             ? "Search Results"
//                             : "Available Freelancers"
//                         }
//                     </h2>

//                     <p>
//                         {searchText
//                             ? `Showing freelancers matching "${searchText}"`
//                             : "Explore professionals currently available for work."
//                         }
//                     </p>

//                 </div>


//                 {/* LOADING */}

//                 {loading && (

//                     <div className="status-message">

//                         Loading freelancers...

//                     </div>

//                 )}


//                 {/* ERROR */}

//                 {!loading && error && (

//                     <div className="status-message error">

//                         {error}

//                     </div>

//                 )}


//                 {/* NO RESULTS */}

//                 {!loading &&
//                     !error &&
//                     filteredFreelancers.length === 0 && (

//                         <div className="status-message">

//                             <h3>
//                                 No freelancers found
//                             </h3>

//                             <p>
//                                 Try searching for another skill or role.
//                             </p>

//                         </div>

//                     )
//                 }


//                 {/* FREELANCER CARDS */}

//                 {!loading &&
//                     !error &&
//                     filteredFreelancers.length > 0 && (

//                         <div className="freelancer-grid">

//                             {filteredFreelancers.map((job) => (

//                                 <div
//                                     className="freelancer-card"
//                                     key={job.id}
//                                 >

//                                     <div className="freelancer-card-content">

//                                         <h3>
//                                             {job.title}
//                                         </h3>


//                                         <p className="job-description">
//                                             {job.description}
//                                         </p>


//                                         <div className="job-info">

//                                             <div>

//                                                 <span>
//                                                     Skills
//                                                 </span>

//                                                 <strong>
//                                                     {job.skills}
//                                                 </strong>

//                                             </div>


//                                             <div>

//                                                 <span>
//                                                     Location
//                                                 </span>

//                                                 <strong>

//                                                     {job.country}

//                                                     {job.state
//                                                         ? `, ${job.state}`
//                                                         : ""
//                                                     }

//                                                 </strong>

//                                             </div>


//                                             <div>

//                                                 <span>
//                                                     Hourly Rate
//                                                 </span>

//                                                 <strong>
//                                                     ₹{job.hourlyRate}
//                                                 </strong>

//                                             </div>

//                                         </div>

//                                     </div>


//                                     <button
//                                         className="view-details-button"
//                                     >
//                                         View Details
//                                     </button>

//                                 </div>

//                             ))}

//                         </div>

//                     )}

//             </section>


//             {/* =========================
//                 POST A JOB
//             ========================= */}

//             <section className="post-job-section">

//                 <div className="post-job-content">

//                     <h2>
//                         Want to hire someone?
//                     </h2>

//                     <p>
//                         Post your job and find the right freelancer
//                         for your project.
//                     </p>


//                     {/* OPEN FORM BUTTON */}

//                     <button
//                         className="post-job-button"
//                         onClick={() => {

//                             setShowJobForm(!showJobForm);
//                             setPostMessage("");

//                         }}
//                     >

//                         {showJobForm
//                             ? "Close Form"
//                             : "Post a Job"
//                         }

//                     </button>


//                     {/* =========================
//                         JOB FORM
//                     ========================= */}

//                     {showJobForm && (

//                         <form
//                             className="job-form"
//                             onSubmit={handlePostJob}
//                         >

//                             <h3>
//                                 Post a New Job
//                             </h3>


//                             {/* JOB TITLE */}

//                             <input
//                                 type="text"
//                                 placeholder="Job Title"
//                                 value={jobTitle}
//                                 onChange={(e) =>
//                                     setJobTitle(e.target.value)
//                                 }
//                                 required
//                             />


//                             {/* DESCRIPTION */}

//                             <textarea
//                                 placeholder="Describe the work you need..."
//                                 value={jobDescription}
//                                 onChange={(e) =>
//                                     setJobDescription(e.target.value)
//                                 }
//                                 rows="5"
//                                 required
//                             />


//                             {/* SKILLS */}

//                             <input
//                                 type="text"
//                                 placeholder="Required Skills (Java, React, SQL...)"
//                                 value={jobSkills}
//                                 onChange={(e) =>
//                                     setJobSkills(e.target.value)
//                                 }
//                                 required
//                             />


//                             {/* HOURLY RATE */}

//                             <input
//                                 type="number"
//                                 placeholder="Hourly Rate"
//                                 value={hourlyRate}
//                                 onChange={(e) =>
//                                     setHourlyRate(e.target.value)
//                                 }
//                                 min="1"
//                                 required
//                             />


//                             {/* COUNTRY */}

//                             <input
//                                 type="text"
//                                 placeholder="Country"
//                                 value={jobCountry}
//                                 onChange={(e) =>
//                                     setJobCountry(e.target.value)
//                                 }
//                                 required
//                             />


//                             {/* STATE */}

//                             <input
//                                 type="text"
//                                 placeholder="State"
//                                 value={jobState}
//                                 onChange={(e) =>
//                                     setJobState(e.target.value)
//                                 }
//                                 required
//                             />


//                             {/* SUBMIT */}

//                             <button
//                                 type="submit"
//                                 className="submit-job-button"
//                                 disabled={postingJob}
//                             >

//                                 {postingJob
//                                     ? "Posting..."
//                                     : "Submit Job"
//                                 }

//                             </button>


//                             {/* MESSAGE */}

//                             {postMessage && (

//                                 <p
//                                     className={
//                                         postMessage.includes("successfully")
//                                             ? "success-message"
//                                             : "error-message"
//                                     }
//                                 >

//                                     {postMessage}

//                                 </p>

//                             )}

//                         </form>

//                     )}

//                 </div>

//             </section>


//             {/* =========================
//                 EXPLORE BY CATEGORY
//             ========================= */}

//             <section className="category-section">

//                 <div className="section-heading">

//                     <h2>
//                         Explore by Category
//                     </h2>

//                     <p>
//                         Find professionals based on the type of work you need.
//                     </p>

//                 </div>


//                 <div className="category-grid">


//                     {/* WEB DEVELOPMENT */}

//                     <div
//                         className="category-card"
//                         onClick={() =>
//                             selectCategory("web development")
//                         }
//                     >

//                         <h3>
//                             Web Development
//                         </h3>

//                         <p>
//                             Websites and web applications
//                         </p>

//                     </div>


//                     {/* MOBILE */}

//                     <div
//                         className="category-card"
//                         onClick={() =>
//                             selectCategory("mobile development")
//                         }
//                     >

//                         <h3>
//                             Mobile Development
//                         </h3>

//                         <p>
//                             Android and mobile applications
//                         </p>

//                     </div>


//                     {/* UI UX */}

//                     <div
//                         className="category-card"
//                         onClick={() =>
//                             selectCategory("ui/ux")
//                         }
//                     >

//                         <h3>
//                             UI/UX Design
//                         </h3>

//                         <p>
//                             Modern and user-friendly designs
//                         </p>

//                     </div>


//                     {/* DATA SCIENCE */}

//                     <div
//                         className="category-card"
//                         onClick={() =>
//                             selectCategory("data science")
//                         }
//                     >

//                         <h3>
//                             Data Science & AI
//                         </h3>

//                         <p>
//                             AI, ML and data science professionals
//                         </p>

//                     </div>


//                     {/* CONTENT */}

//                     <div
//                         className="category-card"
//                         onClick={() =>
//                             selectCategory("content writing")
//                         }
//                     >

//                         <h3>
//                             Content Writing
//                         </h3>

//                         <p>
//                             Blogs, articles and content
//                         </p>

//                     </div>


//                     {/* MARKETING */}

//                     <div
//                         className="category-card"
//                         onClick={() =>
//                             selectCategory("digital marketing")
//                         }
//                     >

//                         <h3>
//                             Digital Marketing
//                         </h3>

//                         <p>
//                             Marketing and online growth
//                         </p>

//                     </div>

//                 </div>

//             </section>

//         </div>

//     );
// }

// export default ClientHome;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ClientHome.css";

function ClientHome() {
    const navigate = useNavigate();

    const [clientJobs, setClientJobs] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedJob, setSelectedJob] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        skills: "",
        hourlyRate: "",
        country: "",
        state: ""
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const [applying, setApplying] = useState(false);
    const [appliedJobIds, setAppliedJobIds] = useState([]);

    // ================= LOAD CLIENT JOBS =================

    useEffect(() => {
        const fetchClientJobs = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await fetch(
                    "http://localhost:8080/client-jobs",
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json"
                        }
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch client jobs");
                }

                const data = await response.json();
                setClientJobs(data);
            } catch (error) {
                console.error("Error loading client jobs:", error);
                setError("Unable to load client opportunities.");
            } finally {
                setLoading(false);
            }
        };

        fetchClientJobs();
    }, []);

    // ================= HANDLE FORM INPUT =================

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        setError("");
        setSuccessMessage("");
    };

    // ================= CREATE FREELANCER POST =================

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccessMessage("");

        try {
            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            const freelancerJob = {
                title: formData.title,
                description: formData.description,
                skills: formData.skills,
                hourlyRate: Number(formData.hourlyRate),
                country: formData.country,
                state: formData.state
            };

            const response = await fetch(
                "http://localhost:8080/freelancer-jobs",
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(freelancerJob)
                }
            );

            if (!response.ok) {
                const result = await response.text();

                throw new Error(
                    result || "Failed to create freelancer post"
                );
            }

            const createdJob = await response.json();
            console.log("Freelancer post created:", createdJob);

            setSuccessMessage(
                "Your freelancer post was created successfully!"
            );

            setFormData({
                title: "",
                description: "",
                skills: "",
                hourlyRate: "",
                country: "",
                state: ""
            });

            setShowForm(false);
        } catch (error) {
            console.error("Error creating freelancer post:", error);

            setError(
                error.message || "Unable to create freelancer post."
            );
        }
    };

    // ================= APPLY FOR CLIENT JOB =================

    const handleApply = async () => {
        if (!selectedJob || applying) {
            return;
        }

        setError("");
        setSuccessMessage("");

        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        setApplying(true);

        try {
            const response = await fetch(
                `http://localhost:8080/applications/apply/${selectedJob.id}`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            const result = await response.json().catch(() => null);

            if (!response.ok) {
                throw new Error(
                    result?.message ||
                    result?.error ||
                    "Unable to apply for this opportunity."
                );
            }

            setAppliedJobIds((previous) =>
                previous.includes(selectedJob.id)
                    ? previous
                    : [...previous, selectedJob.id]
            );

            setSuccessMessage(
                "Application submitted successfully!"
            );

            setSelectedJob(null);
        } catch (error) {
            console.error("Error applying for job:", error);
            setError(error.message);
        } finally {
            setApplying(false);
        }
    };

    // ================= SEARCH CLIENT JOBS =================

    const filteredJobs = clientJobs.filter((job) => {
        const searchText = search.toLowerCase().trim();

        if (!searchText) {
            return true;
        }

        const title = job.title?.toLowerCase() || "";
        const description = job.description?.toLowerCase() || "";
        const skills = job.skills?.toLowerCase() || "";
        const country = job.country?.toLowerCase() || "";
        const state = job.state?.toLowerCase() || "";

        return (
            title.includes(searchText) ||
            description.includes(searchText) ||
            skills.includes(searchText) ||
            country.includes(searchText) ||
            state.includes(searchText)
        );
    });

    // ================= UI =================

    return (
        <div className="freelancer-home">

            {/* HERO */}

            <section className="freelancer-hero">
                <h1>Find Your Next Opportunity</h1>

                <p>
                    Discover client projects and opportunities
                    that match your skills.
                </p>

                <div className="freelancer-search">
                    <input
                        type="text"
                        placeholder="Search job, skill or location..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <button type="button">
                        Search
                    </button>
                </div>

                <button
                    className="post-job-button"
                    onClick={() => setShowForm(!showForm)}
                >
                    + Post Your Availability
                </button>
            </section>

            {/* ERROR */}

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            {/* SUCCESS */}

            {successMessage && (
                <div className="success-message">
                    {successMessage}
                </div>
            )}

            {/* FREELANCER AVAILABILITY FORM */}

            {showForm && (
                <section className="job-form-section">
                    <div className="job-form-card">
                        <h2>Post Your Availability</h2>

                        <p>
                            Tell clients about the type of
                            work you are available for.
                        </p>

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Job Title</label>

                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="e.g. Java Full Stack Developer"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Description</label>

                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Describe the work you can provide..."
                                    rows="5"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Skills</label>

                                <input
                                    type="text"
                                    name="skills"
                                    value={formData.skills}
                                    onChange={handleChange}
                                    placeholder="Java, Spring Boot, React, MySQL"
                                    required
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Hourly Rate (₹)</label>

                                    <input
                                        type="number"
                                        name="hourlyRate"
                                        value={formData.hourlyRate}
                                        onChange={handleChange}
                                        placeholder="500"
                                        min="1"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Country</label>

                                    <input
                                        type="text"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        placeholder="India"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>State</label>

                                <input
                                    type="text"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    placeholder="Telangana"
                                    required
                                />
                            </div>

                            <div className="form-buttons">
                                <button
                                    type="submit"
                                    className="submit-job"
                                >
                                    Post Availability
                                </button>

                                <button
                                    type="button"
                                    className="cancel-job"
                                    onClick={() => setShowForm(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
            )}

            {/* CLIENT JOBS */}

            <section className="jobs-section">
                <div className="jobs-header">
                    <div>
                        <h2>Available Opportunities</h2>
                        <p>Find projects posted by clients.</p>
                    </div>

                    <span>
                        {filteredJobs.length}{" "}
                        {filteredJobs.length === 1
                            ? "opportunity"
                            : "opportunities"}
                    </span>
                </div>

                {loading ? (
                    <div className="no-jobs">
                        <h3>Loading opportunities...</h3>
                    </div>
                ) : filteredJobs.length === 0 ? (
                    <div className="no-jobs">
                        <h3>No opportunities found</h3>
                        <p>
                            Try searching for another job or skill.
                        </p>
                    </div>
                ) : (
                    <div className="jobs-grid">
                        {filteredJobs.map((job) => (
                            <div
                                className="job-card"
                                key={job.id}
                                onClick={() => setSelectedJob(job)}
                            >
                                <div className="company-logo">
                                    {job.title
                                        ? job.title.charAt(0).toUpperCase()
                                        : "J"}
                                </div>

                                <h3>{job.title}</h3>

                                <p>{job.description}</p>

                                <p className="job-location">
                                    📍 {job.country}
                                    {job.state ? `, ${job.state}` : ""}
                                </p>

                                <div className="job-skills">
                                    {job.skills
                                        ?.split(",")
                                        .slice(0, 4)
                                        .map((skill, index) => (
                                            <span key={index}>
                                                {skill.trim()}
                                            </span>
                                        ))}
                                </div>

                                <div className="job-bottom">
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedJob(job);
                                        }}
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* JOB DETAILS MODAL */}

            {selectedJob && (
                <div
                    className="job-modal"
                    onClick={() => setSelectedJob(null)}
                >
                    <div
                        className="job-details"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            className="close-button"
                            onClick={() => setSelectedJob(null)}
                        >
                            ×
                        </button>

                        <div className="details-company-logo">
                            {selectedJob.title
                                ? selectedJob.title.charAt(0).toUpperCase()
                                : "J"}
                        </div>

                        <h2>{selectedJob.title}</h2>

                        <p className="details-location">
                            📍 {selectedJob.country}
                            {selectedJob.state
                                ? `, ${selectedJob.state}`
                                : ""}
                        </p>

                        <div className="details-section">
                            <h4>Required Skills</h4>

                            <div className="details-skills">
                                {selectedJob.skills
                                    ?.split(",")
                                    .map((skill, index) => (
                                        <span key={index}>
                                            {skill.trim()}
                                        </span>
                                    ))}
                            </div>
                        </div>

                        <div className="details-section">
                            <h4>Project Description</h4>
                            <p>{selectedJob.description}</p>
                        </div>

                        <button
                            type="button"
                            className="apply-button"
                            onClick={handleApply}
                            disabled={
                                applying ||
                                appliedJobIds.includes(selectedJob.id)
                            }
                        >
                            {applying
                                ? "Submitting..."
                                : appliedJobIds.includes(selectedJob.id)
                                ? "Already Applied"
                                : "Apply for this Opportunity"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ClientHome;