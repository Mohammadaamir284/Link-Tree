"use client"


import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const Navbar = () => {
  


    const pathname = usePathname()
    const shownav = ['/', '/links'].includes(pathname)
    return (
        <>
            {shownav && <nav className='md:w-[80vw] w-[90vw]  rounded-full flex items-center justify-between md:mx-[10vw] mx-[5vw] fixed  z-50  top-10 bg-white p-4'>
                <div className='flex items-center gap-7 '>
                    <Link href={'/'}>
                        <div className='text-[#254f1a] flex items-center'>
                            <div className='font-bold text-2xl'>LinkTree</div>
                            <img className='text-[#254f1a] w-7' src="/logo.svg" alt="" />
                        </div>
                    </Link>
                    <ul className='flex items-center gap-5'>
                        <li className='hover:bg-gray-200 text-[16px] font-semibold p-3 hidden md:block rounded-lg w-fit'>Product</li>
                        <li className='hover:bg-gray-200 text-[16px] font-semibold p-3 hidden md:block rounded-lg w-fit'>Template</li>
                        <li className='hover:bg-gray-200 text-[16px] font-semibold p-3 hidden md:block rounded-lg w-fit'>Marketplace</li>
                        <li className='hover:bg-gray-200 text-[16px] font-semibold p-3 hidden md:block rounded-lg w-fit'>Learn</li>
                        <li className='hover:bg-gray-200 text-[16px] font-semibold p-3 hidden md:block rounded-lg w-fit'>price</li>
                    </ul>
                </div>
                <div className='flex items-center gap-2'>
                    <button className='bg-gray-200 text-[16px] p-3 rounded-lg w-fit font-bold'>Log in</button>
                   
                </div>
            </nav>}
        </>
    )
}

export default Navbar
