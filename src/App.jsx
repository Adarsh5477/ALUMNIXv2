import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import ProtectedRoute from './utils/ProtectedRoute';
import Navbar from './components/Navbar';
import ProtectedAdminRoute from './utils/ProtectedAdminRoute'
// import ProtectedRouteAdmin from './utils/ProtectedRouteAdmin';
import './styles/App.css';
import './styles/main.css';
import './styles/navbar.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = (admin) => {
    setLoggedIn(true);
    setIsAdmin(admin);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setIsAdmin(false);
  };

  return (
    <div>
      <BrowserRouter>
        {/* <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            {!loggedIn ? (
              <li><a href="/login">Login</a></li>
            ) : (
              <>
                <li><a href="/dashboard">Dashboard</a></li>
                {isAdmin && <li><a href="/admin">Admin Dashboard</a></li>}
                <li><button onClick={handleLogout}>Logout</button></li>
              </>
            )}
          </ul>
        </nav> */}
        <Navbar/>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
          <ProtectedAdminRoute>
              <AdminDashboard />
              </ProtectedAdminRoute>
         
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
