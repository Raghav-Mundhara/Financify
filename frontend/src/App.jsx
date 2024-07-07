import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landingPage'; 
import SignUpNgo from './pages/SignUpNgo'; 
import SignInNgo from './pages/SignInNgo'; 
import SignUpStudent from './pages/SignUpStudent'; 
import SignInStudent from './pages/SignInStudent'; 

import NGORequests from './pages/NGORequests';
import Profile from './pages/ProfilePage';
import Expense from './pages/Expense';
import NGODashboard from './pages/NGODashboard';
import Rewards from './pages/Rewards';
import NgoStudent from './pages/NgoStudent';
import StudentTodos from './pages/StudentTodos';
 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup-ngo" element={<SignUpNgo />} />
        <Route path="/signin-ngo" element={<SignInNgo />} />
        <Route path="/signup-student" element={<SignUpStudent />} />
        <Route path="/signin-student" element={<SignInStudent />} />     
        <Route path="/requests" element={<NGORequests />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/expenses" element={<Expense />} />
        <Route path='/ngoDashboard' element={<NGODashboard />} />
        <Route path='/rewards' element={<Rewards />} />
        <Route path="/student/:id" element={<NgoStudent/>} />
        <Route path="/student-todos/:id" element={<StudentTodos/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
