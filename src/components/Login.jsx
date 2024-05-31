import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';
import { auth, provider, db } from "../utils/Firebase";
import { doc, getDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { useSetRecoilState } from 'recoil';
import { isLoggedInState,adminsUidsState } from '../utils/atoms'; 

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const setIsLoggedIn = useSetRecoilState(isLoggedInState); 
  const setIsAdmin = useSetRecoilState(adminsUidsState);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userEmail = user.email;
        const adminDocRef = doc(db, "admin", userEmail);
        const DocSnap = await getDoc(adminDocRef);
        if (DocSnap.exists()) {
          onLogin(true);
          setIsLoggedIn(true);
          setIsAdmin(true); 
          navigate('/admin');
        } else {
          const userDocRef = doc(db, "alumnidetails1", userEmail);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            onLogin(true);
            setIsLoggedIn(true); 
            navigate('/dashboard');
          } else {
            setError('User not registered.');
            onLogin(false);
            setIsLoggedIn(false); 
          }
        }
      } else {
        setIsLoggedIn(false); 
      }
    });

    return () => unsubscribe();
  }, [navigate, onLogin, setIsLoggedIn]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      const userDocRef = doc(db, "alumnidetails1", email);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        await signInWithEmailAndPassword(auth, email, password)
          .then(() => {
            onLogin(true);
            setIsLoggedIn(true); 
            navigate('/dashboard');
          })
          .catch((error) => {
            if (error.code === 'auth/invalid-credential') {
              createUserWithEmailAndPassword(auth, email, password)
                .then(() => {
                  onLogin(true);
                  setIsLoggedIn(true); 
                  navigate('/dashboard');
                })
                .catch((signUpError) => {
                  setError(signUpError.message);
                  onLogin(false);
                  setIsLoggedIn(false); 
                });
            } else {
              setError(error.message);
              onLogin(false);
              setIsLoggedIn(false); 
            }
          });
      } else {
        setError('User not registered.');
        onLogin(false);
        setIsLoggedIn(false); 
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
      onLogin(false);
      setIsLoggedIn(false); 
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const adminDocRef = doc(db, "admin", user.email);
      const DocSnap = await getDoc(adminDocRef);
      if (DocSnap.exists()) {
        onLogin(true);
        setIsLoggedIn(true); 
        navigate('/admin');
      } else {
        const userDocRef = doc(db, "alumnidetails1", user.email);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          onLogin(true);
          setIsLoggedIn(true); 
          navigate('/dashboard');
        } else {
          await auth.signOut();
          setError('User not registered.');
          onLogin(false);
          setIsLoggedIn(false); 
        }
      }
    } catch (error) {
      setError(error.message);
      onLogin(false);
      setIsLoggedIn(false); 
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-96 items-center">
        <h2 className="text-2xl font-bold mb-4 text-white">Login</h2>
        {error && (
          <div className="bg-red-500 text-white p-2 mb-4 rounded ">{error}</div>
        )}
        <form onSubmit={handleSubmit} className='items-center'>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-400 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-400 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-gray-700 text-white"
              required
            />
          </div>
          <div className="flex justify-center">
                <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                >
                Log In
                </button>
          </div>
        </form>
        <div className="mt-4 flex items-center justify-center">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
          >
            <FontAwesomeIcon icon={faGoogle} className="mr-2" />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;



