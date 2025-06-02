"use client"
import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const page = () => {

    const searchParams = useSearchParams()

    const [handel, sethandel] = useState(searchParams.get('handel'))
    const [links, setlinks] = useState([{ linktext: "", link: "" }])
    const [pic, setpic] = useState("")
    const [dsc, setdsc] = useState("")
    // const [link, setlink] = useState("")
    // const [linktext, setlinktext] = useState("")

    const handelchange = (index, field, value) => {
        setlinks(prev =>
            prev.map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            )
        );
    };

    const addlink = () => {
        setlinks(links.concat([{ linktext: "", link: "" }]))
    }



    const submitlinks = async () => {
        if (!handel.trim() || !dsc.trim() || links.some(link => !link.link.trim() || !link.linktext.trim())) {
            toast.error("Error")
            return;
        }
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "handel": handel,
            "links": links,
            "dsc": dsc,
            "pic": pic

        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        let r = await fetch("/api/add", requestOptions)
        let result = await r.json()
     
        if(result.success){

            toast.success(result.message)
            sethandel("")
            setlinks([{ linktext: "", link: "" }])
            setpic("")
            setdsc("")
        }
        else{
            toast.error(result.message)
            sethandel("")
            
        }

    }


    return (

        <>
            <div className='h-screen text-gray-900 bg-[#225ac0] grid grid-cols-2'>
                <div className='flex flex-col justify-end  ml-[10vw]'>
            <ToastContainer />
                    <div><h1 className='font-bold text-4xl  mb-3'>Create Your Link Tree</h1></div>
                    <div>
                        <div className='font-semibold text-2xl'>Step 1: Choose Your Handel</div>
                        <input
                            value={handel || ""}
                            onChange={e => { sethandel(e.target.value) }}
                            className="px-3 py-2 focus:outline-[#225ac0] bg-white rounded-full my-2.5 mr-2 border"
                            type="text"
                            placeholder="Enter your Profile Name" />
                    </div>
                    <div className=''>
                        <div className='font-semibold text-2xl'>Step 2: Add links</div>

                        <div className="overflow-y-scroll  h-20">
                            {links && links.map((item, index) => {
                                return <div key={index} className=''>

                                    <input
                                        value={item.linktext}
                                        onChange={e => handelchange(index, "linktext", e.target.value)}
                                        className="px-3 py-2  focus:outline-[#225ac0] bg-white rounded-full my-2.5 mr-2 border"
                                        type="text"
                                        placeholder="Enter you link" />

                                    <input
                                        value={item.link}
                                        onChange={e => handelchange(index, "link", e.target.value)}
                                        className="px-3 py-2  focus:outline-[#225ac0] bg-white rounded-full my-2.5 mr-2 border"
                                        type="text"
                                        placeholder="Enter your URL" />
                                </div>

                            })}
                        </div>

                        <button
                            onClick={() => addlink()}
                            className='bg-slate-900 text-white text-[16px] cursor-pointer px-3 py-2 mt-2.5 mb-3.5  rounded-full w-fit font-semibold'>+ Add</button>
                    </div>
                    <div>
                        <div className='font-semibold text-2xl'>Step 3: Choose Profile pic</div>
                        <div className='flex flex-col'>
                            <input
                                value={dsc}
                                onChange={e => { setdsc(e.target.value) }}
                                className="px-3 py-2 focus:outline-[#225ac0] bg-white rounded-full my-2.5 mr-2 border"
                                type="text"
                                placeholder="Enter Your Bio" />

                            <input
                                value={pic}
                                onChange={e => { setpic(e.target.value) }}
                                className="px-3 py-2 focus:outline-[#225ac0] bg-white rounded-full my-2.5 mr-2 border"
                                type="text"
                                placeholder="Profile pic" />
                            <button
                                onClick={submitlinks}
                                className='bg-slate-900 text-white text-[16px] cursor-pointer px-3 py-2 mt-2.5 mb-3.5  rounded-full w-fit font-semibold'>Uplode</button>
                        </div>

                    </div>

                </div>

                <div className=''>
                    <img className='h-[100vh] w-[100vw] object-contain' src="/likn.png" alt="bwd" />
                </div>

            </div>
        </>
    )
}

export default page
