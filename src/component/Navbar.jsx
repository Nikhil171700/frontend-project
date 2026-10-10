import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./Navbar.css";

function Navbar() {
    const navigate = useNavigate();

    const [token, setToken] = useState(() =>
        localStorage.getItem("token")
    );
    const [role, setRole] = useState(null);
    const [unreadCount, setUnreadCount] = useState(0);

    // Update navbar whenever authentication changes
    useEffect(() => {
        const updateAuth = () => {
            const currentToken = localStorage.getItem("token");

            if (!currentToken) {
                setToken(null);
                setRole(null);
                setUnreadCount(0);
                return;
            }

            try {
                const decoded = jwtDecode(currentToken);

                // Check whether the token has expired
                if (decoded.exp && decoded.exp * 1000 <= Date.now()) {
                    localStorage.removeItem("token");
                    setToken(null);
                    setRole(null);
                    setUnreadCount(0);
                    return;
                }

                setToken(currentToken);
                setRole(decoded.role);
            } catch (error) {
                setToken(null);
                setRole(null);
                setUnreadCount(0);
                console.error("Invalid JWT token:", error);
            }
        };

        updateAuth();

        window.addEventListener("storage", updateAuth);
        window.addEventListener("authChanged", updateAuth);

        return () => {
            window.removeEventListener("storage", updateAuth);
            window.removeEventListener("authChanged", updateAuth);
        };
    }, []);

    // Fetch unread notifications
    useEffect(() => {
        if (!token) {
            setUnreadCount(0);
            return;
        }

        let cancelled = false;

        const fetchUnreadCount = async () => {
            try {
                const response = await fetch(
                    "http://localhost:8080/notifications/unread/count",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error(
                        "Unable to fetch notification count"
                    );
                }

                const data = await response.json();

                if (!cancelled) {
                    setUnreadCount(data.count ?? 0);
                }
            } catch (error) {
                if (!cancelled) {
                    console.error(
                        "Notification error:",
                        error.message
                    );
                }
            }
        };

        fetchUnreadCount();

        const intervalId = setInterval(fetchUnreadCount, 15000);

        return () => {
            cancelled = true;
            clearInterval(intervalId);
        };
    }, [token]);

    // Home navigation based on logged-in role
    const handleHome = () => {
        if (role === "FREELANCER") {
            navigate("/client");
        } else if (role === "CLIENT") {
            navigate("/freelancer");
        } else {
            navigate("/");
        }
    };

    // Logout
    const handleLogout = () => {
        localStorage.removeItem("token");
window.dispatchEvent(new Event("authChanged"));
        setToken(null);
        setRole(null);
        setUnreadCount(0);

        window.dispatchEvent(new Event("authChanged"));

        navigate("/login");
    };

    const handleNotifications = () => {
        navigate("/notifications");
    };

    return (
        <nav className="navbar">
            <div
                className="navbar-logo"
                onClick={handleHome}
                style={{ cursor: "pointer" }}
            >
                Freelancer Platform
            </div>

            <div className="navbar-links">
                <button onClick={handleHome}>
                    Home
                </button>

                {!token ? (
                    <Link to="/login">
                        Login
                    </Link>
                ) : (
                    <>
                        <Link to="/profile">
                            Profile
                        </Link>

                        <button
                            className="notification-button"
                            onClick={handleNotifications}
                            aria-label={`Notifications, ${unreadCount} unread`}
                        >
                            Notifications

                            {unreadCount > 0 && (
                                <span className="notification-badge">
                                    {unreadCount > 99
                                        ? "99+"
                                        : unreadCount}
                                </span>
                            )}
                        </button>

                        <button onClick={handleLogout}>
                            Logout
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;