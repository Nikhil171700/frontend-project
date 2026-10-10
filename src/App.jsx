// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Navbar from "./component/Navbar";

// import Client from "../register/client/Client.jsx";
// import Freelancer from "../register/freelancer/Freelancer.jsx";
// import Login from "./login/login.jsx"
// function App() {
//     return (
//         <BrowserRouter>

//             <Navbar />

//             <Routes>

//                 <Route path="/client" element={<Client />} />

//                 <Route path="/freelancer" element={<Freelancer />} />

//                 <Route path="/login" element={<Login />} />

//             </Routes>

//         </BrowserRouter>
//     );
// }

// export default App;
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./component/Navbar";

import Login from "./login/login";
import ClientHome from "./client/ClientHome";
import FreelancerHome from "./freelancerpage/FreelancerHome";
import Register from "./register/register";
import Client from "./register/client/Client";
import Freelancer from "./register/freelancer/Freelancer";
import Profile from "./profile/Profile";
import Notifications from "./notifications/Notifications";
function App() {
    return (
        <BrowserRouter>

            <Navbar />

            <Routes>

                <Route path="/" element={<div>Home Page</div>} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route
                    path="/client/register"
                    element={<Client />}
                />

                <Route
                    path="/freelancer/register"
                    element={<Freelancer />}
                />
                <Route
        path="/client"
        element={<ClientHome />}
    />

    <Route
        path="/freelancer"
        element={<FreelancerHome />}
    />
                <Route path="/profile" element={<Profile />} />
                <Route path="/notifications" element={<Notifications />} />
            </Routes>

        </BrowserRouter>
    );
}

export default App;