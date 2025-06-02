"use client"
import React from 'react'
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";

const ClientLayoutWrapper = ({ children }) => {
    const router = useRouter()
    const noNavbarRoutes = ['/[handel'];
    return (
        <div>
            {!noNavbarRoutes.includes(router.pathname) && <Navbar />}
            {children}
        </div>
    )
}

export default ClientLayoutWrapper
