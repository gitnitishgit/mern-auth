import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div className='bg-slate-200'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <h1 className='font-bold'>Auth App</h1>
        </Link>
        <ul className='flex gap-4'>
            <Link>
                <li>Home</li>
            </Link>
            <Link>
                <li>Sign In</li>
            </Link>
            <Link>  
                <li>Sign Up</li>
            </Link>
        </ul>
      </div>
    </div>
  )
}
