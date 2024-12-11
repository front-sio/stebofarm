// components/Testimonials.js
import React from "react";

const Testimonials = () => (
  <section className="testimonials py-16  text-accent">
    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
       
        <div className="container mx-auto text-center text-secondary">
          <h2 className="text-4xl font-bold">What Our Users Say</h2>
          <p className="mt-4 text-lg">See why users love our platform!</p>
          <div className="mt-12 flex flex-wrap justify-center">
            <div className="testimonial-item bg-red text-accent p-6 mx-4 rounded-lg shadow-lg">
              <p className="text-lg italic">"This platform helped me find the best suppliers for my business. Highly recommend!"</p>
              <p className="mt-4 font-semibold">John Doe</p>
            </div>
            <div className="testimonial-item bg-red text-accent p-6 mx-4 rounded-lg shadow-lg">
              <p className="text-lg italic">"A seamless experience for connecting with doctors and experts in the field."</p>
              <p className="mt-4 font-semibold">Jane Smith</p>
            </div>
          </div>
        </div>


      <div className="testmonial-big-image">
          <img
              src="/assets/images/farmer1.jpg" // Replace with the path to your image
              alt="Farmer working in the field"
              className="testmonial-image w-full h-full object-cover transition-transform duration-700 ease-in-out opacity-70 scale-110 hover:scale-100"
            />
        </div>
    </div>
  </section>
);

export default Testimonials;
