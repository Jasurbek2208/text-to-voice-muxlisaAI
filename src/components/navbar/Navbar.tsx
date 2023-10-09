import React from 'react'

export default function Navbar() {
  return (
    <div className='w-full h-12 bg-[rgba(247,247,248,1)] dark:bg-darker shadow-slate-900 bg:shadow-slate-500 shadow-sm duration-300'>
      <div className='max-w-[900px] mx-auto flex items-center justify-between gap-16 py-3 px-4'>
        <a href="#" className='text-gray-600 dark:text-gray-300 sm:text-xl text-lg font-bold duration-300'>Voice To Text</a>
      </div>
    </div>
  )
}