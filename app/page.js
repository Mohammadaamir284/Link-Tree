"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Trash, Trash2, MoreVertical } from 'lucide-react';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import '@/components/style2.css'


export default function Home() {
  const router = useRouter()
  const [text, settext] = useState('')
  const [show, setshow] = useState([])
  const [search, setsearch] = useState("")
  const [hovered, setHovered] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchdata = async () => {
    const fetch_data = await fetch("/api/add/")
    const data = await fetch_data.json()
    setshow(data)
    console.log(data)
  }


  useEffect(() => {
    fetchdata()
  }, [])

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
      <section className="min-h-[100vh] grid grid-cols-2 bg-[#254f1a]">
        <div className="flex flex-col justify-end mb-10 ml-[10vw] gap-3">
          <div>
            <p className="text-yellow-300 text-7xl font-bold">Everything you </p>
            <p className="text-yellow-300 text-7xl font-bold">are. In one, </p>
            <p className="text-yellow-300 text-7xl font-bold">simple link in </p>
            <p className="text-yellow-300 text-7xl font-bold">bio.</p>
          </div>
          <p className="text-white break-words text-[20px] font-bold">Join 70M+ people using Linktree for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.</p>
          <div>
            <input
              value={text}
              onChange={(e) => settext(e.target.value)}
              className="p-3 bg-white rounded-lg mr-2 border" type="text" placeholder="linktr.ee/" />

            <button
              onClick={() => createhandel()}
              className='bg-[#e9c0e9] text-[16px] cursor-pointer p-3 rounded-full w-fit font-semibold'>Claim Your LinkTree</button>
          </div>
        </div>
        <div className="flex items-center flex-col justify-end mb-14 mr-[10vw]">
          <div>
            <img className="w-[50vw]  " src="/home.png" alt="" />
          </div>
        </div>
      </section>
      <section className="min-h-[100vh] grid grid-cols-2 bg-[#e9c0e9]">

        <div className="relative w-full h-64 md:h-96 ">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slide ${index}`}
              className={`absolute left-9 top-24 rounded-xl w-[35vw] h-full object-cover transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'
                }`}
            />
          ))}
        </div>
        <div className='flex flex-col justify-center gap-6' >
          <div>
            <p className='font-bold text-6xl text-[#502274]'>Create and </p>
            <p className='font-bold text-6xl text-[#502274]'>customize your </p>
            <p className='font-bold text-6xl text-[#502274]'>Linktree in minutes</p>
          </div>
          <div>
            <p className='font-semibold mr-[5vw]'>Connect your TikTok, Instagram, Twitter, website, store, videos, music, podcast, events and more. It all comes together in a link in bio landing page designed to convert.</p>
          </div>
          <Link href={'/links'}> <button className='bg-[#502274] text-white px-8 text-[16px] cursor-pointer p-4 rounded-full w-fit font-semibold'>Get Started For Free</button></Link>
        </div>
        <ToastContainer />
      </section>

      <section className="min-h-[115vh] bg-[#780016]">

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
                  <Link href={`/${item.handel}`}>   <li className=' my-2 '>
                    @_{item.handel}
                  </li></Link>
                  <div className="relative group inline-block">
                    {/* Three dots icon */}
                    <MoreVertical className="w-6 h-6 cursor-pointer" />

                    {/* Menu shown on hover */}
                    <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
                      <ul className="text-sm text-gray-700">

                        <li onClick={() => del(item, item.handel)} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Delete</li>

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

        <div className="group inline-block relative w-fit">
          <button className="bg-blue-500 text-white p-2 rounded">Hover Me</button>
          <div className="opacity-0  invisible  group-hover:opacity-100 group-hover:visible absolute bg-black text-white p-2 rounded mt-1">
             text hover
          </div>
        </div>

      </section>

     
    </>
  );
}
