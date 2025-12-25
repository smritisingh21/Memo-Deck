import React from "react";

export default function Modal({ children, onClose }) {
  return (
    <div className="fixed h-screen inset-0 z-50 flex items-center justify-center">
      
      <div
        className="absolute inset-0 bg-black/20"
        onClick={onClose}
      />

      <div className="relative z-10 bg-base-100/90 rounded-xl shadow-xl p-6 w-full max-w-md">
        {children}
      </div>
    </div>
  );
}