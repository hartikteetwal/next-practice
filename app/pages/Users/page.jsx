"use client";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import SkeletonPage from "@/app/components/SkeletonPage";
import Spinner from "@/app/components/PageLoader";
import React, { useContext, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { ShopContext } from "@/app/context/ShopContext";
import { GetProductById } from "@/app/services/api";
import DotSpinner from "@/app/components/DotSpinner";

const Users = () => {
    const { users, token, role, UserLoader } = useContext(ShopContext);
    const [expandedUserId, setExpandedUserId] = useState(null); // Only one ID at a time
    const [cartProducts, setCartProducts] = useState([])
    const [loading, setLoading] = useState(false)

    const toggleExpand = (user) => {
        setCartProducts([])
        setExpandedUserId(prevId => (prevId === user._id ? null : user._id));
        console.log("cartData", user.cartData)
        fetchCartProducts(user?.cartData)
    };

    if (!token && !role) {
        return (
            <div className="min-h-screen">
                <SkeletonPage />
            </div>
        );
    }

    const fetchCartProducts = async (cartData) => {
        const productList = [];
        setLoading(true)

        for (const productId in cartData) {
            try {
                const res = await GetProductById(productId);
                if (res.success) {
                    const productInfo = res.products;
                    productList.push({
                        ...productInfo,
                        quantity: cartData[productId].quantity,
                    });
                }
            } catch (err) {
                console.error("Error fetching product:", err);
            }
        }
        setLoading(false)

        setCartProducts(productList);
    };

    return (
        <>
            <Navbar />
            {UserLoader && <Spinner />}
            <section className="py-[100px] px-2 bg-gray-50 min-h-screen">
                <h1 className="text-3xl font-bold text-center mb-8 text-green-700">All <span className="text-[#009966]">Users</span></h1>

                <div className="padding-both">
                    {users?.length > 0 ? (
                        users.map((user) => {
                            const isExpanded = expandedUserId === user._id;
                            return (
                                <div
                                    key={user._id}
                                    className="bg-white shadow-lg rounded-xl p-6 space-y-4 border border-green-200 mb-6"
                                >
                                    {/* Basic Info Header with Toggle */}
                                    <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleExpand(user)}>
                                        <div className="text-left text-gray-700">
                                            <p><strong>Name:</strong> {user.name}</p>
                                            <p><strong>Email:</strong> {user.email}</p>
                                            <p><strong>Cart Items:</strong> {Object.keys(user?.cartData || {}).length}</p>
                                        </div>
                                        <div className="text-right">
                                            {isExpanded ? (
                                                <FaMinus className="text-xl text-green-600" />
                                            ) : (
                                                <FaPlus className="text-xl text-green-600" />
                                            )}
                                        </div>
                                    </div>

                                    {/* Expanded Cart Details */}
                                    {isExpanded && Object.keys(user?.cartData || {}).length > 0 && (
                                        <div>
                                            <h3 className="text-lg font-semibold mb-3 border-b pb-1 text-green-700">Cart Details:</h3>
                                            <ul className="space-y-4">
                                                {
                                                    loading&&<DotSpinner/>
                                                }
                                                {cartProducts.map((product) => (
                                                    <li
                                                        key={product._id}
                                                        className="flex gap-4 items-center border p-3 rounded-md"
                                                    >
                                                        <img
                                                            src={product.productImage}
                                                            alt={product.productName}
                                                            className="w-20 h-20 object-cover rounded-md border"
                                                        />
                                                        <div className="flex-1">
                                                            <h4 className="font-semibold">{product.productName}</h4>
                                                            <p className="text-sm text-gray-500">{product.description}</p>
                                                            <p className="text-sm">Category: {product.category}</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p>₹{product.price} x {product.quantity}</p>
                                                            <p className="font-semibold">₹{product.price * product.quantity}</p>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    ) : (
                        <p className="w-full bg-[#009966] text-white text-center py-3 rounded-md shadow-md">
                            No users found.
                        </p>
                    )}
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Users;
