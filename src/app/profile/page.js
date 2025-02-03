'use client';

import { useState } from 'react';

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

  const educationLevels = [
    'High School',
    "Bachelor's Degree",
    "Master's Degree",
    'Ph.D.',
    'Diploma',
    'Other'
  ];

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
    } else if (isNaN(formData.age) || parseInt(formData.age) < 0) {
      newErrors.age = 'Invalid age';
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
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Personal Profile
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
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
                } sm:text-sm`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
                } sm:text-sm`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Contact Field */}
            <div>
              <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
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
                } sm:text-sm`}
              />
              {errors.contact && (
                <p className="mt-1 text-sm text-red-600">{errors.contact}</p>
              )}
            </div>

            {/* Gender Field */}
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
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
                } sm:text-sm`}
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
              <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md shadow-sm ${
                  errors.age 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                } sm:text-sm`}
              />
              {errors.age && (
                <p className="mt-1 text-sm text-red-600">{errors.age}</p>
              )}
            </div>

            {/* Education Field */}
            <div>
              <label htmlFor="education" className="block text-sm font-medium text-gray-700">
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
                } sm:text-sm`}
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


