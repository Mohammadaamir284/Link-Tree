"use client"
import Link from "next/link"
import './style.css'
import { useState, useEffect, use } from "react";
import { notFound } from "next/navigation";


export default function Page(props) {
    const params = use(props.params);
    const [link2, setlink] = useState(undefined)

    const fetchData = async () => {
        const res = await fetch("/api/add/");
        const data = await res.json();
        const user = data.find(item => item.handel === params.handel);

        if (!user) {
            setlink("notfound"); // custom flag
        } else {
            setlink(user);
        }


    };


    useEffect(() => {

        fetchData();

    }, [params.handel])

    if (link2 === "notfound") return notFound()


    //const { handel } = await params
    return <>


        <div className="bg-[#1e2330] h-screen flex  items-end">

            <Link href={'/'}>
                <nav className='w-fit rounded-full    fixed  left-6 z-50  md:top-10 top-0 mt-3 bg-amber-800 p-4'>
                    <div className='flex items- gap-7 '>
                        <div className='text-white flex items-center'>
                            <div className='font-bold text-2xl'>LinkTree</div>
                            <img className='text-[#254f1a] w-7' src="/logo.svg" alt="" />
                        </div>
                    </div>
                </nav>
            </Link>

            <div className="bg-black w-full flex justify-center pt-5 rounded-t-2xl p-4 h-[90vh]">

                <div className="h-[85vh] border-black  flex flex-col items-center md:w-[25vw] w-[90vw] rounded-2xl p-2 bg-amber-800 border-4 shadow-[0_1px_20px_#dfe5e7] ">


                    {link2 ? (<> <div className="flex flex-col items-center mt-1 space-y-2.5">
                        <div className=" border-2 w-26 p-[2px] bg-white text-center h-26 rounded-full" >
                            <img className=" w-24 h-24 p-[1px] bg-amber-800   border rounded-full object-center" src={link2.pic} alt="IMAGE"
                                onError={(e) => {
                                    e.target.onerror = null; // infinite loop se bachaata hai
                                    e.target.src = "/default-user.svg"; // fallback image path (public folder me hona chahiye)
                                }}
                            />
                        </div>
                        <div className="text-2xl font-semibold">@_{link2.handel}</div>
                        <div className="px-1 text-center text-white  w-[23vw] h-fit overflow-y-scroll scrollbar-hide">
                            {link2.dsc}
                        </div>
                    </div>

                        <div className="mt-5  md:w-[22vw] w-[80vw] overflow-y-scroll scrollbar-hide  flex flex-col items-center">
                            {link2?.links?.map((item, index) => (
                                <Link key={index} target="_blank" href={item.link}>  <button className=" py-1 text-[20px] bg-white shadow-2xl rounded-lg md:w-[19vw] w-full my-2.5">{item.linktext}</button></Link>
                            ))}
                        </div>
                    </>)


                        : (
                            <div className="text-white">Loading...</div>
                        )}

                </div>
            </div>

        </div>

    </>
}