// AnimatedBackground.jsx
import React from "react";
import "../styles/animated-bg.css"; // Import the CSS file for styling

const AnimatedBackground = ({ children }) => (
  <div className="animated-bg">
    <div className="bg-bubble bg-bubble1"></div>
    <div className="bg-bubble bg-bubble2"></div>
    <div className="bg-bubble bg-bubble3"></div>
    {children}
  </div>
);

export default AnimatedBackground;
