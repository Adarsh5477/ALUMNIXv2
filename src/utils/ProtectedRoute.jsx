import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isLoggedInState } from '../utils/atoms'; // Import the isLoggedIn state atom

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const isLoggedIn = useRecoilValue(isLoggedInState); // Get the value of the isLoggedIn state

  useEffect(() => {
    if (!isLoggedIn) {
      // If the user is not logged in, navigate to the login route
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  // If the user is logged in, render the protected children components
  return isLoggedIn ? children : null;
};

export default ProtectedRoute;








// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { auth } from '../utils/Firebase';

// const ProtectedRoute = ({ children }) => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Check if the auth object exists
//     if (!auth) {
//       // If auth object doesn't exist, navigate to the login route
//       navigate('/login');
//     }
//   }, [navigate]);

//   // If auth object exists, render the protected children components
//   return auth ? children : null;
// };

// export default ProtectedRoute;
