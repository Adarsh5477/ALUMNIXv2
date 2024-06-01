import React, { useState, useEffect,useMemo } from 'react';
import AlumniCard from './AlumniCard';
import AlumniDetailsModal from './AlumniDetailsModal';
import { db } from '../utils/Firebase';
import { collection, getDocs, query, where, startAfter, limit,getDoc,doc } from 'firebase/firestore';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [emailSearchTerm, setEmailSearchTerm] = useState('');
  const [viewOption, setViewOption] = useState('starAlumni');
  const [searchResults, setSearchResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAlumni, setSelectedAlumni] = useState(null);
  const [starAlumni, setStarAlumni] = useState([]);
  const [years, setYears] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const alumniRef = collection(db, 'alumnidetails1');
  const starAlumniRef = collection(db, 'staralumni');

  const handleSearch = async () => {
    setIsLoading(true);
  
    try {
      if (emailSearchTerm) {
        const searchEmailRef = doc(db, "alumnidetails1", emailSearchTerm);
        const emailDocSnap = await getDoc(searchEmailRef);
        if (emailDocSnap.exists()) {
          const alumniData = [{ id: emailDocSnap.id, ...emailDocSnap.data() }];
          setSearchResults([alumniData[0]]);
         setEmailSearchTerm("")
        } else {
          setSearchResults([]);
        }
      } else {
        const alumniQuery = query(
          alumniRef,
          where('name', '>=', searchTerm),
          where('name', '<=', searchTerm + '\uf8ff')
        );
        const snapshot = await getDocs(alumniQuery);
  
        const alumniData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
  
        setSearchResults(alumniData);
      }
  
      fixDateAndDepartment();
    } catch (error) {
      console.error('Error fetching alumni data:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleAlumniClick = (alumni) => {
    setSelectedAlumni(alumni);
    setShowModal(true);
  };
  
  const closeModal = () => {
    setShowModal(false);
    setSelectedAlumni(null);
  };
  
  const handleViewOption = (option) => {
    setViewOption(option);
    if (option === 'starAlumni') {
      setSearchResults([]);
    } else if (option === 'all') {
      fetchAlumniData();
    } else if (option === 'year') {
      fetchAlumniDataByYear(searchTerm);
    } else if (option === 'department') {
      fetchAlumniDataByDepartment(searchTerm);
    }
  };
  
  const fixDateAndDepartment = () => {
    const years = [...new Set(searchResults.map(alumni => alumni.graduationYear))];
    const departments = [...new Set(searchResults.map(alumni => alumni.department))];
    setYears(years);
    setDepartments(departments);
  };
  
  //  const filteredResults =
  // viewOption === 'all'
  //   ? searchResults
  //   : viewOption === 'department' || viewOption === 'year'
  //   ? searchResults.filter(
  //       (alumni) =>
  //         (viewOption === 'department' && alumni.department === searchTerm) ||
  //         (viewOption === 'year' && alumni.graduationYear === searchTerm)
  //     )
  //   : emailSearchTerm || searchTerm
  //   ? searchResults
  //   : [];

  const filteredResults = useMemo(() => {
    const filtered = viewOption === 'all'
      ? searchResults
      : viewOption === 'department' || viewOption === 'year'
      ? searchResults.filter(
          (alumni) =>
            (viewOption === 'department' && alumni.department === searchTerm) ||
            (viewOption === 'year' && alumni.graduationYear === searchTerm)
        )
      : emailSearchTerm || searchTerm
      ? searchResults
      : [];
  
    return filtered;
  }, [viewOption, searchResults, searchTerm, emailSearchTerm]);


  const fetchStarAlumni = useEffect(() => {
    const fetchStarAlumniData = async () => {
      try {
        const snapshot = await getDocs(starAlumniRef);
        const starAlumniData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setStarAlumni(starAlumniData);
      } catch (error) {
        console.error('Error fetching star alumni data:', error);
      }
    };
  
    fetchStarAlumniData();
  }, []);
  const fetchAlumniData = async (loadMore = false) => {
    setIsLoading(true);
  
    try {
      let alumniQuery = query(alumniRef, limit(10));
  
      if (loadMore && lastVisible) {
        alumniQuery = query(alumniRef, startAfter(lastVisible), limit(10));
      }
  
      const snapshot = await getDocs(alumniQuery);
      const lastVisibleDoc = snapshot.docs[snapshot.docs.length - 1];
  
      const alumniData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      setSearchResults((prevResults) => [...prevResults, ...alumniData]);
      setLastVisible(lastVisibleDoc);
      fixDateAndDepartment();
    } catch (error) {
      console.error('Error fetching alumni data:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const fetchAlumniDataByDepartment = async (department) => {
    setIsLoading(true);
  
    try {
      const alumniQuery = query(alumniRef, where('department', '==', department));
      const snapshot = await getDocs(alumniQuery);
  
      const alumniData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      setSearchResults(alumniData);
      fixDateAndDepartment();
    } catch (error) {
      console.error('Error fetching alumni data by department:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const fetchAlumniDataByYear = async (year) => {
    setIsLoading(true);
  
    try {
      const alumniQuery = query(alumniRef, where('graduationYear', '==', year));
      const snapshot = await getDocs(alumniQuery);
  
      const alumniData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      setSearchResults(alumniData);
      fixDateAndDepartment();
    } catch (error) {
      console.error('Error fetching alumni data by year:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const LoadingAnimation = () => (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
    </div>
  );
  
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {isLoading && <LoadingAnimation />}
      <div className="container mx-auto py-8 px-4 sm:px-0">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <div className="flex items-center mb-4 sm:mb-0">
            <input
              type="text"
              placeholder="Search alumni..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 rounded-md bg-gray-700 text-white w-full sm:w-auto"
            />
  
            <input
              type="text"
              placeholder="Search by email..."
              value={emailSearchTerm}
              onChange={(e) => setEmailSearchTerm(e.target.value)}
              className="px-3 py-2 rounded-md bg-gray-700 text-white ml-2 w-full sm:w-auto"
            />
  
            <button
              className="px-3 py-2 rounded-md bg-indigo-600 text-white ml-2"
              onClick={handleSearch}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
          <div>
            <button
              className={`px-3 py-2 rounded-md ${
                viewOption === 'starAlumni'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-white'
              }`}
              onClick={() => handleViewOption('starAlumni')}
            >
              Star Alumni
            </button>
            <button
              className={`px-3 py-2 rounded-md ml-2 ${
                viewOption === 'all'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-white'
              }`}
              onClick={() => handleViewOption('all')}
            >
              All
            </button>
            <div className="relative inline-block">
  <button
    className={`px-3 py-2 rounded-md ml-2 ${
      viewOption === 'department'
        ? 'bg-indigo-600 text-white'
        : 'bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-white'
    }`}
    onClick={() => handleViewOption('department')}
  >
    Department
  </button>
  {viewOption === 'department' && (
    <div className="absolute z-10 mt-2 bg-gray-800 rounded-md shadow-lg overflow-y-auto max-h-48">
      {departments.map((department) => (
        <button
          key={department}
          className="block px-4 py-2 text-left text-gray-400 hover:bg-gray-700 hover:text-white"
          onClick={() => {
            setSearchTerm(department);
            fetchAlumniDataByDepartment(department);
          }}
        >
          {department}
        </button>
      ))}
    </div>
  )}
</div>
<div className="relative inline-block">
  <button
    className={`px-3 py-2 rounded-md ml-2 ${
      viewOption === 'year'
        ? 'bg-indigo-600 text-white'
        : 'bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-white'
    }`}
    onClick={() => handleViewOption('year')}
  >
    Year
  </button>
  {viewOption === 'year' && (
    <div className="absolute z-10 mt-2 bg-gray-800 rounded-md shadow-lg overflow-y-auto max-h-48">
      {years.map((year) => (
        <button
          key={year}
          className="block px-4 py-2 text-left text-gray-400 hover:bg-gray-700 hover:text-white"
          onClick={() => {
            setSearchTerm(year);
            fetchAlumniDataByYear(year);
          }}
        >
          {year}
        </button>
      ))}
    </div>
  )}
</div>
</div>
</div>


<div className="bg-gray-800 p-4 rounded-md">
  <h2 className="text-2xl font-bold mb-4">Search Results</h2>
  {searchTerm === '' && emailSearchTerm === '' ? (
    <p>No search term entered.</p>
  ) : filteredResults.length === 0 ? (
    <p>No alumni found.</p>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredResults.map((alumni) => (
        <AlumniCard
          key={alumni.id}
          alumni={alumni}
          handleAlumniClick={handleAlumniClick}
        />
      ))}
    </div>
  )}
  {isLoading && <p>Loading more alumni...</p>}
  {!isLoading && lastVisible && (
    <button
      className="bg-indigo-600 text-white px-4 py-2 rounded mt-4"
      onClick={() => fetchAlumniData(true)}
    >
      Load More
    </button>
  )}
</div>
</div>

{/* Star Alumni Section */}
{searchTerm === '' && emailSearchTerm === '' && (
  <div className="bg-gray-800 py-8">
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Our Star Alumni</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {starAlumni.map((alumni) => (
          <AlumniCard
            key={alumni.id}
            alumni={alumni}
            handleAlumniClick={handleAlumniClick}
          />
        ))}
      </div>
    </div>
  </div>
)}

{/* Alumni Details Modal */}
{showModal && selectedAlumni && (
  <AlumniDetailsModal
    selectedAlumni={selectedAlumni}
    closeModal={closeModal}
  />
)}
</div>
);
};

export default Dashboard;


