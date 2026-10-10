
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Freelancer.css";

function Freelancer() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        skills: "",
        experience: "",
        country: "",
        state: "",
        city: "",
        bio: ""
    });

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [generalError, setGeneralError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));

        if (name === "email") {
            setEmailError("");
        }

        if (name === "password" || name === "confirmPassword") {
            setPasswordError("");
        }

        setGeneralError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setEmailError("");
        setPasswordError("");
        setGeneralError("");
        setSuccessMessage("");

        if (formData.password !== formData.confirmPassword) {
            setPasswordError("Passwords do not match.");
            return;
        }

        const freelancerData = {
            name: formData.name.trim(),
            email: formData.email.trim(),
            password: formData.password,
            role: "FREELANCER",
            skills: formData.skills,
            experience: formData.experience,
            bio: formData.bio,
            country: formData.country,
            state: formData.state,
            city: formData.city
        };

        setSubmitting(true);

        try {
            const response = await fetch(
                "http://localhost:8080/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(freelancerData)
                }
            );

            const result = await response.text();

            if (!response.ok) {
                throw new Error(
                    result || "Registration failed."
                );
            }

            if (
                result.toLowerCase().includes("already registered") ||
                result.toLowerCase().includes("already exists")
            ) {
                setEmailError(result);
                return;
            }

            if (
                result.toLowerCase().includes("error") ||
                result.toLowerCase().includes("invalid") ||
                result.toLowerCase().includes("failed")
            ) {
                setGeneralError(result);
                return;
            }

            if (
                !result.toLowerCase().includes("registration successful")
            ) {
                setGeneralError(
                    result || "Unexpected response from server."
                );
                return;
            }

            setSuccessMessage(
                "Registration successful! Redirecting to login..."
            );

            setFormData({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                skills: "",
                experience: "",
                country: "",
                state: "",
                city: "",
                bio: ""
            });

            setTimeout(() => {
                navigate("/login");
            }, 2000);

        } catch (error) {
            console.error("Registration error:", error);

            setGeneralError(
                error.message || "Unable to connect to server."
            );
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="freelancer-registration">
            <div className="freelancer-card">
                <h1>Freelancer Registration</h1>

                <p className="freelancer-subtitle">
                    Create your freelancer account
                </p>

                <form onSubmit={handleSubmit}>
                    <h2>Personal Details</h2>

                    <div className="freelancer-form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            required
                        />
                    </div>

                    <div className="freelancer-form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />

                        {emailError && (
                            <p className="freelancer-error">
                                {emailError}
                            </p>
                        )}
                    </div>

                    <div className="freelancer-form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter password"
                            required
                        />
                    </div>

                    <div className="freelancer-form-group">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm password"
                            required
                        />

                        {passwordError && (
                            <p className="freelancer-error">
                                {passwordError}
                            </p>
                        )}
                    </div>

                    <h2>Professional Details</h2>

                    <div className="freelancer-form-group">
                        <label>Skills</label>
                        <input
                            type="text"
                            name="skills"
                            value={formData.skills}
                            onChange={handleChange}
                            placeholder="e.g. Java, React, Python"
                            required
                        />
                    </div>

                    <div className="freelancer-form-group">
                        <label>Experience</label>
                        <select
                            name="experience"
                            value={formData.experience}
                            onChange={handleChange}
                            required
                        >
                            <option value="">
                                Select experience
                            </option>
                            <option value="0-1">0 - 1 year</option>
                            <option value="1-3">1 - 3 years</option>
                            <option value="3-5">3 - 5 years</option>
                            <option value="5+">5+ years</option>
                        </select>
                    </div>

                    <div className="freelancer-form-group">
                        <label>Bio</label>
                        <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            placeholder="Tell clients about yourself"
                            rows="4"
                            required
                        />
                    </div>

                    <h2>Location</h2>

                    <div className="freelancer-form-group">
                        <label>Country</label>
                        <input
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            placeholder="Enter country"
                            required
                        />
                    </div>

                    <div className="freelancer-form-group">
                        <label>State</label>
                        <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            placeholder="Enter state"
                            required
                        />
                    </div>

                    <div className="freelancer-form-group">
                        <label>City</label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="Enter city"
                            required
                        />
                    </div>

                    {generalError && (
                        <p className="freelancer-error">
                            {generalError}
                        </p>
                    )}

                    {successMessage && (
                        <p className="freelancer-success">
                            {successMessage}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={submitting || !!successMessage}
                    >
                        {submitting
                            ? "Registering..."
                            : "Register as Freelancer"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Freelancer;