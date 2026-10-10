
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./Login.css";

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({
        email: "",
        password: "",
        general: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        setErrors({
            ...errors,
            [e.target.name]: "",
            general: ""
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrors({
            email: "",
            password: "",
            general: ""
        });

        try {
            const response = await fetch(
                "http://localhost:8080/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                }
            );

            const result = await response.text();

            if (result === "Account not found") {
                setErrors({
                    email: "You are not registered.",
                    password: "",
                    general: ""
                });
                return;
            }

            if (result === "Incorrect password") {
                setErrors({
                    email: "",
                    password: "Password doesn't match.",
                    general: ""
                });
                return;
            }

            if (!response.ok) {
                setErrors({
                    email: "",
                    password: "",
                    general: "Login failed."
                });
                return;
            }

            // Decode the JWT token
            let decoded;

            try {
                decoded = jwtDecode(result);
            } catch (error) {
                console.error("Invalid JWT token:", error);

                setErrors({
                    email: "",
                    password: "",
                    general: "Invalid login response from server."
                });
                return;
            }

            // Validate the user's role
            const role = decoded.role;

            if (role !== "CLIENT" && role !== "FREELANCER") {
                setErrors({
                    email: "",
                    password: "",
                    general: "Invalid user role."
                });
                return;
            }

            // Check token expiration
            if (decoded.exp && decoded.exp * 1000 <= Date.now()) {
                setErrors({
                    email: "",
                    password: "",
                    general: "Your login token has expired. Please try again."
                });
                return;
            }

            // Save the JWT token
            localStorage.setItem("token", result);

            // Notify Navbar that authentication has changed
            window.dispatchEvent(new Event("authChanged"));

            console.log("Login successful");
            console.log("User role:", role);

            // Navigate to Home after login
            navigate("/", { replace: true });

        } catch (error) {
            console.error("Login error:", error);

            setErrors({
                email: "",
                password: "",
                general: "Unable to connect to server."
            });
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">

                <h1>Login</h1>

                <p className="login-subtitle">
                    Login to your account
                </p>

                <form onSubmit={handleSubmit}>

                    <div className="login-form-group">
                        <label htmlFor="email">Email</label>

                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />

                        {errors.email && (
                            <p className="login-error">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div className="login-form-group">
                        <label htmlFor="password">Password</label>

                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                        />

                        {errors.password && (
                            <p className="login-error">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    {errors.general && (
                        <p className="login-error">
                            {errors.general}
                        </p>
                    )}

                    <button type="submit">
                        Login
                    </button>

                </form>

                <p className="register-text">
                    No, you are not registered?
                </p>

                <Link
                    to="/register"
                    className="signup-link"
                >
                    Sign up
                </Link>

            </div>
        </div>
    );
}

export default Login;