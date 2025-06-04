"use client";
import dynamic from "next/dynamic";
import { use, useState, useEffect } from "react";
import Image from "next/image";

const Profile = dynamic(() => import('./Profile'), { ssr: false });


export default function Page(props) {

    const [loaded, setloaded] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setloaded(true)
        }, 4000);

        return () => clearInterval(timer)

    }, [loaded])


    const params = use(props.params);


    return (<>
        {loaded ?
            (<Profile params={params} />)
            :
            (<div className="loader-container">
                <div className="typing-animation">LinkTree</div>
                <Image
                    className="loader-logo w-12 h-12"
                    src="/logo.svg"
                    alt="logo"
                    width={48}
                    height={48}
                    priority
                />
            </div>)
        }

    </>);
}     