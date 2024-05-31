import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';
import { auth, provider, db } from "../utils/Firebase";
import { doc, getDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { useSetRecoilState } from 'recoil';
import { isLoggedInState,adminsUidsState } from '../utils/atoms'; // Import the isLoggedIn state atom

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const setIsLoggedIn = useSetRecoilState(isLoggedInState); // Get the setter function for the isLoggedIn state
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
          setIsAdmin(true); // Set the isLoggedIn state to true
           // Set the isLoggedIn state to true
          navigate('/admin');
        } else {
          const userDocRef = doc(db, "alumnidetails1", userEmail);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            onLogin(true);
            setIsLoggedIn(true); // Set the isLoggedIn state to true
            navigate('/dashboard');
          } else {
            setError('User not registered.');
            onLogin(false);
            setIsLoggedIn(false); // Set the isLoggedIn state to false
          }
        }
      } else {
        setIsLoggedIn(false); // Set the isLoggedIn state to false
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
            setIsLoggedIn(true); // Set the isLoggedIn state to true
            navigate('/dashboard');
          })
          .catch((error) => {
            if (error.code === 'auth/invalid-credential') {
              createUserWithEmailAndPassword(auth, email, password)
                .then(() => {
                  onLogin(true);
                  setIsLoggedIn(true); // Set the isLoggedIn state to true
                  navigate('/dashboard');
                })
                .catch((signUpError) => {
                  setError(signUpError.message);
                  onLogin(false);
                  setIsLoggedIn(false); // Set the isLoggedIn state to false
                });
            } else {
              setError(error.message);
              onLogin(false);
              setIsLoggedIn(false); // Set the isLoggedIn state to false
            }
          });
      } else {
        setError('User not registered.');
        onLogin(false);
        setIsLoggedIn(false); // Set the isLoggedIn state to false
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
      onLogin(false);
      setIsLoggedIn(false); // Set the isLoggedIn state to false
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
        setIsLoggedIn(true); // Set the isLoggedIn state to true
        navigate('/admin');
      } else {
        const userDocRef = doc(db, "alumnidetails1", user.email);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          // User exists, proceed to dashboard
          onLogin(true);
          setIsLoggedIn(true); // Set the isLoggedIn state to true
          navigate('/dashboard');
        } else {
          // User not registered, logout and display error message
          await auth.signOut();
          setError('User not registered.');
          onLogin(false);
          setIsLoggedIn(false); // Set the isLoggedIn state to false
        }
      }
    } catch (error) {
      setError(error.message);
      onLogin(false);
      setIsLoggedIn(false); // Set the isLoggedIn state to false
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














// import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faGoogle } from '@fortawesome/free-brands-svg-icons';
// import { useNavigate } from 'react-router-dom';
// import { auth, provider, db } from "../utils/Firebase";
// import { signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
// import { doc, getDoc, setDoc } from "firebase/firestore";

// const Login = ({ onLogin }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [isRegistering, setIsRegistering] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate form fields
//     if (!email || !password) {
//       setError('Please enter both email and password.');
//       return;
//     }

//     try {
//       if (isRegistering) {
//         // Register new user
//         await createUserWithEmailAndPassword(auth, email, password)
//           .then(async (userCredential) => {
//             const user = userCredential.user;
//             // Create a new document for the user in the "users" collection
//             await setDoc(doc(db, "users", user.email), {
//               email: user.email,
//               // Add any additional user data you want to store
//             });
//             onLogin(true);
//             navigate('/dashboard');
//           })
//           .catch((error) => {
//             setError(error.message);
//             onLogin(false);
//           });
//       } else {
//         // Login existing user
//         const userDocRef = doc(db, "users", email);
//         const userDocSnap = await getDoc(userDocRef);
//         if (userDocSnap.exists()) {
//           await signInWithEmailAndPassword(auth, email, password)
//             .then(() => {
//               onLogin(true);
//               navigate('/dashboard');
//             })
//             .catch((error) => {
//               setError(error.message);
//               onLogin(false);
//             });
//         } else {
//           setError('User not registered.');
//           onLogin(false);
//         }
//       }
//     } catch (error) {
//       setError(error.message);
//       onLogin(false);
//     }
//   };

//   const handleGoogleLogin = async () => {
//     try {
//       // Sign in with Google
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;
//       // Check if the user exists in the "users" collection
//       const userDocRef = doc(db, "users", user.email);
//       const userDocSnap = await getDoc(userDocRef);
//       if (userDocSnap.exists()) {
//         // User exists, proceed to dashboard
//         onLogin(true);
//         navigate('/dashboard');
//       } else {
//         // User not registered, create a new document for the user in the "users" collection
//         await setDoc(doc(db, "users", user.email), {
//           email: user.email,
//           // Add any additional user data you want to store
//         });
//         onLogin(true);
//         navigate('/dashboard');
//       }
//     } catch (error) {
//       setError(error.message);
//       onLogin(false);
//     }
//   };

//   const toggleRegistration = () => {
//     setIsRegistering(!isRegistering);
//     setError('');
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-900">
//       <div className="bg-gray-800 p-8 rounded-lg shadow-md">
//         <h2 className="text-2xl font-bold mb-4 text-white">
//           {isRegistering ? 'Register' : 'Login'}
//         </h2>
//         {error && <div className="bg-red-500 text-white p-2 mb-4 rounded">{error}</div>}
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label htmlFor="email" className="block text-gray-400 mb-2">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-3 py-2 rounded-md bg-gray-700 text-white"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="password" className="block text-gray-400 mb-2">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-3 py-2 rounded-md bg-gray-700 text-white"
//               required
//             />
//           </div>
//           <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
//             {isRegistering ? 'Register' : 'Sign In'}
//           </button>
//         </form>
//         <div className="mt-4 flex items-center justify-center">
//           <button onClick={handleGoogleLogin} className="flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
//             <FontAwesomeIcon icon={faGoogle} className="mr-2" />
//             Sign in with Google
//           </button>
//         </div>
//         <p className="mt-4 text-gray-400">
//           {isRegistering ? 'Already have an account?' : 'Don\'t have an account?'}
//           <button onClick={toggleRegistration} className="text-indigo-600 hover:text-indigo-700 ml-2">
//             {isRegistering ? 'Login' : 'Register'}
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;













