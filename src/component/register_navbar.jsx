import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    return (
        <nav className="navbar">

            <div className="navbar-logo">
                Freelancer Platform
            </div>

            <div className="navbar-links">

                <Link to="/freelancer">freelancer</Link>

                <Link to="/client">client</Link>

            </div>

        </nav>
    );
}

export default Navbar;