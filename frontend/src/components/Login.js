import React, { useState } from 'react';
import '../styles.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  // Handle login form submission
  const submitLoginForm = (e) => {
    e.preventDefault();

    if (email && password) {
      // Redirect or handle successful login
      window.location.href = '/afterlogin'; // Replace with actual route for your app
    } else {
      alert('Please enter both email and password.');
    }
  };

  // Toggle between login and register forms
  const toggleForm = () => {
    setShowRegisterForm(!showRegisterForm);
  };

  return (
    <div className="login-page">
      {/* Login Form */}
      {!showRegisterForm ? (
        <div className="form-container">
          <h2>Login</h2>
          <form onSubmit={submitLoginForm}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-custom w-100">
              Login
            </button>
          </form>
          <p className="mt-3">
            Don't have an account?{' '}
            <span className="toggle-link" onClick={toggleForm}>
              Register
            </span>
          </p>
        </div>
      ) : (
        /* Register Form */
        <div className="form-container">
          <h2>Register</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label">Full Name</label>
              <input
                type="text"
                id="fullName"
                className="form-control"
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="emailRegister" className="form-label">Email</label>
              <input
                type="email"
                id="emailRegister"
                className="form-control"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="passwordRegister" className="form-label">Password</label>
              <input
                type="password"
                id="passwordRegister"
                className="form-control"
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                className="form-control"
                placeholder="Confirm your password"
                required
              />
            </div>
            <button type="submit" className="btn btn-custom w-100">
              Register
            </button>
          </form>
          <p className="mt-3">
            Already have an account?{' '}
            <span className="toggle-link" onClick={toggleForm}>
              Login
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Login;
