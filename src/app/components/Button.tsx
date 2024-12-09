// Add "use client" at the top to mark this component as a client-side component
"use client";

import React from 'react';

type ButtonProps = {
  text: string;
  onClick: () => void;
  className?: string;
};

const Button = ({ text, onClick, className }: ButtonProps) => (
  <button onClick={onClick} className={`bg-primary text-accent py-2 px-4 rounded-md hover:bg-secondary ${className}`}>
    {text}
  </button>
);

export default Button;
