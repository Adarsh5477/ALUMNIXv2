import React from 'react';
import image from "../assets/dummy_profile.png"
const AlumniCard = ({ alumni, handleAlumniClick }) => {
  return (
    <div
      className="bg-gray-800 p-4 rounded-md cursor-pointer hover:bg-gray-700"
      onClick={() => handleAlumniClick(alumni)}
    >
      <div className="flex items-center">
        <img
          src={alumni.imageUrl?alumni.imageUrl:image}
          alt={alumni.name}
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <h3 className="text-lg font-bold">{alumni.name}</h3>
          <p>Graduation Year: {alumni.graduationYear}</p>
          <p>Department: {alumni.department}</p>
        </div>
      </div>
    </div>
  );
};

export default AlumniCard;