"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react'; // You can replace this with any icon librar
import { useClerk, UserButton } from '@clerk/nextjs';

const Navbar = () => {
    const pathname = usePathname();

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const { openSignIn, isSignedIn } = useClerk()

    const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);

    return (
        <>

            <nav className="md:w-[80vw] w-[90vw] rounded-full flex items-center justify-between md:mx-[10vw] mx-[5vw] fixed z-50 top-10 bg-white p-4 shadow-md">
                {/* Left Section */}
                <Link href={"/"} >
                    <div className="flex items-center gap-5">

                        <div className="text-[#254f1a] flex items-center">
                            <div className="font-bold text-2xl">LinkTree</div>
                            <img className="text-[#254f1a] w-7 ml-2" src="/logo.svg" alt="logo" />
                        </div>

                    </div>
                </Link>

                {/* Desktop Links */}
                <ul className="hidden md:flex items-center gap-5">
                    {['Product', 'Template', 'Marketplace', 'Learn', 'Price'].map((item, index) => (
                        <li key={index} className="hover:bg-gray-200 text-[16px] font-semibold p-3 rounded-lg w-fit cursor-pointer">
                            {item}
                        </li>
                    ))}
                </ul>

                {/* Mobile Hamburger */}
                <div className="md:hidden flex items-center">
                    <button onClick={toggleMobileMenu}>
                        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Right Section */}
                <div className="hidden md:flex items-center gap-2">
                    {isSignedIn ?

                        <UserButton />

                        :
                        <div className="flex items-center gap-2">
                            <button
                                onClick={openSignIn}
                                className="bg-gray-200 text-[16px] p-3 rounded-lg w-fit font-bold">Log in
                            </button>
                        </div>
                    }
                </div>

            </nav >

            {/* Mobile Menu Dropdown */}
            {
                isMobileMenuOpen && (
                    <div className="fixed top-24 left-0 w-full bg-white z-40 flex flex-col items-center gap-4 py-5 shadow-md md:hidden">
                        {['Product', 'Template', 'Marketplace', 'Learn', 'Price'].map((item, index) => (
                            <div key={index} className="text-[16px] font-semibold px-4 py-2 w-full text-center hover:bg-gray-100">
                                {item}
                            </div>
                        ))}
                        {isSignedIn ?
                            <UserButton />
                            :
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={openSignIn}
                                    className="bg-gray-200 text-[16px] p-3 rounded-lg w-fit font-bold">Log in
                                </button>
                            </div>

                        }
                    </div>
                )
            }
        </>
    );
};

export default Navbar;
