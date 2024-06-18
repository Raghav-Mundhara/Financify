import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landingPage'; 
import SignUpNgo from './pages/SignUpNgo'; 
import SignInNgo from './pages/SignInNgo'; 
import SignUpStudent from './pages/SignUpStudent'; 
import SignInStudent from './pages/SignInStudent'; 
import NGODashboard from './pages/NGODashboard';
import NGORequests from './pages/NGORequests';
import LandingPage from './pages/landingPage'; // Ensure this path is correct
import SignUpNgo from './pages/SignUpNgo'; // Ensure this path is correct
import SignInNgo from './pages/SignInNgo'; // Ensure this path is correct
import SignUpStudent from './pages/SignUpStudent'; // Ensure this path is correct
import SignInStudent from './pages/SignInStudent'; // Ensure this path is correct
import NGODashboard from './pages/ngoDashboard';
import Profile from './pages/ProfilePage';
// import SendMoney from './pages/SendMoney';

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
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/send" element={<SendMoney />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
