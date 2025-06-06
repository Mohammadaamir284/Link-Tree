"use client";
import Link from "next/link";
import './style.css';
import { useState, useEffect, use } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import "./Loading.css"

const Profile = ({ params }) => {

    const handel = params.handel;
    const [link2, setlink] = useState(undefined);
    const [checking, setChecking] = useState(true);
    const { user, isLoaded } = useUser();
    const userId = user?.id



    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`/api/add/handel?handel=${params.handel}`);
            const data = await res.json();

            if (data && data.length > 0) {
                setlink(data[0]);
            } else {
                setlink(null); // not found
            }
            setChecking(false);
        };

        fetchData();
    }, [params.handel]);


    if (!checking && link2 === null) {
        notFound();
    }

    return (<>

        <div className="bg-[#1e2330] min-h-screen flex flex-col">

            {/* Nav */}
            <Link href={'/'}>
                <nav className="w-fit fixed left-4 top-4 z-50 bg-amber-800 p-3 rounded-full">
                    <div className="flex items-center space-x-2">
                        <div className="text-white text-xl font-bold">LinkTree</div>
                        <Image
                            className="w-6 h-6"
                            src="/logo.svg"
                            alt="logo"
                            width={24}      // px me width
                            height={24}     // px me height
                            priority        // agar turant load chahiye to
                        />
                    </div>
                </nav>
            </Link>


            {/* Main Card Section */}
            <div className="flex-1 flex justify-center items-end p-2 pt-16">
                <div className="w-full max-w-md h-[90vh] rounded-t-2xl bg-black p-4 flex justify-center items-center">
                    <div className="w-full h-full overflow-hidden flex flex-col items-center rounded-2xl p-4 bg-amber-800 border-4 border-black shadow-[0_1px_20px_#dfe5e7]">

                        {link2 ? (
                            <>
                                {/* Profile Info */}
                                <div className="flex flex-col items-center mt-2 space-y-3">
                                    <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center border-2">
                                        <img
                                            src={link2?.pic?.trim() ? link2.pic : "/default-user.svg"}
                                            alt="User"
                                            className="w-24 h-24 rounded-full object-cover   bg-amber-800"
                                            onError={(e) => {
                                                e.currentTarget.onerror = null; // prevent infinite loop
                                                e.currentTarget.src = "/default-user.svg";
                                            }}
                                        />
                                    </div>
                                    <div className="text-xl md:text-2xl font-semibold text-center capitalize"> {link2?.handel}</div>
                                    <div className="text-sm md:text-base text-white text-center max-h-20 overflow-y-auto px-2 scrollbar-hide">
                                        {link2.dsc}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="text-2xl font-semibold text-white">Loading...</div>

                        )}

                        {/* Links */}
                        <div className="mt-4 w-full flex-1 overflow-y-auto scrollbar-hide">
                            {link2?.links?.map((item, index) => (
                                <Link key={index} href={item.link} target="_blank">
                                    <button className="w-full bg-white text-black text-base md:text-lg font-medium rounded-lg py-2 my-2 shadow-md hover:bg-gray-200 transition">
                                        {item.linktext}
                                    </button>
                                </Link>
                            ))}
                        </div>


                    </div>
                </div>
            </div>

        </div>

    </>)
}

export default Profile