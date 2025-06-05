"use client"
import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { ToastContainer, toast } from 'react-toastify';
import { useUser } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import 'react-toastify/dist/ReactToastify.css';

const Linkpage = () => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const { user, isSignedIn } = useUser()
    const [handel, sethandel] = useState(searchParams.get('handel') || "")
    const [links, setlinks] = useState([{ linktext: "", link: "" }])
    const [dsc, setdsc] = useState("")
    const [Choose, setChoose] = useState(false)
    const [pic, setPic] = useState("");         // Base64 ya URL
    const [mode, setMode] = useState("file");    // "url" ya "file"

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => setPic(reader.result); // Base64 set
        reader.readAsDataURL(file);
    };
    const handelchange = (index, field, value) => {
        setlinks(prev =>
            prev.map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            )
        );
    };
    const addlink = () => {
        setlinks([...links, { linktext: "", link: "" }])
    }
    const submitlinks = async () => {
        if (!isSignedIn) {
            toast.error("LogIn please");
            return;
        }
        if (
            !handel.trim() ||
            links.some((link) => !link.link.trim() || !link.linktext.trim())
        ) {
            toast.error("Please fill all fields properly");
            return;
        }
        const payload = {
            handel,
            links,
            dsc,
            pic,
            userId: user?.id,
        };
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload), // ✅ only one stringify
        };
        try {
            const res = await fetch("/api/add/add2", requestOptions);
            const result = await res.json(); // 🔒 may still want try/catch here
            if (result.success) {
                toast.success(result.message);
                sethandel("");
                setlinks([{ linktext: "", link: "" }]);
                setPic("");
                setdsc("");
                router.push(`/${handel.toLowerCase()}`);
            } else {
                toast.error(result.message);
                sethandel("");
            }
        } catch (err) {
            toast.error("Something went wrong!");
            console.error("submitlinks error:", err);
        }
    };


    return (
        <>
            <Navbar className="z-50" />
            <div className='min-h-screen text-gray-900 bg-[#225ac0] grid grid-cols-1 md:grid-cols-2'>
                {/* Left Form Section */}
                <div className='flex flex-col justify-center md:mt-0 mt-16 md:ml-[8vw] px-4 py-6'>
                    <h1 className='font-bold text-4xl mb-6 text-white'>Create Your Link Tree</h1>
                    {/* Step 1 */}
                    <div className='mb-6'>
                        <div className='font-semibold text-xl mb-2 text-white'>Step 1: Choose Your Handle</div>
                        <input
                            value={handel}
                            onChange={e => sethandel(e.target.value.toLowerCase())}
                            className="px-4 py-2 w-full bg-white rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-400"
                            type="text"
                            placeholder="Enter your Profile Name"
                        />
                    </div>
                    {/* Step 2 */}
                    <div className='mb-6'>
                        <div className='font-semibold text-xl mb-2 text-white'>Step 2: Add Links</div>
                        <div className="space-y-3 max-h-[180px] overflow-y-auto scrollbar-hide pr-1">
                            {links.map((item, index) => (
                                <div key={index}>
                                    <input
                                        value={item.linktext}
                                        onChange={e => handelchange(index, "linktext", e.target.value)}
                                        className="px-4 py-2 w-full bg-white rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2"
                                        type="text"
                                        placeholder="Enter link name"
                                    />
                                    <input
                                        value={item.link}
                                        onChange={e => handelchange(index, "link", e.target.value)}
                                        className="px-4 py-2 w-full bg-white rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        type="text"
                                        placeholder="Enter URL"
                                    />
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={addlink}
                            className='mt-3 px-4 py-2 bg-slate-900 text-white rounded-full font-medium hover:bg-slate-800 transition'
                        >
                            + Add Link
                        </button>
                    </div>
                    {/* Step 3 */}
                    <div>
                        <div className='font-semibold text-xl mb-2 text-white'>Step 3: Profile Pic & Bio</div>
                        <input
                            value={dsc}
                            onChange={e => setdsc(e.target.value)}
                            className="px-4 py-2 w-full bg-white rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-400 mb-3"
                            type="text"
                            placeholder="Enter Your Bio"
                        />
                        {/* URL Input */}
                        <div className="space-y-4 mb-2">
                            {/* Option Toggle Button */}
                            <div className="flex gap-2">
                                <button
                                    onClick={() => { setMode("file"); }}
                                    className={`px-4 py-1 rounded-full font-semibold ${mode === "file" ? "bg-blue-600 text-white" : "bg-white border"}`}>
                                    Upload File
                                </button>
                                <button
                                    onClick={() => { setMode("url"); }}
                                    className={`px-4 py-1 rounded-full font-semibold ${mode === "url" ? "bg-blue-600 text-white" : "bg-white border"}`}>
                                    Use URL
                                </button>
                            </div>
                            {/* Conditional Inputs */}
                            {mode === "file" ? (
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="px-4 py-2 w-full bg-white rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            ) : (
                                <input
                                    value={pic ?? ""}
                                    onChange={(e) => setPic(e.target.value)}
                                    type="text"
                                    placeholder="Enter image URL"
                                    className="px-4 py-2 w-full bg-white rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            )}
                            {/* Preview */}
                            {pic && (
                                <img
                                    src={pic}
                                    alt="Preview"
                                    className="mt-4 rounded-lg w-40 h-40 object-cover border" />
                            )}
                        </div>

                        <button
                            onClick={submitlinks}
                            className='px-5 py-2 bg-slate-900 text-white rounded-full font-semibold hover:bg-slate-800 transition'>
                            Upload
                        </button>
                    </div>
                </div>
                {/* Right Image Section */}
                <div className='hidden md:flex items-center justify-center p-4'>
                    <img className='max-w-full h-auto object-contain' src="/likn.png" alt="illustration" />
                </div>

                <ToastContainer />
            </div>
        </>
    )
}

export default Linkpage
