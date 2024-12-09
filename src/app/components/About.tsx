// components/About.js
import React from "react";

const About = () => (
  <section className="about py-16 bg-accent text-secondary">
    <div className="container mx-auto text-center">
      
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        <div className="about-big-image">
          <img
              src="/assets/images/farmer 1.jpg" // Replace with the path to your image
              alt="Farmer working in the field"
              className="about-image w-full h-full object-cover transition-transform duration-700 ease-in-out opacity-70 scale-110 hover:scale-100"
            />
        </div>
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold">About Us</h2>
          <p className="mt-4 text-lg">
            Our mission is to provide a trusted marketplace where users can easily buy, sell, and connect
            with professionals in various industries.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default About;
