// src/app/pages/login/page.js
'use client';

import React from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation

const Login = () => {
  const router = useRouter(); // Initialize the router

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission
    // Here you can add your login logic (e.g., API call)
    // After successful login, navigate to the home page
    router.push('/pages/home'); // Navigate to the home page
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login to SkillCompass</h2>
        <form onSubmit={handleSubmit}> {/* Attach handleSubmit to the form */}
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              style={styles.input}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              style={styles.input}
              required
            />
          </div>
          <div style={styles.buttonContainer}>
            <button type="submit" style={styles.button}>
              Login
            </button>
          </div>
        </form>
        <p style={styles.footerText}>
          Don't have an account? <a href="/register" style={styles.link}>Sign up</a>
        </p>
      </div>
    </div>
  );
};

// Internal CSS styles
const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(270deg,#d0cfcf,#2f41566)',
    backgroundSize: '400% 400%',
    animation: 'gradient 30s ease infinite',
    fontFamily: 'Arial, Helvetica, sans-serif',
  },
  card: {
    backgroundColor: '#f5efeb',
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    padding: '32px',
    maxWidth: '400px',
    width: '100%',
  },
  title: {
    textAlign: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#2f4156',
    marginBottom: '24px',
  },
  inputGroup: {
    marginBottom: '16px',
  },
  label: {
    display: 'block',
    color: '#171717',
    fontWeight: 'bold',
    marginBottom: '8px',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    outline: 'none',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#2f4156',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  },
  footerText: {
    textAlign: 'center',
    marginTop: '16px',
    color: '#666',
  },
  link: {
    color: '#2f4156',
    textDecoration: 'underline',
  },
};

// Add keyframes for the gradient animation
const gradientAnimation = `
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
`;

// Append the keyframes to the document head
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = gradientAnimation;
  document.head.appendChild(styleSheet);
}

export default Login;