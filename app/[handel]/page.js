"use client";
import Link from "next/link";
import './style.css';
import { useState, useEffect, use } from "react";
import { notFound } from "next/navigation";

export default function Page(props) {
    const params = use(props.params);
    const [link2, setlink] = useState(undefined);

    const fetchData = async () => {
        const res = await fetch("/api/add/");
        const data = await res.json();
        const user = data.find(item => item.handel === params.handel);

        if (!user) {
            setlink("notfound");
        } else {
            setlink(user);
        }
    };

    useEffect(() => {
        fetchData();
    }, [params.handel]);

    if (link2 === "notfound") return notFound();

    return (
        <div className="bg-[#1e2330] min-h-screen flex flex-col">

            {/* Nav */}
            <Link href={'/'}>
                <nav className="w-fit fixed left-4 top-4 z-50 bg-amber-800 p-3 rounded-full">
                    <div className="flex items-center space-x-2">
                        <div className="text-white text-xl font-bold">LinkTree</div>
                        <img className="w-6 h-6" src="/logo.svg" alt="logo" />
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
                                            src={link2.pic}
                                            alt="User"
                                            className="w-24 h-24 rounded-full object-cover bg-amber-800"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = "/default-user.svg";
                                            }}
                                        />
                                    </div>
                                    <div className="text-xl md:text-2xl font-semibold text-center">{link2.handel.toUpperCase()}</div>
                                    <div className="text-sm md:text-base text-white text-center max-h-20 overflow-y-auto px-2 scrollbar-hide">
                                        {link2.dsc}
                                    </div>
                                </div>

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
                            </>
                        ) : (
                            <div className="text-white text-lg">Loading...</div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}
