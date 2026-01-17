import React from 'react'

export default function Options({functionality , icon , label}) {
  return (
       <div className="px-2 py-1.5 hover:bg-base-300 rounded-md " 
            onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            {functionality()}
        }}>
        <button
            className="text-gray-600 hover:text-base-content flex items-center justify-center gap-2"
            >
         {icon} {label}
        </button>
        </div>
  )
}
