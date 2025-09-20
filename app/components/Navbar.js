"use client";
import React, { useState } from 'react'
import Link from 'next/link'


const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="fixed inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-md border border-gray-100 bg-white/80 py-3 shadow backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg">
            <div className="px-4">
                <div className="flex items-center justify-between">
                    <div className="flex ">
                        <Link aria-current="page" className="flex items-center" href="/">
                            <img className="h-13 w-auto" src="/favicon.ico" alt="Logo" width={32} height={32} />
                            <span className=" text-xl font-bold text-gray-900">LegalDoc</span>
                        </Link>
                    </div>
                    {/* Desktop Links */}
                    <div className="hidden md:flex md:items-center md:justify-center md:gap-5">

                        <Link className="rounded-lg px-2 py-1 text-l font-medium text-gray-900 transition-all duration-200 hover:bg-[#1C352D] hover:text-gray-100"
                            href="/usecase">Use Case</Link>
                        <Link className="rounded-lg px-2 py-1 text-l font-medium text-gray-900 transition-all duration-200 hover:bg-[#1C352D] hover:text-gray-100"
                            href="/analyze">Analyze</Link>
                        <Link className="rounded-lg px-2 py-1 text-l font-medium text-gray-900 transition-all duration-200 hover:bg-[#1C352D] hover:text-gray-100"
                            href="/agents">Agents</Link>
                    </div>
                    {/* Hamburger Icon */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-200 focus:outline-none"
                            aria-label="Toggle menu"
                        >
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {menuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                    {/* Auth Buttons */}
                    <div className="hidden md:flex items-center justify-end gap-3">
                        
                        <Link className="inline-flex items-center justify-center rounded-xl bg-[#234439] px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-[#172c25] focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                            href="/login">Sign-in / Login</Link>
                    </div>
                </div>
                {menuOpen && (
                    <div className="md:hidden mt-3 space-y-2 p-3 border-2 border-gray-800">
                        <Link className="block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 hover:bg-[#1C352D]  hover:text-white" href="#">Use-case</Link>
                        <Link className="block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 hover:bg-[#1C352D] hover:text-white" href="#">scan</Link>
                        <Link className="block rounded-lg px-2 py-1 text-sm font-medium text-white bg-gray-800 hover:bg-[#1C352D]" href="/login">Sign-up/Login</Link>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Navbar