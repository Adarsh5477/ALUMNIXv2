import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { adminsUidsState } from '../utils/atoms';

const ProtectedAdminRoute = ({ children }) => {
  const navigate = useNavigate();
  const isAdmin = useRecoilValue(adminsUidsState); // Get the value of the adminsUidsState

  useEffect(() => {
    if (!isAdmin) {
      // If the user is not an admin, navigate to the home route
      navigate('/');
    }
  }, [isAdmin, navigate]);

  // If the user is an admin, render the protected children components
  return isAdmin ? children : null;
};

export default ProtectedAdminRoute;