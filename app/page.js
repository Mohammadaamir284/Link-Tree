"use client"
import dynamic from 'next/dynamic';



  const Reviews = dynamic(() => import('./Reviews'), { ssr: false });

export default function Home() {
  

  return (
    <>
     
           <Reviews/>

    </>
  );
} 