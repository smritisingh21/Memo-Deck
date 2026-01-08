import React from 'react'

export default function AuthLayout({children}) {
  return (
    <div className='h-100 w-40 bg-black p-10 m-10 rounded-lg shadow-xl  shadow-white/10'>
        <h1 className='text-bold text-white font-mono mb-3'>
          Memo-Deck <span className='font-neutral-200'>
            : for all your notes</span></h1>
        <div>
            {children}
        </div>
    </div>
  )
}
