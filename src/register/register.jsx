import React from "react";
import { Link } from "react-router-dom";
import "./register.css";

function Register() {
    return (
        <div className="register-page">

            <div className="register-card">

                <h1>Create Account</h1>

                <p className="register-subtitle">
                    Choose how you want to register
                </p>

                <div className="register-options">

                    <Link
                        to="/freelancer/register"
                        className="register-option freelancer-option"
                    >
                        Freelancer
                    </Link>

                    <Link
                        to="/client/register"
                        className="register-option client-option"
                    >
                        Client
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default Register;