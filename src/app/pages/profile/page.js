'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    gender: '',
    age: '',
    education: ''
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState('');
  const [scrollY, setScrollY] = useState(0);

  const educationLevels = [
    'High School',
    "Bachelor's Degree",
    "Master's Degree",
    'Ph.D.',
    'Diploma',
    'Other'
  ];

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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.contact.trim()) {
      newErrors.contact = 'Contact number is required';
    } else if (!/^\d{10}$/.test(formData.contact)) {
      newErrors.contact = 'Invalid contact number (10 digits required)';
    }

    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }

    if (!formData.age.trim()) {
      newErrors.age = 'Age is required';
    } else if (isNaN(formData.age) || parseInt(formData.age) < 0 || parseInt(formData.age) > 99) {
      newErrors.age = 'Invalid age (must be between 0 and 99)';
    }

    if (!formData.education) {
      newErrors.education = 'Education qualification is required';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      setSubmitStatus('success');
      console.log('Form submitted:', formData);
    } else {
      setErrors(newErrors);
      setSubmitStatus('error');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed text-white font-sans"
      style={{ background: getGradientStyle() }}
    >
      {/* Navbar with gradient */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-xl font-bold">
              SkillCompass
            </Link>
            <div className="space-x-8">
              <Link href="/login" className="text-white hover:text-indigo-200 transition duration-300">
                Login
              </Link>
              <Link href="/signup" className="text-white hover:text-indigo-200 transition duration-300">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Profile Overlay */}
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-gradient-to-r from-blue-700 to-blue-500 rounded-lg shadow-lg p-6 sm:p-8 max-w-md w-full opacity-90">
          <h2 className="text-2xl font-bold text-center text-white mb-8">
            Personal Profile
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-200">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md shadow-sm ${
                  errors.name 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                } sm:text-sm text-black`} // Added text-black class here
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-200">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md shadow-sm ${
                  errors.email 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                } sm:text-sm text-black`} // Added text-black class here
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Contact Field */}
            <div>
              <label htmlFor="contact" className="block text-sm font-medium text-gray-200">
                Contact Number
              </label>
              <input
                type="tel"
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md shadow-sm ${
                  errors.contact 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                } sm:text-sm text-black`} // Added text-black class here
              />
              {errors.contact && (
                <p className="mt-1 text-sm text-red-600">{errors.contact}</p>
              )}
            </div>

            {/* Gender Field */}
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-200">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md shadow-sm ${
                  errors.gender 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                } sm:text-sm text-black`} // Added text-black class here
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && (
                <p className="mt-1 text-sm text-red-600">{errors.gender}</p>
              )}
            </div>

            {/* Age Field */}
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-200">
                Age
              </label>
              <input
                type="text" // Keep as text to allow free input
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                maxLength={2} // Restrict to 2 digits
                className={`mt-1 block w-full rounded-md shadow-sm ${
                  errors.age 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                } sm:text-sm text-black`} // Added text-black class here
              />
              {errors.age && (
                <p className="mt-1 text-sm text-red-600">{errors.age}</p>
              )}
            </div>

            {/* Education Field */}
            <div>
              <label htmlFor="education" className="block text-sm font-medium text-gray-200">
                Highest Education Qualification
              </label>
              <select
                id="education"
                name="education"
                value={formData.education}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md shadow-sm ${
                  errors.education 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                } sm:text-sm text-black`} // Added text-black class here
              >
                <option value="">Select education level</option>
                {educationLevels.map((level) => (
                  <option key={level} value={level.toLowerCase()}>
                    {level}
                  </option>
                ))}
              </select>
              {errors.education && (
                <p className="mt-1 text-sm text-red-600">{errors.education}</p>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Save Profile
              </button>
            </div>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="rounded-md bg-green-50 p-4">
                <p className="text-sm text-green-700">
                  Profile updated successfully!
                </p>
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="rounded-md bg-red-50 p-4">
                <p className="text-sm text-red-700">
                  Please fix the errors in the form.
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}