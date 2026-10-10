import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Client.css";

function Client() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        companyName: "",
        companyDescription: "",
        companyWebsite: "",
        country: "",
        state: "",
        city: ""
    });

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [generalError, setGeneralError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        if (e.target.name === "email") {
            setEmailError("");
        }

        if (
            e.target.name === "password" ||
            e.target.name === "confirmPassword"
        ) {
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

        // Check passwords
        if (formData.password !== formData.confirmPassword) {

            setPasswordError("Passwords do not match.");

            return;
        }

        const clientData = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role: "CLIENT"
        };

        try {

            const response = await fetch(
                "http://localhost:8080/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(clientData)
                }
            );

            const result = await response.text();

            if (response.ok) {

                setSuccessMessage("Registration successful!");

                setFormData({
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                    companyName: "",
                    companyDescription: "",
                    companyWebsite: "",
                    country: "",
                    state: "",
                    city: ""
                });

                // Redirect to login after 4 seconds
                setTimeout(() => {
                    navigate("/login");
                }, 4000);

            } else {

                // Show duplicate email below email field
                if (
                    result.toLowerCase().includes("already") ||
                    result.toLowerCase().includes("email")
                ) {

                    setEmailError(result);

                } else {

                    setGeneralError(result);
                }
            }

        } catch (error) {

            console.error("Registration error:", error);

            setGeneralError(
                "Unable to connect to server."
            );
        }
    };

    return (
        <div className="client-registration">

            <div className="registration-card">

                <h1>Client Registration</h1>

                <p className="registration-subtitle">
                    Create your client account
                </p>

                <form onSubmit={handleSubmit}>

                    {/* Personal Details */}

                    <h2>Personal Details</h2>

                    <div className="form-group">

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


                    <div className="form-group">

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
                            <p className="client-error">
                                {emailError}
                            </p>
                        )}

                    </div>


                    <div className="form-group">

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


                    <div className="form-group">

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
                            <p className="client-error">
                                {passwordError}
                            </p>
                        )}

                    </div>


                    {/* Company Details */}

                    <h2>Company Details</h2>

                    <div className="form-group">

                        <label>Company Name</label>

                        <input
                            type="text"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                            placeholder="Enter company name"
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label>Company Description</label>

                        <textarea
                            name="companyDescription"
                            value={formData.companyDescription}
                            onChange={handleChange}
                            placeholder="Describe your company"
                            rows="4"
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label>Company Website</label>

                        <input
                            type="url"
                            name="companyWebsite"
                            value={formData.companyWebsite}
                            onChange={handleChange}
                            placeholder="https://example.com"
                        />

                    </div>


                    {/* Location */}

                    <h2>Location</h2>

                    <div className="form-group">

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


                    <div className="form-group">

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


                    <div className="form-group">

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


                    {/* General Error */}

                    {generalError && (
                        <p className="client-error">
                            {generalError}
                        </p>
                    )}


                    {/* Success Message */}

                    {successMessage && (
                        <p className="client-success">
                            {successMessage}
                        </p>
                    )}


                    <button
                        type="submit"
                        disabled={!!successMessage}
                    >
                        Register as Client
                    </button>

                </form>

            </div>

        </div>
    );
}

export default Client;