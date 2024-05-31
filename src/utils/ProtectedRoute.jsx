import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isLoggedInState } from '../utils/atoms'; 
const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const isLoggedIn = useRecoilValue(isLoggedInState); 

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  return isLoggedIn ? children : null;
};

export default ProtectedRoute;




