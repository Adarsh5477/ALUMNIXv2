// AlumniDetailsModal.jsx
import React from 'react';
import img from '../assets/dummy_profile.png';

const AlumniDetailsModal = ({ selectedAlumni, closeModal }) => {
    console.log(selectedAlumni, closeModal);
  return (
    <div onClick={closeModal}>
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">{selectedAlumni.name}</h3>
         
          <button className="text-gray-400 hover:text-white" >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
        </div>
        <div className="flex items-center mb-4">
          <img src={selectedAlumni.imageUrl||img} alt={selectedAlumni.name} className="w-16 h-16 rounded-full mr-4" />
          <div>
            <p className="text-white">Graduation Year: {selectedAlumni.graduationYear}</p>
            <p className="text-white">Department: {selectedAlumni.department}</p>
          </div>
        </div>
        <p className="text-white">Specialization: {selectedAlumni.specialization}</p>
        <p className="text-white">Activities: {selectedAlumni.activities.join(', ')}</p>
        {selectedAlumni.achievement && (
          <p className="text-white">Achievement: {selectedAlumni.achievement}</p>
        )}
        <p className="text-white">Email: {selectedAlumni.email}</p>
        <p className="text-white">Phone: {selectedAlumni.phone}</p>
        <p className="text-white">
          Date of Birth: {new Date(selectedAlumni.dob).toLocaleDateString()}
        </p>
      </div>
      <div className="fixed inset-0 bg-black opacity-50"></div>
    </div>
    </div>
  );
};

export default AlumniDetailsModal;