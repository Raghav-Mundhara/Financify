import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landingPage'; 
import SignUpNgo from './pages/SignUpNgo'; 
import SignInNgo from './pages/SignInNgo'; 
import SignUpStudent from './pages/SignUpStudent'; 
import SignInStudent from './pages/SignInStudent'; 
import NGODashboard from './pages/NGODashboard';
import NGORequests from './pages/NGORequests';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup-ngo" element={<SignUpNgo />} />
        <Route path="/signin-ngo" element={<SignInNgo />} />
        <Route path="/signup-student" element={<SignUpStudent />} />
        <Route path="/signin-student" element={<SignInStudent />} />
        <Route path="/dashboard" element={<NGODashboard />} />
        <Route path="/requests" element={<NGORequests />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
