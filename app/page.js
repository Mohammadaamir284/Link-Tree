"use client"
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const Reviews = dynamic(() => import('./Reviews'), { ssr: false });

export default function Home() {

  const [loaded, setloaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setloaded(true)
    }, 4000);
    return () => clearTimeout(timer);


  }, [loaded])

  return (
    <>

      {loaded ?
        (
          <div>
            <Navbar />
            <Reviews />
          </div>
        ) : (
          <div className="loader-container">
            <div className="typing-animation">LinkTree</div>
            <Image
              className="loader-logo w-12 h-12"
              src="/logo.svg"
              alt="logo"
              width={48}
              height={48}
              priority
            />
          </div>
        )
      }


    </>
  );
} 