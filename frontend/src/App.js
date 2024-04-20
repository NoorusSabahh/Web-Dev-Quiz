import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from "react-router-dom";
import axios from "axios";
import SignUp from "./SignUp";
import Login from "./Login";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";

function App() {
  const [user, setUser] = useState({ loggedIn: false, token: "", isAdmin: false });

  useEffect(() => {
    if (user.token) {
      const decodedToken = JSON.parse(atob(user.token.split('.')[1]));
      const isAdmin = decodedToken.admin === true;
      setUser((prevUser) => ({
        ...prevUser,
        isAdmin: isAdmin
      }));
    }
  }, [user.token]);

  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/signup" className="nav-link">Signup</Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">Login</Link>
            </li>
          </ul>
        </nav>

        <Routes>
  <Route path="/signup" element={<SignUp />} />
  <Route path="/login" element={<Login setUser={setUser} />} />
  <Route
    path="/admin"
    element={user.loggedIn && user.isAdmin ? <AdminDashboard user = {user}/> : <Navigate to="/login" />}
  />
  <Route
    path="/user"
    element={user.loggedIn && !user.isAdmin ? <UserDashboard user={user} /> : <Navigate to="/login" />}
  />
</Routes>

      </div>
    </Router>
  );
}

export default App;
