import React from "react";

const Button = ({ onClick, children, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
    >
      {children}
    </button>
  );
};

export default Button;
