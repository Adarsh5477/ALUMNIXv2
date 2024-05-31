import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db } from "../utils/Firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const AdminDashboard = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [activities, setActivities] = useState([]);
  const [achievement, setAchievement] = useState([]);
  const [phoneNo, setPhoneNo] = useState("");
  const [collegeID, setCollegeID] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [isStarAlumni, setIsStarAlumni] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const storage = getStorage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const missingFields = [];

    if (!name) missingFields.push("Name");
    if (!email) missingFields.push("Email");
    if (!department) missingFields.push("Department");
    if (!specialization) missingFields.push("Specialization");
    if (!phoneNo) missingFields.push("Phone No");
    if (!collegeID) missingFields.push("College ID");
    if (!dateOfBirth) missingFields.push("Date of Birth");
    if (!graduationYear) missingFields.push("Graduation Year");

    if (missingFields.length > 0) {
      const missingFieldsString = missingFields.join(", ");
      toast.info(
        `Please fill ${missingFieldsString} field(s) before submitting`,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }
      );
    } else {
      try {
        let imageUrl = "";
        if (profileImage) {
          const imageRef = ref(storage, `profileImages/${collegeID}`);
          const uploadTask = uploadBytesResumable(imageRef, profileImage);

          // Wait for upload to complete and get the download URL
          await uploadTask;
          imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
        }

        const alumniData = {
          achievement,
          activities,
          department,
          dob: dateOfBirth,
          email,
          graduationYear,
          id: collegeID,
          imageUrl,
          name,
          phone: phoneNo,
          specialization,
          starAlumni: isStarAlumni,
        };

        const userCreationData = {
          name,
        }

        await setDoc(doc(collection(db, "alumnidetails1"), email), alumniData);
        await setDoc(doc(collection(db, "users1"), email), userCreationData);
        toast.success("Alumni details submitted successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } catch (error) {
        console.error("Error submitting alumni details:", error);
        toast.error("Error submitting alumni details. Please try again.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  };

  const graduationYears = [];
  const currentYear = new Date().getFullYear();
  for (let year = 1980; year <= currentYear; year++) {
    graduationYears.push(year);
  }

  return (
    <>
      <div className="bg-gray-900 text-white p-8">
        <h2 className="text-2xl font-bold mb-6">Add Alumni Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-800 text-white rounded-lg p-2"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-800 text-white rounded-lg p-2"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="department" className="block mb-2">
              Department
            </label>
            <input
              type="text"
              id="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full bg-gray-800 text-white rounded-lg p-2"
              placeholder="Enter your department"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="specialization" className="block mb-2">
              Specialization
            </label>
            <input
              type="text"
              id="specialization"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              className="w-full bg-gray-800 text-white rounded-lg p-2"
              placeholder="Enter your specialization"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="activities" className="block mb-2">
              Activities
            </label>
            <input
              type="text"
              id="activities"
              value={activities.join(", ")}
              onChange={(e) =>
                setActivities(
                  e.target.value.split(",").map((item) => item.trim())
                )
              }
              className="w-full bg-gray-800 text-white rounded-lg p-2"
              placeholder="Add comma-separated activities"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="achievement" className="block mb-2">
              Achievement
            </label>
            <input
              type="text"
              id="achievement"
              value={achievement.join(", ")}
              onChange={(e) =>
                setAchievement(
                  e.target.value.split(",").map((item) => item.trim())
                )
              }
              className="w-full bg-gray-800 text-white rounded-lg p-2"
              placeholder="Add comma-separated achievements"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNo" className="block mb-2">
              Phone No
            </label>
            <input
              type="tel"
              id="phoneNo"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              className="w-full bg-gray-800 text-white rounded-lg p-2"
              placeholder="Enter your phone number"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="collegeID" className="block mb-2">
              College ID
            </label>
            <input
              type="text"
              id="collegeID"
              value={collegeID}
              onChange={(e) => setCollegeID(e.target.value)}
              className="w-full bg-gray-800 text-white rounded-lg p-2"
              placeholder="Enter your college ID"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="dateOfBirth" className="block mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className="w-full bg-gray-800 text-white rounded-lg p-2"
              placeholder="Enter your date of birth"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="graduationYear" className="block mb-2">
              Graduation Year
            </label>
            <select
              id="graduationYear"
              value={graduationYear}
              onChange={(e) => setGraduationYear(e.target.value)}
              className="w-full bg-gray-800 text-white rounded-lg p-2"
            >
              <option value="">Select Graduation Year</option>
              {graduationYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="profileImage" className="block mb-2">
              Profile Image
            </label>
            <div className="flex items-center bg-gray-800 rounded-lg p-2">
              <input
                type="file"
                id="profileImage"
                onChange={handleImageUpload}
                className="hidden"
              />
              <label
                htmlFor="profileImage"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
              >
                <FontAwesomeIcon icon={faUpload} className="mr-2" />
                Upload
              </label>
              <span className="ml-2">
                {profileImage ? profileImage.name : "No file chosen"}
              </span>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="isStarAlumni" className="flex items-center">
              <input
                type="checkbox"
                id="isStarAlumni"
                checked={isStarAlumni}
                onChange={(e) => setIsStarAlumni(e.target.checked)}
                className="mr-2"
              />
              Star Alumni?
            </label>
          </div>
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};
export default AdminDashboard;
