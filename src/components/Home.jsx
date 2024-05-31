import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserGraduate,
  faBuilding,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import Navbar from "./Navbar";
import { useRef } from 'react';
const Home = () => {
  const aboutRef = useRef(null);
  const dummyAlumni = [
    {
      name: "Shreya Goyel",
      graduationYear: "2018",
      department: "Computer Science",
      specialization: "Artificial Intelligence",
      activities: ["Coding Club", "Sports Club"],
    },
    {
      name: "G.N  Sharma",
      graduationYear: "2020",
      department: "Electrical Engineering",
      specialization: "Power Systems",
      activities: ["Robotics Club", "Debate Club"],
    },{
      name: "Abhishek Dutta",
      graduationYear: "2017",
      department: "Computer Science",
      specialization: "Cyber Security",
      activities: ["Computer Network Club", "Debate Club"],
    }
    // Add more dummy alumni data as needed
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-gray-800 to-gray-900 hero">
        <div className="background-svg bg">
          <svg
            width="450"
            height="556"
            viewBox="0 0 450 556"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="277"
              cy="63"
              r="225"
              fill="url(#paint0_linear_25:217)"
            ></circle>
            <circle
              cx="17.9997"
              cy="182"
              r="18"
              fill="url(#paint1_radial_25:217)"
            ></circle>
            <circle
              cx="76.9997"
              cy="288"
              r="34"
              fill="url(#paint2_radial_25:217)"
            ></circle>
            <circle
              cx="325.486"
              cy="302.87"
              r="180"
              transform="rotate(-37.6852 325.486 302.87)"
              fill="url(#paint3_linear_25:217)"
            ></circle>
            <circle
              opacity="0.8"
              cx="184.521"
              cy="315.521"
              r="132.862"
              transform="rotate(114.874 184.521 315.521)"
              stroke="url(#paint4_linear_25:217)"
            ></circle>
            <circle
              opacity="0.8"
              cx="356"
              cy="290"
              r="179.5"
              transform="rotate(-30 356 290)"
              stroke="url(#paint5_linear_25:217)"
            ></circle>
            <circle
              opacity="0.8"
              cx="191.659"
              cy="302.659"
              r="133.362"
              transform="rotate(133.319 191.659 302.659)"
              fill="url(#paint6_linear_25:217)"
            ></circle>
            <defs>
              <linearGradient
                id="paint0_linear_25:217"
                x1="-54.5003"
                y1="-178"
                x2="222"
                y2="288"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#4A6CF7"></stop>
                <stop offset="1" stop-color="#4A6CF7" stop-opacity="0"></stop>
              </linearGradient>
              <radialGradient
                id="paint1_radial_25:217"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(17.9997 182) rotate(90) scale(18)"
              >
                <stop
                  offset="0.145833"
                  stop-color="#4A6CF7"
                  stop-opacity="0"
                ></stop>
                <stop
                  offset="1"
                  stop-color="#4A6CF7"
                  stop-opacity="0.08"
                ></stop>
              </radialGradient>
              <radialGradient
                id="paint2_radial_25:217"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(76.9997 288) rotate(90) scale(34)"
              >
                <stop
                  offset="0.145833"
                  stop-color="#4A6CF7"
                  stop-opacity="0"
                ></stop>
                <stop
                  offset="1"
                  stop-color="#4A6CF7"
                  stop-opacity="0.08"
                ></stop>
              </radialGradient>
              <linearGradient
                id="paint3_linear_25:217"
                x1="226.775"
                y1="-66.1548"
                x2="292.157"
                y2="351.421"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#4A6CF7"></stop>
                <stop offset="1" stop-color="#4A6CF7" stop-opacity="0"></stop>
              </linearGradient>
              <linearGradient
                id="paint4_linear_25:217"
                x1="184.521"
                y1="182.159"
                x2="184.521"
                y2="448.882"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#4A6CF7"></stop>
                <stop offset="1" stop-color="white" stop-opacity="0"></stop>
              </linearGradient>
              <linearGradient
                id="paint5_linear_25:217"
                x1="356"
                y1="110"
                x2="356"
                y2="470"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#4A6CF7"></stop>
                <stop offset="1" stop-color="white" stop-opacity="0"></stop>
              </linearGradient>
              <linearGradient
                id="paint6_linear_25:217"
                x1="118.524"
                y1="29.2497"
                x2="166.965"
                y2="338.63"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#4A6CF7"></stop>
                <stop offset="1" stop-color="#4A6CF7" stop-opacity="0"></stop>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="background-svg-bottom-left bg2">
          <svg
            width="364"
            height="201"
            viewBox="0 0 364 201"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.88928 72.3303C33.6599 66.4798 101.397 64.9086 150.178 105.427C211.155 156.076 229.59 162.093 264.333 166.607C299.076 171.12 337.718 183.657 362.889 212.24"
              stroke="url(#paint0_linear_25:218)"
            ></path>
            <path
              d="M-22.1107 72.3303C5.65989 66.4798 73.3965 64.9086 122.178 105.427C183.155 156.076 201.59 162.093 236.333 166.607C271.076 171.12 309.718 183.657 334.889 212.24"
              stroke="url(#paint1_linear_25:218)"
            ></path>
            <path
              d="M-53.1107 72.3303C-25.3401 66.4798 42.3965 64.9086 91.1783 105.427C152.155 156.076 170.59 162.093 205.333 166.607C240.076 171.12 278.718 183.657 303.889 212.24"
              stroke="url(#paint2_linear_25:218)"
            ></path>
            <path
              d="M-98.1618 65.0889C-68.1416 60.0601 4.73364 60.4882 56.0734 102.431C120.248 154.86 139.905 161.419 177.137 166.956C214.37 172.493 255.575 186.165 281.856 215.481"
              stroke="url(#paint3_linear_25:218)"
            ></path>
            <circle
              opacity="0.8"
              cx="214.505"
              cy="60.5054"
              r="49.7205"
              transform="rotate(-13.421 214.505 60.5054)"
              stroke="url(#paint4_linear_25:218)"
            ></circle>
            <circle
              cx="220"
              cy="63"
              r="43"
              fill="url(#paint5_radial_25:218)"
            ></circle>
            <defs>
              <linearGradient
                id="paint0_linear_25:218"
                x1="184.389"
                y1="69.2405"
                x2="184.389"
                y2="212.24"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#4A6CF7" stop-opacity="0"></stop>
                <stop offset="1" stop-color="#4A6CF7"></stop>
              </linearGradient>
              <linearGradient
                id="paint1_linear_25:218"
                x1="156.389"
                y1="69.2405"
                x2="156.389"
                y2="212.24"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#4A6CF7" stop-opacity="0"></stop>
                <stop offset="1" stop-color="#4A6CF7"></stop>
              </linearGradient>
              <linearGradient
                id="paint2_linear_25:218"
                x1="125.389"
                y1="69.2405"
                x2="125.389"
                y2="212.24"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#4A6CF7" stop-opacity="0"></stop>
                <stop offset="1" stop-color="#4A6CF7"></stop>
              </linearGradient>
              <linearGradient
                id="paint3_linear_25:218"
                x1="93.8507"
                y1="67.2674"
                x2="89.9278"
                y2="210.214"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#4A6CF7" stop-opacity="0"></stop>
                <stop offset="1" stop-color="#4A6CF7"></stop>
              </linearGradient>
              <linearGradient
                id="paint4_linear_25:218"
                x1="214.505"
                y1="10.2849"
                x2="212.684"
                y2="99.5816"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#4A6CF7"></stop>
                <stop offset="1" stop-color="#4A6CF7" stop-opacity="0"></stop>
              </linearGradient>
              <radialGradient
                id="paint5_radial_25:218"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(220 63) rotate(90) scale(43)"
              >
                <stop
                  offset="0.145833"
                  stop-color="white"
                  stop-opacity="0"
                ></stop>
                <stop offset="1" stop-color="white" stop-opacity="0.08"></stop>
              </radialGradient>
            </defs>
          </svg>
        </div>
        <h1 className="text-5xl font-bold mb-4 text-center lg:text-5xl md:text-4xl sm:text-3xl animate-fade-in-up">
          <span className="block lg:inline">Welcome to</span>{" "}
          <span className="block lg:inline">Alumnix</span>
        </h1>
        <p className="text-xl text-gray-400 mb-8 animate-fade-in-up">
          Connect with your fellow alumni and unlock endless opportunities
        </p>
        <Link
          to="/login"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded animate-bounce"
        >
          Join Now
        </Link>
      </div>

      {/* About Section */}
      <div className="bg-gray-800 py-16" ref={aboutRef} id="about">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center animate-fade-in-up">
            About Alumnix
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900 p-8 rounded-lg animate-fade-in-left">
              <FontAwesomeIcon
                icon={faUserGraduate}
                className="text-4xl mb-4"
              />
              <h3 className="text-xl font-bold mb-2">Connect with Alumni</h3>
              <p className="text-gray-400">
                Stay connected with your fellow alumni and share your
                experiences. Reconnect with old friends and make new
                connections.
              </p>
            </div>
            <div className="bg-gray-900 p-8 rounded-lg animate-fade-in-up">
              <FontAwesomeIcon icon={faBuilding} className="text-4xl mb-4" />
              <h3 className="text-xl font-bold mb-2">Career Opportunities</h3>
              <p className="text-gray-400">
                Explore career opportunities and job openings shared by alumni.
                Find your dream job or internship through our platform and get
                insights from industry experts.
              </p>
            </div>
            <div className="bg-gray-900 p-8 rounded-lg animate-fade-in-right">
              <FontAwesomeIcon icon={faUsers} className="text-4xl mb-4" />
              <h3 className="text-xl font-bold mb-2">Alumni Network</h3>
              <p className="text-gray-400">
                Join a vibrant network of alumni and expand your professional
                circle. Connect with industry leaders, mentors, and potential
                collaborators.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Alumni Showcase */}
      <div className="bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center animate-fade-in-up">
            Featured Alumni
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dummyAlumni.map((alumni, index) => (
              <div
                key={index}
                className="bg-gray-800 p-8 rounded-lg animate-fade-in-left"
              >
                <h3 className="text-xl font-bold mb-2">{alumni.name}</h3>
                <p className="text-gray-400 mb-2">
                  Graduation Year: {alumni.graduationYear}
                </p>
                <p className="text-gray-400 mb-2">
                  Department: {alumni.department}
                </p>
                <p className="text-gray-400 mb-2">
                  Specialization: {alumni.specialization}
                </p>
                <p className="text-gray-400">
                  Activities: {alumni.activities.join(", ")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center animate-fade-in-up">
            What Our Alumni Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-900 p-8 rounded-lg animate-fade-in-left">
              <blockquote className="text-gray-400 italic">
                "Alumnix has been a game-changer for me. I've been able to
                reconnect with my classmates and find amazing career
                opportunities through the platform."
              </blockquote>
              <p className="text-white font-bold mt-4">- Jane Smith</p>
            </div>
            <div className="bg-gray-900 p-8 rounded-lg animate-fade-in-right">
              <blockquote className="text-gray-400 italic">
                "The alumni network on Alumnix has been invaluable. I've made
                valuable connections and received mentorship from industry
                experts."
              </blockquote>
              <p className="text-white font-bold mt-4">- Michael Johnson</p>
            </div>
          </div>
        </div>
      </div>

      <ScrollToTop />
    </div>
  );
};

export default Home;