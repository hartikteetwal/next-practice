"use client";

import React, { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { ShopContext } from "@/app/context/ShopContext";
import { useRouter } from "next/navigation";
import { OrderProduct } from "@/app/services/api";

const PlaceOrder = () => {
    const [form, setForm] = useState({
        name: "Hartik Teetwal",
        email: "teetwalhartik@gmail.com",
        phone: "7505693449",
        address: "muradnagar, ghaziabad",
        pincode: "201206",
        city: "GZB",
        state: "UP",
        country: "INDIA",
    });

    const router = useRouter();
    const [paymentMethod, setPaymentMethod] = useState("cod");
    const [loading, setLoading] = useState(false);
    const { getCartData, cartProducts, subtotal, deliveryFee, getOrder } = useContext(ShopContext);
    const total = subtotal + deliveryFee;

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleOrder = async () => {
        if (Object.values(form).some((value) => value === "")) {
            toast.error("Please fill all the fields.");
            return;
        }

        const orderData = {
            products: Object.values(cartProducts),
            address: form.address,
            city: form.city,
            state: form.state,
            pincode: form.pincode,
            price: total,
            origin: window.location.origin,
        };

        try {
            setLoading(true);
            let res;
            if (paymentMethod === "cod") {
                res = await OrderProduct(orderData)

                if (res.success) {
                    toast.success("Order placed successfully!");
                    getCartData();
                    getOrder();
                    router.push("/pages/Order");
                }

            } else if (paymentMethod === "stripe") {
                res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API}/order/stripe`, orderData, {
                    headers: {
                        'Content-Type': 'application/json',
                        token: localStorage.getItem('token'),
                    },
                });
                getCartData();
                getOrder()
                window.location.href = res.data.session_url;

            } else if (paymentMethod === "razorpay") {
                toast("Razorpay integration coming soon...");
            }

            setForm({
                name: "",
                email: "",
                phone: "",
                address: "",
                pincode: "",
                city: "",
                state: "",
                country: "",
            });
            setPaymentMethod("cod");
        } catch (error) {
            console.error("Order error:", error);
            toast.error("Failed to place order. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen  flex flex-col md:flex-row bg-white">
                {/* Left Section - Address Form */}
                <div className="w-full md:w-1/2 px-6 py-[100px] bg-gray-50">
                    <div className="max-w-xl mx-auto">
                        <h1 className="text-4xl font-bold text-[#016630] mb-8 text-center">
                            Place <span className="text-[#009966]">Order</span>
                        </h1>

                        <form className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required className="border p-3 rounded-md w-full" />
                                <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required className="border p-3 rounded-md w-full" />
                            </div>

                            <input type="tel" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} required className="border p-3 rounded-md w-full" />

                            <textarea name="address" placeholder="Shipping Address" value={form.address} onChange={handleChange} required rows="3" className="border p-3 rounded-md w-full" />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input type="text" name="pincode" placeholder="Pincode" value={form.pincode} onChange={handleChange} required className="border p-3 rounded-md w-full" />
                                <input type="text" name="city" placeholder="City" value={form.city} onChange={handleChange} required className="border p-3 rounded-md w-full" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input type="text" name="state" placeholder="State" value={form.state} onChange={handleChange} required className="border p-3 rounded-md w-full" />
                                <input type="text" name="country" placeholder="Country" value={form.country} onChange={handleChange} required className="border p-3 rounded-md w-full" />
                            </div>
                        </form>
                    </div>
                </div>

                {/* Right Section - Payment and Summary */}
                <div className="w-full md:w-1/2 bg-green-100 flex items-center justify-center p-10">
                    <div className="text-center space-y-6 w-full max-w-md">
                        <h3 className="text-2xl font-bold text-green-800">Select Payment Method</h3>
                        <form className="space-y-4 text-left">
                            {['cod', 'stripe', 'razorpay'].map((method) => (
                                <div key={method} className="flex items-center space-x-3 bg-white p-3 rounded-lg shadow-sm">
                                    <input
                                        type="radio"
                                        id={method}
                                        name="paymentMethod"
                                        value={method}
                                        className="accent-green-600"
                                        checked={paymentMethod === method}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                    />
                                    <label htmlFor={method} className="font-medium capitalize">
                                        {method === 'cod' ? 'Cash on Delivery' : method}
                                    </label>
                                </div>
                            ))}
                        </form>

                        <div className="mt-8 w-full p-4 bg-gray-100 rounded-lg shadow">
                            <h3 className="text-xl font-semibold mb-4">Billing Summary</h3>
                            <div className="flex justify-between mb-2">
                                <span>Subtotal</span>
                                <span>₹{subtotal}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Delivery Fee</span>
                                <span>₹{deliveryFee}</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg border-t pt-2">
                                <span>Total</span>
                                <span>₹{total}</span>
                            </div>
                            <button
                                onClick={handleOrder}
                                disabled={loading}
                                className="w-full bg-[#009966] text-white font-semibold py-2 rounded-lg mt-4 transition duration-300 disabled:opacity-60"
                            >
                                {loading ? "Placing Order..." : "Order"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default PlaceOrder;
