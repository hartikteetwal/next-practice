'use client'
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import { ShopContext } from "@/app/context/ShopContext";
import { AddToCart, DeleteFromCart } from "@/app/services/api";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

const Cart = () => {
    const { cartData, getCartData, subtotal, deliveryFee, setSubtotal, cartProducts, setCartProducts } = useContext(ShopContext); // Make sure `setCartData` exists in context
    const total = subtotal + deliveryFee;
    const router = useRouter()

    console.log("Cart products:", cartProducts);

    const handleDelete = async (productId) => {
        const response = await DeleteFromCart(productId);
        if (response.success) {
            getCartData()
        } else {
            console.error("Failed to delete item from cart:", response.message);
        }
    };

    const handleOrder = async () => {
        router.push("/pages/PlaceOrder")
    };

    const handleAddToCart = async (product,all) => {
        const response = await AddToCart(product._id,all);
        if (response.success) {
            getCartData()
        } else {
            toast.error(response.message || "Failed to add product to cart");
        }
    }

    const handleQuantity = async (e, item) => {
        const newQuantity = Number(e.target.value);

        // Block invalid numbers
        if (newQuantity < 0) return;

        const prevQuantity = item.quantity;

        if (newQuantity > prevQuantity) {
            // Increase → call Add API
            await handleAddToCart(item);
        } else if (newQuantity < prevQuantity) {
            // Decrease → call Delete API
            await handleDelete(item._id,"one");
        }

        // Refresh cart
        getCartData();
    };
    

    return (
        <>
            <Navbar/>
        <div className="px-4 py-20 bg-gray-50">
            <h1 className="text-4xl font-bold text-[#016630] mb-8 text-center">
                My <span className="text-[#009966]">Cart</span>
            </h1>

            <div className="padding-both mx-auto">
                {cartProducts.length > 0 ? (
                    <ul className="space-y-6">
                        {cartProducts.map((item) => (
                            <li
                                key={item._id}
                                className="bg-white shadow-md rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4"
                            >
                                <img
                                    src={item.image || "https://via.placeholder.com/100x100.png?text=EcoWear"}
                                    alt={item.name}
                                    className="w-28 h-28 object-cover rounded-lg"
                                />

                                <div className="flex-1 text-center sm:text-left">
                                    <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                                    <p className="text-sm text-gray-500 mb-2">{item.description}</p>
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-700">
                                        <p>Price: ₹ {item.price}</p>
                                        <p>Quantity: <input
                                            className="py-1 px-2 ml-4 w-16 border rounded text-center"
                                            type="number"
                                            min="1"
                                            value={item.quantity}
                                            onChange={(e) => handleQuantity(e, item)}
                                        />

                                        </p>
                                        <p>Total: ₹ {item.price * item.quantity}</p>
                                        <button
                                            onClick={() => handleDelete(item._id,"all")}
                                            className="text-red-500 hover:text-red-700 flex flex-col items-center p-2 sm:p-0 text-sm transition"
                                            title="Remove from cart"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>

                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-gray-600">Your cart is empty.</p>
                )}

                <div className="flex flex-col md:flex-row justify-end items-start mt-8">

                    <div className="mt-8 md:w-1/3 w-full p-4 bg-gray-100 rounded-lg shadow">
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
                            className="w-full bg-[#009966] text-white font-semibold py-2 rounded-lg  mt-4 transition duration-300"
                        >
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
            </div>
            <Footer/>
        </>
    );
};

export default Cart;