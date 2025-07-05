'use client'
import React, { useContext, useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FaPlus, FaMinus } from 'react-icons/fa';
import moment from 'moment';
import { OrderDelete, OrderStatus } from '@/app/services/api';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { ShopContext } from '@/app/context/ShopContext';
import SkeletonPage from '@/app/components/SkeletonPage';
import Spinner from '@/app/components/PageLoader';

const Order = () => {
    
    const [expandedOrders, setExpandedOrders] = useState({}); // Track which orders are expanded
    const { role, token } = useContext(ShopContext)
    const [status, setStatus] = useState("")
    const { orders, setOrders, setOrderLoader, OrderLoader, getOrder } = useContext(ShopContext)
    
    console.log(role)

   

    const statusHandler = async (event, orderId) => {
        const newStatus = event.target.value;
        console.log("newStatus",newStatus)
        try {
            const res = await OrderStatus(orderId,newStatus)

            if (res.success) {
                toast.success("Status updated");
                getOrder(); // refresh orders list
            } else {
                toast.error("Failed to update status");
            }
        } catch (error) {
            console.error("Status update error:", error);
            toast.error("Server error while updating status");
        }
    };
    

    const toggleExpand = (orderId) => {
        setExpandedOrders((prev) => ({
            ...prev,
            [orderId]: !prev[orderId],
        }));
    };


    const deleteOrder = async (orderId) => {
        const confirmDelete = confirm("Are you sure you want to delete this order?");
        if (!confirmDelete) return;

        console.log("orderId", orderId)

        try {
            const res = await OrderDelete(orderId)
            if (res.success) {
                toast.success("Order deleted");
                getOrder(); // refresh orders
            } else {
                toast.error("Failed to delete order");
            }
        } catch (err) {
            console.error("Delete error:", err);
            toast.error("Something went wrong");
        }
    };

        if (!token && !role) return (
                <div>
                    <div className='min-h-100'>
                        <SkeletonPage />;
                    </div>
                </div>
            )
    

    return (
        <>
            <Navbar />  
            {
                OrderLoader &&<Spinner/>
            }

        <section className="py-[100px] px-2 bg-gray-50 min-h-screen">
            <h2 className="text-3xl font-bold text-[#016630] mb-8 text-center">
                All <span className="text-[#009966]">Orders</span>
            </h2>

            <div className="padding-both">
                {orders?.reverse().length > 0 ? (
                    orders?.map((order) => {
                        const isExpanded = expandedOrders[order._id];
                        return (
                            <div
                                key={order._id}
                                className="bg-white shadow-lg rounded-xl p-6 space-y-4 border border-green-200 mb-6"
                            >
                                {/* Order Meta Info Header with Toggle */}
                                <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleExpand(order._id)}>
                                    <div className="text-left text-gray-700">
                                        {
                                            role === "admin" ? 
                                                <>
                                                <p><strong>Name:</strong> {order.userId.name}</p>
                                                <p><strong>Date:</strong> {moment(order.date).format('DD MMM YYYY')}</p>
                                                <p><strong>Total:</strong> ₹{order.price}</p>
                                                </> :
                                                <>
                                        <p><strong>Date:</strong> {moment(order.date).format('DD MMM YYYY')}</p>
                                        <p><strong>Payment:</strong> {order.paymentMethod} ({order.payment ? "Paid" : "Unpaid"})</p>
                                                <p><strong>Total:</strong> ₹{order.price}</p>
                                                </>
                                        }
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
                                        {/* Status Dropdown */}
                                        <div className="flex items-center justify-between mt-4">
                                            <label className="font-semibold text-gray-700">Order Status:</label>
                                            <select
                                                disabled={role !== "admin"}
                                                onChange={(event) => statusHandler(event, order._id)}
                                                value={order.status}
                                                className={`p-2 border rounded-md text-sm font-medium ${role !== "admin"
                                                        ? "bg-gray-100 text-gray-500 border-gray-300 cursor-not-allowed"
                                                        : "bg-green-50 text-green-800 border-green-300"
                                                    }`}
                                            >
                                                <option value="Order Placed">Order Placed</option>
                                                <option value="Packing">Packing</option>
                                                <option value="Shipped">Shipped</option>
                                                <option value="Out for delivery">Out for delivery</option>
                                                <option value="Delivered">Delivered</option>
                                            </select>

                                        </div>
                                        {
                                            role === "admin" && 
                                                <div className="flex items-center justify-between mt-4">
                                                    <label className="font-semibold text-gray-700">Payment:</label>
                                                    <div>{order.paymentMethod} ({order.payment ? "Paid" : "Unpaid"})</div>
                                                </div>
                                        }

                                      



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

                                        {role === "admin" && (
                                            <div className="mt-4 text-right">
                                                <button
                                                    onClick={() => deleteOrder(order._id)}
                                                    className="px-4 py-2 bg-red-100 text-red-700 font-semibold rounded hover:bg-red-200 transition-all"
                                                >
                                                    Delete Order
                                                </button>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        );
                    })
                ) : (
                        !OrderLoader && <p className="w-full bg-[#009966] text-white text-center py-3 rounded-md shadow-md">
                            No orders found.
                        </p>
                    )}
            </div>
            </section> 
            <Toaster />

            <Footer />
        </>
    );
};

export default Order;