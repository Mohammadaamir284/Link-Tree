"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Trash, Trash2, MoreVertical } from 'lucide-react';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import '@/components/style2.css'

const Reviews = () => {
    const router = useRouter()
    const [open, setopen] = useState(null)
    const [text, settext] = useState('')
    const [show, setshow] = useState([])
    const [search, setsearch] = useState("")
    const [hovered, setHovered] = useState(null)
    const [currentIndex, setCurrentIndex] = useState(0);
    const { user, isSignedIn } = useUser()

    const userId = user?.id
    useEffect(() => {
        if (!userId) return;
        const fetchdata = async () => {
            const fetch_data = await fetch(`/api/add?userId=${userId}`)
            const data = await fetch_data.json()
            const arrayData = Array.isArray(data) ? data : data.data || [];
            setshow(arrayData);
           
        }
        fetchdata()
    }, [userId])


    const filtered = show.filter((item) =>
        item.handel?.toLowerCase().includes(search.toLowerCase())
    );


    const del = async (item) => {
        let c = confirm("Do You Really Want To Delete This?")
        if (c) {
            toast.success(`@_${item.handel} is Delete`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",

            });
            const res1 = await fetch("/api/add/", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ _id: item._id })
            });
            if (!res1.ok) throw new Error('Delete failed');


            setshow(show => show.filter(show => show._id !== item._id))
        }
    }


    const createhandel = () => {
        router.push(`/links?handel=${text}`)
    }

    const images = [
        '/download.png',
        '/download (2).png',
        '/download (3).png',
        '/download (1).png',
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000);

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <>
            <section className="md:min-h-[100vh] h-[120vh] w-[100vw] grid grid-cols-1 md:grid-cols-2 bg-[#254f1a]">
                <div className="flex flex-col justify-end md:mb-10 md:ml-[10vw] m-4 gap-3">
                    <div className=' '>
                        <p className="text-yellow-300 md:text-7xl text-[37px] font-bold">Everything you </p>
                        <p className="text-yellow-300 md:text-7xl text-[37px] font-bold">are. In one, </p>
                        <p className="text-yellow-300 md:text-7xl text-[37px] font-bold">simple link in </p>
                        <p className="text-yellow-300 md:text-7xl text-[37px] font-bold">bio.</p>
                    </div>
                    <p className="text-white break-words md:text-[20px] text-[14px] font-bold">Join 70M+ people using Linktree for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.</p>
                    <div className='flex flex-col gap-2'>
                        <input
                            value={text}
                            onChange={(e) => settext(e.target.value)}
                            className="p-3 bg-white md:w-50 w-full rounded-lg mr-2 border" type="text" placeholder="linktr.ee/" />

                        <button
                            onClick={() => createhandel()}
                            className='bg-[#e9c0e9] text-[16px] cursor-pointer p-3 rounded-full w-fit font-semibold'>Claim Your LinkTree</button>
                    </div>
                </div>
                <div className="flex items-center justify-end md:mb-14 md:mr-[10vw]">
                    <div>
                        <Image
                            className="md:w-[50vw]"
                            src="/home.png"
                            alt="Home Image"
                            width={800}
                            height={600}
                            loading="lazy"
                        />
                    </div>
                </div>
            </section>
            <section className="min-h-[100vh] w-[100vw] grid grid-cols-1 md:grid-cols-2 bg-[#e9c0e9]">

                <div className="relative w-full h-64 md:h-96 ">
                    {images.map((image, index) => (
                        <Image
                            key={index}
                            src={image}
                            alt={`Slide ${index}`}
                            width={800}               // apne hisaab se set karo
                            height={600}              // apne image ratio ke hisaab se
                            loading="lazy"
                            className={`absolute md:left-9 pl-9 top-10 md:top-24 rounded-xl md:w-[35vw] md:h-full w-full object-cover transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'
                                }`}
                        />
                    ))}
                </div>
                <div className='flex flex-col justify-center gap-6 mx-4' >
                    <div>
                        <p className='font-bold md:text-6xl text-4xl text-[#502274]'>Create and </p>
                        <p className='font-bold md:text-6xl text-4xl text-[#502274]'>customize your </p>
                        <p className='font-bold md:text-6xl text-4xl text-[#502274]'>Linktree in minutes</p>
                    </div>
                    <div>
                        <p className='font-semibold mr-[5vw]'>Connect your TikTok, Instagram, Twitter, website, store, videos, music, podcast, events and more. It all comes together in a link in bio landing page designed to convert.</p>
                    </div>
                    <Link href={'/links'}> <button className='bg-[#502274] text-white px-8 text-[16px] cursor-pointer p-4 rounded-full w-fit font-semibold'>Get Started For Free</button></Link>
                </div>
                <ToastContainer />
            </section>

            <section className="min-h-[115vh] w-[100vw] bg-[#780016]">

                <div className='px-5 py-6'>

                    <div className="text-2xl text-white font-bold pb-3">Search Your LinkTree Profiles</div>

                </div>

                <div className="p-6">
                    <input

                        type="text"
                        placeholder="Search Your LinkTree Profiles"
                        value={search}
                        onChange={(e) => setsearch(e.target.value)}
                        className="p-2 border rounded bg-emerald-200 mb-4 w-full"
                    />

                    <ul className=' h-[70vh] overflow-y-scroll scrollbar-hide'>
                        {filtered.length > 0 ? (
                            filtered.map((item, index) => (
                                <div key={index} className=' flex justify-between items-center p-2 bg-gray-200 my-2 rounded '>
                                    <Link href={`/${item.handel.toLowerCase()}`}>   <li className=' my-2 capitalize'>
                                        {item.handel}
                                    </li></Link>
                                    <div className="relative inline-block">
                                        <MoreVertical
                                            onClick={() => setopen(open === index ? null : index)}
                                            className="w-6 h-6 cursor-pointer"
                                        />

                                        <div className={`absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-md transition-all duration-300 z-10 
                      ${open === index ? "" : "hidden"}`}>
                                            <ul className="text-sm text-gray-700">
                                                <li
                                                    onClick={() => del(item, item.handel)}
                                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                >
                                                    Delete
                                                </li>
                                            </ul>
                                        </div>


                                    </div>
                                </div>
                            ))
                        ) : (
                            <li className="text-gray-500">No results found.</li>
                        )}
                    </ul>
                </div>

            </section>


        </>
    );
}

export default Reviews