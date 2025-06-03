"use client";
import dynamic from "next/dynamic";
import {  use } from "react";


const Profile = dynamic(() => import('./Profile'), { ssr: false });


export default function Page(props) {
    const params = use(props.params);
   

    return (
       <Profile params={params} />
    );
}     