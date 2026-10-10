import React, { useEffect, useState } from "react";
import "./Notifications.css";

function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const token = localStorage.getItem("token");

    const fetchNotifications = async () => {
        try {
            const response = await fetch(
                "http://localhost:8080/notifications",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch notifications");
            }

            const data = await response.json();
            setNotifications(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    const markAsRead = async (notificationId) => {
        try {
            const response = await fetch(
                `http://localhost:8080/notifications/${notificationId}/read`,
                {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to mark notification as read");
            }

            setNotifications((previous) =>
                previous.map((notification) =>
                    notification.id === notificationId
                        ? { ...notification, read: true }
                        : notification
                )
            );
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) {
        return <div className="notifications-page">Loading notifications...</div>;
    }

    return (
        <div className="notifications-page">
            <h2>Notifications</h2>

            {error && <p className="notification-error">{error}</p>}

            {notifications.length === 0 ? (
                <p className="empty-notifications">
                    You have no notifications yet.
                </p>
            ) : (
                <div className="notification-list">
                    {notifications.map((notification) => (
                        <div
                            key={notification.id}
                            className={`notification-card ${
                                notification.read ? "read" : "unread"
                            }`}
                        >
                            <div>
                                <p>{notification.message}</p>
                                <small>
                                    {notification.createdAt
                                        ? new Date(
                                              notification.createdAt
                                          ).toLocaleString()
                                        : ""}
                                </small>
                            </div>

                            {/* {!notification.read && (
                                <button
                                    onClick={() =>
                                        markAsRead(notification.id)
                                    }
                                >
                                    Mark as read
                                </button>
                            )} */}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Notifications;