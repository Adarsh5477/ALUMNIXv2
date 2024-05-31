import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">About Us</h1>
        <div className="bg-gray-800 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Our Story</h2>
          <p className="mb-6">
            Welcome to Alumnix, a revolutionary platform designed to bring together alumni associations and foster meaningful connections. Alumnix was born out of a vision to create a space where alumni can connect, share experiences, and build a thriving community.
          </p>
          <h2 className="text-2xl font-bold mb-4">The Driving Force</h2>
          <div className="mb-8">
            <h3 className="text-xl font-semibold">Adarsh Kumar Dash</h3>
            <p className="mb-2">
              <span className="font-bold">Email:</span> 17adarsh2002@gmail.com
            </p>
            <p className="mb-2">
              <span className="font-bold">Education:</span> Christ University
            </p>
            <p className="mb-4">
              Adarsh is the driving force behind Alumnix, a passionate individual dedicated to fostering connections and empowering alumni communities. With a wealth of experience from his time at Christ University, he recognized the need for a platform that could bring alumni together, regardless of their location or background.
            </p>
            <div className="flex items-center">
              <a href="https://www.linkedin.com/in/adarsh-kumar-dash-269929200/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white mr-4">
                <FontAwesomeIcon icon={faLinkedin} size="lg" />
              </a>
              <a href="https://github.com/Adarsh5477" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white mr-4">
                <FontAwesomeIcon icon={faGithub} size="lg" />
              </a>
              <a href="https://www.instagram.com/adarsh__dash/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <FontAwesomeIcon icon={faInstagram} size="lg" />
              </a>
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-4">Cloudurity Services</h2>
          <p className="mb-6">
          A cyber self-instrosecption pioneer founded by cyber security veterans with over 100 years of combined experience. Our mission is to enable organizations to understand, mitigate, and communicate cybersecurity risk inorder to protect their cirtical systems and data.          </p>
          <p className="mb-6">
            Alumnix was initially an assignment given by Cloudurity Services, a leading technology company in Bangalore, as part of their internship assessment process. This project serves as an opportunity to showcase my skills and passion for building innovative solutions.
          </p>
          <div className="flex items-center">
            <a href="https://linkedin.com/company/cloudurity" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white mr-4">
              <FontAwesomeIcon icon={faLinkedin} size="lg" />
            </a>
            <a href="https://twitter.com/cloudurity" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white mr-4">
              <FontAwesomeIcon icon={['fab', 'twitter']} size="lg" />
            </a>
            <a href="https://instagram.com/cloudurity" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <FontAwesomeIcon icon={faInstagram} size="lg" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;