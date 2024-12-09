"use client";

import React, { useState, useEffect } from "react";

const Hero = () => {
  const [isImage, setIsImage] = useState(false);

  // Switch between image and video every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsImage((prev) => !prev);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero  text-accent h-screen relative flex items-center justify-center overflow-hidden font-sans">
      {/* Background Content */}
      <div className="absolute inset-0 z-0">
        {isImage ? (
          <img
            src="/assets/images/farmer1.jpg" // Replace with the path to your image
            alt="Farmer working in the field"
            className="hero-image w-full h-full object-cover transition-transform duration-700 ease-in-out opacity-70 scale-110 hover:scale-100"
          />
        ) : (
          <video
            autoPlay
            loop
            muted
            className="hero-video w-full h-full object-cover absolute top-0 left-0 z-0 transition-transform duration-700 ease-in-out opacity-50 scale-110 hover:scale-100"
          >
            <source
              src="/assets/videos/VID-20241126-WA0110.mp4"
              type="video/mp4"
            />
          </video>
        )}
      </div>

      {/* Text Content */}
      <div className="text-center z-10 relative px-4">
        {isImage ? (
          <>
            <h1 className="text-6xl font-extrabold transition-transform duration-500 ease-in-out hover:scale-105 text-white">
              Cultivating Prosperity Together
            </h1>
            <p className="mt-6 text-xl transition-opacity duration-500 ease-in-out text-white opacity-90">
              Discover high-quality resources, products, and tools to enhance
              your yield.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-6xl font-extrabold transition-transform duration-500 ease-in-out hover:scale-105 text-white">
              Empowering Farmers Globally
            </h1>
            <p className="mt-6 text-xl transition-opacity duration-500 ease-in-out text-white opacity-90">
              Connect with professionals to revolutionize agriculture through
              innovation and expertise.
            </p>
          </>
        )}
      </div>
    </section>
  );
};

export default Hero;
