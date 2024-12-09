// components/Features.js
import React from "react";

const Features = () => (
  <section className="features py-16 bg-red text-accent">
    <div className="container mx-auto text-center">
      <h2 className="text-4xl font-bold">Our Features</h2>
      <p className="mt-4 text-lg">Discover the amazing features of our marketplace!</p>
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        <div className="feature-item bg-secondary text-accent p-6 rounded-lg shadow-lg">
        <div className="feature-image">
            <img
                src="/assets/images/farmer1.jpg" // Replace with the path to your image
                alt="Farmer working in the field"
                className="about-image w-full h-full object-cover transition-transform duration-700 ease-in-out opacity-70 scale-110 hover:scale-100"
              />
        </div>
        <div className="features-content my-12">
          <h3 className="text-2xl font-semibold">Sell Your Products</h3>
          <p className="mt-4">Easily list your products for sale and manage your inventory.</p>
        </div>
        </div>
        <div className="feature-item bg-secondary text-accent p-6 rounded-lg shadow-lg">
          <div className="feature-image">
            <img
                src="/assets/images/farmer 1.jpg" // Replace with the path to your image
                alt="Farmer working in the field"
                className="about-image w-full h-full object-cover transition-transform duration-700 ease-in-out opacity-70 scale-110 hover:scale-100"
              />
          </div>
          <div className="features-content my-12">
              <h3 className="text-2xl font-semibold">Connect with Professionals</h3>
              <p className="mt-4">Find and consult with industry professionals in your field.</p>
          </div>
        </div>
        <div className="feature-item bg-secondary text-accent p-6 rounded-lg shadow-lg">
        <div className="feature-image">
          <img
              src="/assets/images/farmer1.jpg" // Replace with the path to your image
              alt="Farmer working in the field"
              className="about-image w-full h-full object-cover transition-transform duration-700 ease-in-out opacity-70 scale-110 hover:scale-100"
            />
        </div>
        <div className="features-content my-12">
          <h3 className="text-2xl font-semibold">Secure Payments</h3>
          <p className="mt-4">We ensure secure and reliable payment methods for all transactions.</p>
        </div>
        </div>
      </div>
    </div>
  </section>
);

export default Features;
