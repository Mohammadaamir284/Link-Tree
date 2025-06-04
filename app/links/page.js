"use client"
import { Suspense, useState, useEffect } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import "./Loading.css"
const Linkpage = dynamic(() => import('./Linkpage'), { ssr: false });

export default function Page() {
  const [loading, setloading] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setloading(true)
    }, 4000);
    return () => clearTimeout(timer); // cleanup
  }, [loading])


  return (<>

    {
      loading ? (
        <Suspense fallback={< div > Loading...</div>}>
          <Linkpage />
        </Suspense >
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
      )}


  </>
  )

}
