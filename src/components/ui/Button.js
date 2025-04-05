import React from 'react';

export default function Button({ 
  children, 
  type = 'button', 
  className = '', 
  disabled = false, 
  onClick, 
  ...props 
}) {
  return (
    <button
      type={type}
      className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-150 ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
