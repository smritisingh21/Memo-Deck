import React, { useState } from 'react';


export default function Input({ type, placeholder, label }) {

  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="w-full mb-5 font-sans">
      <label 
        className={`block text-xs font-bold uppercase tracking-widest mb-2 transition-colors duration-300 ${
          isFocused ? 'text-indigo-400' : 'text-gray-500'
        }`}
      >
        {label}
      </label>

      <div 
        className={`relative transition-all duration-300 rounded-lg border-2 ${
          isFocused 
            ? 'border-indigo-500 bg-indigo-500/5 shadow-lg shadow-indigo-500/10' 
            : 'border-white/10 bg-white/5 hover:border-white/20'
        }`}
      >
        <input
          className="w-full bg-transparent p-3 text-white placeholder-gray-600 outline-none text-sm"
          type={type}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
    </div>
  );
}