// components/CallToAction.js
import React from "react";

const CallToAction = () => (
  <section className="cta py-16  text-secondary text-center">
    <h2 className="text-4xl font-bold">Ready to Join Us?</h2>
    <p className="mt-4 text-lg">Sign up today and start your journey with us.</p>
    <a
      href="/signup"
      className="mt-8 inline-block bg-red text-accent py-2 px-6 rounded-lg text-xl font-semibold transition-transform duration-300 ease-in-out hover:scale-105"
    >
      Sign Up Now
    </a>
  </section>
);

export default CallToAction;
