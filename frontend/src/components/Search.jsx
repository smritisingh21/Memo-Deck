import React from 'react'
import { SearchIcon } from 'lucide-react'
export default function Search() {
  return (
    <div className='flex items-end justify-end'>

      <div className='flex gap-3 items-center justify-normal'>

        <input className=" mix-blend-color-dodge w-xl h-10 p-4 
        rounded-2xl place-content-start border-2 border-primary"
        placeholder = "Search here..">
        </input>

        <button>
        <SearchIcon/>

        </button>
      </div>
        
    </div>
  )
}
