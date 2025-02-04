// src/app/pages/projects.js
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { UserIcon } from '@heroicons/react/24/solid'; // Correct import for UserIcon

const Projects = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getGradientStyle = () => {
    const gradientColors = [
      { color: '#204796', position: '0%' },
      { color: '#3271CA', position: '22%' },
      { color: '#439BFF', position: '44%' },
      { color: '#63ACFF', position: '87%' }
    ];

    const scrollProgress = Math.min(scrollY / 500, 1);
    const adjustedPositions = gradientColors.map(({ color, position }) => {
      const pos = parseFloat(position) + (scrollProgress * 10);
      return `${color} ${pos}%`;
    });

    return `linear-gradient(145deg, ${adjustedPositions.join(', ')})`;
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div 
      className="min-h-screen text-white font-sans"
      style={{ background: getGradientStyle() }}
    >
      {/* Navbar with gradient */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-xl font-bold">
              SkillCompass
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/profile">
                <UserIcon className="w-6 h-6 text-white hover:text-indigo-200 transition duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">Project Portfolio Builder</h1>
          <p className="text-lg text-white">Select your skills to get personalized project recommendations</p>
        </header>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">Recommended Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Project 1: Personal Blog */}
            <div className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
              <h3 className="text-xl font-bold text-blue-900">Personal Blog</h3>
              <p className="text-gray-600 mb-4">Create a responsive blog with articles and comments</p>
              <span className="px-3 py-1 rounded-full text-sm font-medium text-blue-600 bg-blue-100">Beginner</span>
              <h4 className="text-sm font-medium text-gray-700 mt-4">Required Skills:</h4>
              <p className="text-gray-600">HTML, CSS</p>
              <h4 className="text-sm font-medium text-gray-700 mt-4">Learning Outcomes:</h4>
              <ul className="list-disc list-inside text-gray-600 text-sm">
                <li>Responsive design principles</li>
                <li>CSS layouts and flexbox</li>
                <li>Basic interactivity</li>
              </ul>
            </div>

            {/* Project 2: Simple To-Do List */}
            <div className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
              <h3 className="text-xl font-bold text-blue-900">Simple To-Do List</h3>
              <p className="text-gray-600 mb-4">Create a simple to-do list application where users can add, edit, and delete tasks.</p>
              <span className="px-3 py-1 rounded-full text-sm font-medium text-blue-600 bg-blue-100">Beginner</span>
              <h4 className="text-sm font-medium text-gray-700 mt-4">Required Skills:</h4>
              <p className="text-gray-600">HTML, CSS, JavaScript</p>
              <h4 className="text-sm font-medium text-gray-700 mt-4">Learning Outcomes:</h4>
              <ul className="list-disc list-inside text-gray-600 text-sm">
                <li>DOM manipulation</li>
                <li>Event handling</li>
                <li>Local storage</li>
              </ul>
            </div>

            {/* Project 3: Calculator */}
            <div className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
              <h3 className="text-xl font-bold text-blue-900">Calculator</h3>
              <p className="text-gray-600 mb-4">Build a basic calculator that performs addition, subtraction, multiplication, and division.</p>
              <span className="px-3 py-1 rounded-full text-sm font-medium text-blue-600 bg-blue-100">Beginner</span>
              <h4 className="text-sm font-medium text-gray-700 mt-4">Required Skills:</h4>
              <p className="text-gray-600">HTML, CSS, JavaScript</p>
              <h4 className="text-sm font-medium text-gray-700 mt-4">Learning Outcomes:</h4>
              <ul className="list-disc list-inside text-gray-600 text-sm">
                <li>Basic arithmetic operations</li>
                <li>User input handling</li>
                <li>UI design principles</li>
              </ul>
            </div>

            {/* Project 4: Quiz App */}
            <div className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
              <h3 className="text-xl font-bold text-blue-900">Quiz App</h3>
              <p className="text-gray-600 mb-4">Develop a simple quiz application that presents questions and tracks user scores.</p>
              <span className="px-3 py-1 rounded-full text-sm font-medium text-blue-600 bg-blue-100">Intermediate</span>
              <h4 className="text-sm font-medium text-gray-700 mt-4">Required Skills:</h4>
              <p className="text-gray-600">HTML, CSS, JavaScript</p>
              <h4 className="text-sm font-medium text-gray-700 mt-4">Learning Outcomes:</h4>
              <ul className="list-disc list-inside text-gray-600 text-sm">
                <li>Conditional rendering</li>
                <li>State management</li>
                <li>User feedback</li>
              </ul>
            </div>

            {/* Project 5: Image Gallery */}
            <div className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
              <h3 className="text-xl font-bold text-blue-900">Image Gallery</h3>
              <p className="text-gray-600 mb-4">Create a responsive image gallery that displays images in a grid layout.</p>
              <span className="px-3 py-1 rounded-full text-sm font-medium text-blue-600 bg-blue-100">Beginner</span>
              <h4 className="text-sm font-medium text-gray-700 mt-4">Required Skills:</h4>
              <p className="text-gray-600">HTML, CSS</p>
              <h4 className="text-sm font-medium text-gray-700 mt-4">Learning Outcomes:</h4>
              <ul className="list-disc list-inside text-gray-600 text-sm">
                <li>CSS grid and flexbox</li>
                <li>Responsive design</li>
                <li>Image optimization</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Create Your Own Project Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-blue-800">Create Your Own Project</h2>
          <button onClick={handleOpenModal} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Create Your Own Project
          </button>
        </section>

        {/* Modal */}
        {isModalOpen && (
          <div className="modal fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="modal-content bg-white rounded-lg shadow-lg p-6">
              <span onClick={handleCloseModal} className="close text-gray-500 float-right cursor-pointer">&times;</span>
              <h2 className="text-2xl font-bold mb-6 text-blue-800">Create and Describe Your Own Project</h2>
              <form>
                <div className="mb-4">
                  <label htmlFor="projectTitle" className="block text-sm font-medium text-gray-700">Project Title</label>
                  <input type="text" id="projectTitle" className="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
                </div>
                <div className="mb-4">
                  <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-700">Project Description</label>
                  <textarea id="projectDescription" rows="4" className="mt-1 block w-full border border-gray-300 rounded-md p-2" required></textarea>
                </div>
                <div className="mb-4">
                  <label htmlFor="projectDifficulty" className="block text-sm font-medium text-gray-700">Difficulty Level</label>
                  <select id="projectDifficulty" className="mt-1 block w-full border border-gray-300 rounded-md p-2" required>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="requiredSkills" className="block text-sm font-medium text-gray-700">Required Skills</label>
                  <input type="text" id="requiredSkills" className="mt-1 block w-full border border-gray-300 rounded-md p-2" placeholder="e.g., HTML, CSS, JavaScript" required />
                </div>
                <div className="mb-4">
                  <label htmlFor="learningOutcomes" className="block text-sm font-medium text-gray-700">Learning Outcomes</label>
                  <textarea id="learningOutcomes" rows="4" className="mt-1 block w-full border border-gray-300 rounded-md p-2" placeholder="List learning outcomes separated by commas" required></textarea>
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Submit Your Project
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;