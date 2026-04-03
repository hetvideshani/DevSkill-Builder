'use client';
import Image from 'next/image'
import React from 'react'
import gif from '../../public/assets/images/robot.gif'
import { cn_class } from '@/utils/cn'
import { Boxes } from '@/components/ui/background-boxes'
import Navbar from '@/components/Navbar'
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

export default function Notfound() {
  const notify = () => toast("Wow, this is a toast!");
  return (
    
    <div className="h-[100vh] relative w-full overflow-hidden bg-[#000000] flex flex-col items-center justify-center rounded-lg">
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <Boxes />
      {/* <h1 className={cn_class("md:text-4xl text-xl text-white relative z-20")}>
        Tailwind is Awesome
      </h1>
      <p className="text-center mt-2 text-neutral-300 relative z-20">
        Framer motion is the best animation library ngl
      </p> */}
      
      <div className='text-[#7341e8] grid place-items-center w-full'>
        <Navbar />
        <div className='mt-10 flex'>
          <h1 className='text-[200px] font-extrabold -me-12'>4</h1>
          <Image width={350} height={200} src={gif} alt='gif' />
          <h1 className='text-[200px] font-extrabold -ms-12'>4</h1>
        </div>
        <div className='mt-7'>
          <h1 className='text-5xl font-bold'>Page not found.</h1>
        </div>
        <div className='mt-7'>
          <h1 className='text-xl text-[#E1E1E1]'>Sorry! we couldn't find page you are looking for.</h1>
        </div>
        <div className='mt-10'>
          <button className='bg-[#7341e8] text-[#E1E1E1] px-5 py-3 rounded-full transform transition-transform duration-300 hover:scale-110'>Go to Home</button>
        </div>
        {/* <div className='mt-10'>
          <button className='bg-[#7341e8] text-[#E1E1E1] px-5 py-3 rounded-full transform transition-transform duration-300 hover:scale-110'>Go to Home</button>
        </div> */}
      </div>
    </div>
  )
}
