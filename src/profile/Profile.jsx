import React, { useEffect, useState } from "react";

function Profile() {

    const [message, setMessage] = useState("");

    useEffect(() => {

        const token = localStorage.getItem("token");

        fetch("http://localhost:8080/user/profile", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response => response.text())
        .then(data => {
            setMessage(data);
        })
        .catch(error => {
            console.error("Error:", error);
            setMessage("Unable to connect to backend");
        });

    }, []);

    return (
        <div>
            <h1>Profile</h1>
            <p>{message}</p>
        </div>
    );
}

export default Profile;