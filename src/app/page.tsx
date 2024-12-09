// pages/Home.js
"use client"; // Ensure this component is client-side

import React from "react";
import About from "./components/About";
import CallToAction from "./components/CallToAction";
import Features from "./components/Features";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Testimonials from "./components/Testimonials";


const Home = () => {
  return (
    <div>
      <Hero />
      <Features />
      <About />
      <Testimonials />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Home;
