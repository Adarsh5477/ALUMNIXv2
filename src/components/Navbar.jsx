import { Link } from 'react-router-dom';
import image from '../assets/EDUCATION.png';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { auth } from '../utils/Firebase';
import { signOut } from 'firebase/auth';
import { useRecoilState } from 'recoil';
import { isLoggedInState, adminsUidsState } from '../utils/atoms';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const [isAdmin, setIsAdmin] = useRecoilState(adminsUidsState);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
      setIsAdmin(isAdmin); // Update isAdmin state based on user's UID
    });
    return unsubscribe;
  }, [setIsLoggedIn, setIsAdmin]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false);
      setIsAdmin(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800">
      <div className="text-2xl font-bold" style={{ height: '50px', width: '180px' }}>
        <Link to="/">
          <img src={image} alt="Logo" />
        </Link>
      </div>
      <div className="hidden md:flex space-x-4">
        <Link to="/" className="hover:text-gray-400 text-white text-lg" id="navItem">
          Home
        </Link>
        <Link to="/about" className="hover:text-gray-400 text-white text-lg" id="navItem">
          About
        </Link>
        <Link to="/dashboard" className="hover:text-gray-400 text-white text-lg" id="navItem">
          Dashborad
        </Link>
        {isAdmin && (
          <Link to="/admin" className="hover:text-gray-400 text-white text-lg" id="navItem">
            Admin
          </Link>
        )}
        {isLoggedIn ? (
          <button onClick={handleSignOut} className="hover:text-gray-400 text-white text-lg" id="navItem">
            Logout
          </button>
        ) : (
          <Link to="/login" className="hover:text-gray-400 text-white text-lg" id="navItem">
            Login
          </Link>
        )}
      </div>
      <div className="md:hidden">
        <button onClick={handleToggle} className="text-white focus:outline-none">
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden bg-gray-800 p-4">
          <Link to="/" className="block hover:text-gray-400 text-white text-lg mb-2" id="navItem">
            Home
          </Link>
          <Link to="/about" className="block hover:text-gray-400 text-white text-lg mb-2" id="navItem">
            About
          </Link>
          {isLoggedIn ? (
            <button onClick={handleSignOut} className="block hover:text-gray-400 text-white text-lg" id="navItem">
              logout
            </button>
          ) : (
            <Link to="/login" className="block hover:text-gray-400 text-white text-lg" id="navItem">
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;




















// import { Link } from 'react-router-dom';
// import image from '../assets/EDUCATION.png';
// import { FaBars, FaTimes } from 'react-icons/fa';
// import { useState, useEffect } from 'react';
// import { auth } from '../utils/Firebase';
// import { signOut } from 'firebase/auth';
// import { useRecoilState } from 'recoil';
// import { isLoggedInState,adminsUidsState } from '../utils/atoms'; // Import the isLoggedIn state atom

// function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState); // Destructure the setter function from the Recoil state
//   const setIsAdmin=useRecoilState(adminsUidsState); 
//   const handleToggle = () => {
//     setIsOpen(!isOpen);
//   };

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       setIsLoggedIn(!!user); // Update the Recoil state based on the user's authentication status
//     });

//     return unsubscribe;
//   }, [setIsLoggedIn]);

//   const handleSignOut = async () => {
//     try {
//       await signOut(auth);
//       setIsLoggedIn(false);
//       setIsAdmin(false) 
//       // Set the Recoil state to false on logout
//     } catch (error) {
//       console.error('Error signing out:', error);
//     }
//   };

//   return (
//     <nav className="flex items-center justify-between p-4 bg-gray-800">
//       <div className="text-2xl font-bold" style={{ height: '50px', width: '180px' }}>
//         <Link to="/">
//           <img src={image} alt="Logo" />
//         </Link>
//       </div>
//       <div className="hidden md:flex space-x-4">
//         <Link to="/" className="hover:text-gray-400 text-white text-lg" id="navItem">
//           Home
//         </Link>
//         <Link to="/about" className="hover:text-gray-400 text-white text-lg" id="navItem">
//           About
//         </Link>
//         <Link to="/dashboard" className="hover:text-gray-400 text-white text-lg" id="navItem">
//           Dashborad
//         </Link>
//         {isLoggedIn ? (
//           <button
//             onClick={handleSignOut}
//             className="hover:text-gray-400 text-white text-lg"
//             id="navItem"
//           >
//             Logout
//           </button>
//         ) : (
//           <Link to="/login" className="hover:text-gray-400 text-white text-lg" id="navItem">
//             Login
//           </Link>
//         )}
//       </div>
//       <div className="md:hidden">
//         <button onClick={handleToggle} className="text-white focus:outline-none">
//           {isOpen ? <FaTimes /> : <FaBars />}
//         </button>
//       </div>
//       {isOpen && (
//         <div className="md:hidden bg-gray-800 p-4">
//           <Link to="/" className="block hover:text-gray-400 text-white text-lg mb-2" id="navItem">
//             Home
//           </Link>
//           <Link to="/about" className="block hover:text-gray-400 text-white text-lg mb-2" id="navItem">
//             About
//           </Link>
//           {isLoggedIn ? (
//             <button
//               onClick={handleSignOut}
//               className="block hover:text-gray-400 text-white text-lg"
//               id="navItem"
//             >
//               logout
//             </button>
//           ) : (
//             <Link to="/login" className="block hover:text-gray-400 text-white text-lg" id="navItem">
//               Login
//             </Link>
//           )}
//         </div>
//       )}
//     </nav>
//   );
// }

// export default Navbar;



















// import { Link } from 'react-router-dom';
// import image from '../assets/EDUCATION.png';
// import { FaBars, FaTimes } from 'react-icons/fa';
// import { useState } from 'react';

// function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);

//   const handleToggle = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <nav className="flex items-center justify-between p-4 bg-gray-800">
//       <div className="text-2xl font-bold" style={{ height: '50px', width: '180px' }}>
//         <Link to="/">
//           <img src={image} alt="Logo" />
//         </Link>
//       </div>
//       <div className="hidden md:flex space-x-4">
//         <Link to="/" className="hover:text-gray-400 text-white text-lg" id="navItem">
//           Home
//         </Link>
//         <Link to="/about" className="hover:text-gray-400 text-white text-lg" id="navItem">
//           About
//         </Link>
//         <Link to="/login" className="hover:text-gray-400 text-white text-lg" id="navItem">
//           Login
//         </Link>
//       </div>
//       <div className="md:hidden">
//         <button onClick={handleToggle} className="text-white focus:outline-none">
//           {isOpen ? <FaTimes /> : <FaBars />}
//         </button>
//       </div>
//       {isOpen && (
//         <div className="md:hidden bg-gray-800 p-4">
//           <Link to="/" className="block hover:text-gray-400 text-white text-lg mb-2" id="navItem">
//             Home
//           </Link>
//           <Link to="/about" className="block hover:text-gray-400 text-white text-lg mb-2" id="navItem">
//             About
//           </Link>
//           <Link to="/login" className="block hover:text-gray-400 text-white text-lg" id="navItem">
//             Login
//           </Link>
//         </div>
//       )}
//     </nav>
//   );
// }

// export default Navbar;


















// import React, { useState } from 'react';
// import image from '../assets/EDUCATION.png';
// import { Link } from 'react-router-dom';
// import { FaBars, FaTimes } from 'react-icons/fa';

// function Navbar () {
//    // return (
// //         <>
// //         <nav className="flex items-center justify-between p-4 bg-gray-800">
// //         <div className="text-2xl font-bold" style={{height: '50px', width: '180px'}}><Link to={"/"}><img src={image}></img></Link></div>
// //         <div className="flex space-x-8">
// //           <Link to="/" className="hover:text-gray-400 text-lg" id="navItem">

// // function Navbar() {
// //   const [isOpen, setIsOpen] = useState(false);

// //   const handleToggle = () => {
// //     setIsOpen(!isOpen);
// //   };

//   return (
//     <>
//       <nav className="flex items-center justify-between p-4 bg-gray-800">
//         <div className="text-2xl font-bold" style={{ height: '50px', width: '180px' }}>
//           <Link to="/">
//             <img src={image} alt="Logo" />
//           </Link>
//         </div>
//         <div className="hidden md:flex space-x-4">
//           <Link to="/" className="hover:text-gray-400 text-white text-lg" id="navItem">
//             Home
//           </Link>
//           <Link to="/about" className="hover:text-gray-400 text-lg" id="navItem">
//             About
//           </Link>
//           <Link to="/login" className="hover:text-gray-400 text-lg" id="navItem">
//             Login
//           </Link>
//         </div>
//         <div className="md:hidden">
//           <button onClick={handleToggle} className="text-white focus:outline-none">
//             {isOpen ? <FaTimes /> : <FaBars />}
//           </button>
//         </div>
//       </nav>
//       {isOpen && (
//         <div className="md:hidden bg-gray-800 p-4">
//           <Link to="/" className="block hover:text-gray-400 text-white text-lg mb-2" id="navItem">
//             Home
//           </Link>
//           <Link to="/about" className="block hover:text-gray-400 text-white text-lg mb-2" id="navItem">
//             About
//           </Link>
//           <Link to="/login" className="block hover:text-gray-400 text-white text-lg" id="navItem">
//             Login
//           </Link>
//         </div>
//       )}
//     </>
//   );
// }

// export default Navbar;
















// import React from 'react'
// import image from '../assets/EDUCATION.png'
// import { Link } from 'react-router-dom';

// function Navbar () {
//     return (
//         <>
//         <nav className="flex items-center justify-between p-4 bg-gray-800">
//         <div className="text-2xl font-bold" style={{height: '50px', width: '180px'}}><Link to={"/"}><img src={image}></img></Link></div>
//         <div className="flex space-x-4">
//           <Link to="/" className="hover:text-gray-400 text-white text-lg" id="navItem">
//             Home
//           </Link>
//           <Link to="/about" className="hover:text-gray-400 text-white text-lg" id="navItem">
//             About
//           </Link>
//           <Link to="/login" className="hover:text-gray-400 text-white text-lg" id="navItem">
//             Login
//           </Link>
//         </div>
//       </nav>
//       </>
//     );
// }

// export default Navbar;