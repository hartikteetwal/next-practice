'use client'
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaPlus, FaMinus } from 'react-icons/fa';
import moment from 'moment';
import { GetAllOrders } from '@/app/services/api';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

const Order = () => {
    const [orders, setOrders] = useState([]);
    const [expandedOrders, setExpandedOrders] = useState({}); // Track which orders are expanded

    const getOrder = async () => {
        try {
            const response = await GetAllOrders();
            if (response.success) {
                setOrders(response.orders);
                toast.success("Orders fetched successfully");
            } else {
                toast.error("Failed to fetch orders");
            }
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong");
        }
    };

    const toggleExpand = (orderId) => {
        setExpandedOrders((prev) => ({
            ...prev,
            [orderId]: !prev[orderId],
        }));
    };

    useEffect(() => {
        getOrder();
    }, []);

    return (
        <>
        <Navbar/>     
        <section className="py-[100px] px-2 bg-gray-50 min-h-screen">
            <h2 className="text-3xl font-bold text-[#016630] mb-8 text-center">
                All <span className="text-[#009966]">Orders</span>
            </h2>

            <div className="padding-both">
                {orders.length > 0 ? (
                    orders.map((order) => {
                        const isExpanded = expandedOrders[order._id];
                        return (
                            <div
                                key={order._id}
                                className="bg-white shadow-lg rounded-xl p-6 space-y-4 border border-green-200 mb-6"
                            >
                                {/* Order Meta Info Header with Toggle */}
                                <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleExpand(order._id)}>
                                    <div className="text-left text-gray-700">
                                        <p><strong>Date:</strong> {moment(order.date).format('DD MMM YYYY')}</p>
                                        <p><strong>Payment:</strong> {order.paymentMethod} ({order.payment ? "Paid" : "Unpaid"})</p>
                                        <p><strong>Total:</strong> ₹{order.price}</p>
                                    </div>
                                    <div className="text-right">
                                        {isExpanded ? (
                                            <FaMinus className="text-xl text-green-600" />
                                        ) : (
                                            <FaPlus className="text-xl text-green-600" />
                                        )}
                                    </div>
                                </div>

                                {/* Expanded Details */}
                                {isExpanded && (
                                    <>
                                        <div className="text-gray-700">
                                            <p><strong>Address:</strong> {order.address}, {order.city}, {order.state} - {order.pincode}</p>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-semibold mb-3 border-b pb-1 text-green-700">Products:</h3>
                                            <ul className="space-y-4">
                                                {order.products.map((product) => (
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
                                    </>
                                )}
                            </div>
                        );
                    })
                ) : (
                    <p className="text-center text-gray-600">No orders found.</p>
                )}
            </div>
            </section>
            <Footer />
        </>
    );
};

export default Order;