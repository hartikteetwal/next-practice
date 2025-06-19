'use client'
import React, { useState, useRef, useEffect, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaLeaf, FaUserCircle } from "react-icons/fa";
import { FiMenu, FiX, FiShoppingCart } from "react-icons/fi";
import { ShopContext } from "@/app/context/ShopContext";
import { getToken } from "@/app/utils/auth";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const { setToken, cartData } = useContext(ShopContext);
    const profileRef = useRef(null);
    const router = useRouter();
    const [totalItems, setTotalItems] = useState(0);

    const toggleMenu = () => setIsOpen(!isOpen);
    const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setToken("");
        getToken()
        router.push("/pages/Login");
    };

    useEffect(() => {
        setTotalItems(Object.values(cartData || {}).reduce((acc, curr) => acc + curr.quantity, 0));
    }, [cartData]);

    return (
        <nav className="bg-white shadow-md fixed top-0 w-full z-50">
            <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0 text-2xl font-bold text-emerald-600 hidden md:flex items-center gap-2">
                        <FaLeaf className="text-lime-400" />
                        EcoWear
                    </Link>
                    <Link href="/" className="flex-shrink-0 text-2xl font-bold text-emerald-600 md:hidden flex items-center gap-2">
                        <FaLeaf className="text-lime-400" />
                        EW
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-6 items-center">
                        <Link href="/" className="text-gray-700 hover:text-emerald-600 transition">Home</Link>
                        <Link href="/pages/Collection" className="text-gray-700 hover:text-emerald-600 transition">Collection</Link>
                        <Link href="/pages/Cart" className="relative text-gray-700 hover:text-emerald-600 transition flex items-center gap-1">
                            <FiShoppingCart className="text-xl" />
                            Cart
                            {totalItems > 0 && (
                                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center">
                                    {totalItems}
                                </span>
                            )}
                        </Link>
                        <Link href="/pages/About" className="text-gray-700 hover:text-emerald-600 transition">About</Link>

                        {/* Profile Dropdown */}
                        <div className="relative" ref={profileRef}>
                            <button
                                onClick={toggleProfile}
                                className="flex items-center gap-1 text-gray-700 hover:text-emerald-600 transition focus:outline-none"
                            >
                                <FaUserCircle className="text-xl" />
                            </button>

                            {isProfileOpen && (
                                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-10">
                                    <button
                                        onClick={() => {
                                            router.push("/pages/Order");
                                            setIsProfileOpen(false);
                                        }}
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                                    >
                                        Order
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button onClick={toggleMenu} className="text-gray-700 focus:outline-none text-2xl">
                            {isOpen ? <FiX /> : <FiMenu />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white px-4 pb-4 shadow-md">
                    <Link href="/" className="block py-2 text-gray-700 hover:text-emerald-600 px-4" onClick={() => setIsOpen(false)}>Home</Link>
                    <Link href="/pages/Collection" className="block py-2 text-gray-700 hover:text-emerald-600 px-4" onClick={() => setIsOpen(false)}>Collection</Link>
                    <Link href="/pages/Order" className="block py-2 text-gray-700 hover:text-emerald-600 px-4" onClick={() => setIsOpen(false)}>Order</Link>
                    <Link href="/pages/Cart" className="block py-2 text-gray-700 hover:text-emerald-600 px-4" onClick={() => setIsOpen(false)}>Cart</Link>
                    <Link href="/pages/About" className="block py-2 text-gray-700 hover:text-emerald-600 px-4" onClick={() => setIsOpen(false)}>About</Link>
                    <div className="block py-2 text-gray-700 hover:text-emerald-600 px-4">
                        <button onClick={handleLogout} className="block w-full text-left hover:bg-gray-100 text-gray-700">Logout</button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
