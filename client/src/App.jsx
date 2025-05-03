import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Features from './pages/Features';
import About from './pages/About';
import ExportReport from './pages/ExportReport';
import AuthFlip from './pages/AuthFlip';
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <GoogleOAuthProvider clientId="703046728633-p138slvut5hsbuq9l05vsfoga1l9kt7a.apps.googleusercontent.com">
      <Router>
        <Navbar isLoggedIn={isLoggedIn} />
        <div>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<AuthFlip />} />
            <Route path="/about" element={<About />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/features"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Features />
                </ProtectedRoute>
              }
            />
            <Route
              path="/export-report"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <ExportReport />
                </ProtectedRoute>
              }
            />

            {/* Redirect old login/signup URLs to /auth */}
            <Route path="/login" element={<Navigate to="/auth" replace />} />
            <Route path="/signup" element={<Navigate to="/auth" replace />} />
          </Routes>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
