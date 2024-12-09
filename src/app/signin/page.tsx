import React from 'react';
import './signin.css'; // Import the custom CSS for the page

const Signin = () => {
  return (
    <div className="signin-container">
      {/* Left Side (Form Section) */}
      <div className="signin-form-container">
        <h1 className="signin-heading">Welcome to the Sign-in Page</h1>
        <form className="signin-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Enter your email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Enter your password" required />
          </div>
          <button type="submit" className="signin-button bg-red text-accent">Sign In</button>
        </form>
      </div>

      {/* Right Side (Image Section) */}
      <div className="signin-image-container">
        <div className="image-text-overlay">
          <h2>Empower Your Future</h2>
          <p>Sign in to explore more opportunities</p>
        </div>
        <img src="/assets/images/farmer1.jpg" alt="Sign In" className="signin-image" />
      </div>
    </div>
  );
};

export default Signin;
