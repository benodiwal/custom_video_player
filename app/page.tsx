"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const session = useSession();
  const router = useRouter();

  if (session?.status === "authenticated") {
    console.log('Authenticated');
    router.push("/browse")     
  } 

    return (
      <div className="relative h-full w-full bg-[url('/hero.jpg')]">
      <div className='absolute top-0 bg-gradient-to-b from-black/80 to-black/20 w-full h-1/2'>
      <nav className='lg:px-16 lg:py-8 px-6 py-4 flex items-center justify-between z-10 lg:mx-40'>
          <img src="/logo.png" alt="logo" className='md:h-10 h-8'/>
          <button
          onClick={() => router.push("/auth")} 
          className="bg-red-600 hover:bg-red-700 py-1 px-3 rounded-md text-white font-semibold">
            Sign in
          </button>
        </nav>
      </div>
      <div className="absolute w-full h-1/2 bottom-0 bg-gradient-to-t from-black/80 to-black/20">
      </div>
      <div className="justify-center flex mx-auto items-center z-100 bg-transparent absolute top-[250px] w-full text-center">
        <div className="max-w-[1000px]">
        <h1 className="font-bold lg:text-6xl text-3xl text-white">
          Unlimited movies, TV shows and more
        </h1>
        <p className="text-white lg:text-2xl text-lg mt-3">
        Watch anywhere. Cancel anytime
        </p>
        </div>
      </div>
    </div>
     )
  
}
