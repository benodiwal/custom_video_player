"use client";

import LoadingComponents from "@/components/LoadingComponents";

const loading = () => {
  return (
    <div className="relative h-full w-full bg-[url('/hero.jpg')]">
    <div className='absolute top-0 bg-gradient-to-b from-black/80 to-black/20 w-full h-1/2'>
    <nav className='lg:px-16 lg:py-8 px-6 py-4 flex items-center justify-between z-10 mx-40'>
        <img src="/logo.png" alt="logo" className='md:h-10 h-8'/>
        <button
        disabled={true}
        className="bg-red-600 hover:bg-red-700 py-1 px-3 rounded-md text-white font-semibold">
        {`...`}
        </button>
      </nav>
    </div>
    <div className="absolute w-full h-1/2 bottom-0 bg-gradient-to-t from-black/80 to-black/20">
    </div>
  </div>
  )
}

export default loading
