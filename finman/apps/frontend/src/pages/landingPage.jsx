import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();
  const [isNgo, setIsNgo] = useState(true);

  const handleToggle = () => {
    setIsNgo(!isNgo);
  };

  const handleSignIn = () => {
    if (isNgo) {
      navigate('/signin-ngo');
    } else {
      navigate('/signin-student');
    }
  };

  const handleSignUp = () => {
    if (isNgo) {
      navigate('/signup-ngo');
    } else {
      navigate('/signup-student');
    }
  };

  return (
    <div className="bg-navy bg-cover bg-center h-screen flex justify-center items-center" style={{ backgroundImage: 'url("path-to-your-background-image.jpg")' }}>
      <div className="bg-white bg-opacity-90 p-12 rounded-lg text-center shadow-lg max-w-md mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-navy">Financify</h1>
        <div className="mb-6">
          <button onClick={handleSignIn} className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300">Sign In as {isNgo ? 'NGO' : 'Student'}</button>
          <button onClick={handleSignUp} className="bg-green-600 text-white py-2 px-4 rounded-full ml-4 hover:bg-green-700 transition duration-300">Sign Up as {isNgo ? 'NGO' : 'Student'}</button>
        </div>
        <div>
          <button onClick={handleToggle} className="bg-gray-600 text-white py-2 px-4 rounded-full hover:bg-gray-700 transition duration-300">
            {isNgo ? 'Student' : 'NGO'} Mode
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
