import React from 'react'

export default function Navbar() {
  return (
    <div className='w-full h-12 bg-darker shadow-slate-500 shadow-sm'>
      <div className='max-w-[900px] mx-auto flex items-center justify-between gap-16 py-3 px-4'>
        <a href="#" className='text-white sm:text-xl text-lg font-bold'>Voice To Text</a>
      </div>
    </div>
  )
}