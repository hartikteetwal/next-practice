'use client';
import React, { useContext } from 'react';
import { ShopContext } from '@/app/context/ShopContext';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Spinner from './PageLoader';

const AdminDashboard = () => {
    const { users, orders, products, OrderLoader, productLoader,cartLoader } = useContext(ShopContext);

    const totalUsers = users?.length || 0;
    const totalOrders = orders?.length || 0;
    const totalProducts = products?.length || 0;
    const totalRevenue = orders?.reduce((acc, order) => acc + (order.price || 0), 0);


    return (
        <>
            {
                (OrderLoader || productLoader || cartLoader)&&<Spinner/>
            }
            <section className="min-h-screen bg-gray-50 py-[100px] px-4">
                <h1 className="text-4xl font-bold text-center text-green-700 mb-10">Admin Dashboard</h1>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <DashboardCard title="Total Users" value={totalUsers} color="bg-green-100" />
                    <DashboardCard title="Total Orders" value={totalOrders} color="bg-blue-100" />
                    <DashboardCard title="Total Revenue" value={`₹${totalRevenue}`} color="bg-yellow-100" />
                    <DashboardCard title="Total Products" value={totalProducts} color="bg-pink-100" />
                </div>

                {/* Latest Users Table */}
                <div className="mb-10">
                    <h2 className="text-2xl font-semibold text-green-700 mb-4">Latest Users</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white rounded-xl shadow-sm text-sm text-gray-700">
                            <thead className="bg-green-100 text-left">
                                <tr>
                                    <th className="py-3 px-4 font-semibold">Name</th>
                                    <th className="py-3 px-4 font-semibold">Email</th>
                                    <th className="py-3 px-4 font-semibold">Cart Items</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users?.slice(-5).reverse().map(user => (
                                    <tr key={user._id} className="border-t hover:bg-green-50 transition-all">
                                        <td className="py-3 px-4">{user.name}</td>
                                        <td className="py-3 px-4">{user.email}</td>
                                        <td className="py-3 px-4">{Object.keys(user.cartData || {}).length}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>


                {/* Recent Orders Table */}
                <div>
                    <h2 className="text-2xl font-semibold text-green-700 mb-4">Recent Orders</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white rounded-xl shadow-sm text-sm text-gray-700">
                            <thead className="bg-blue-100 text-left">
                                <tr>
                                    <th className="py-3 px-4 font-semibold">Order ID</th>
                                    <th className="py-3 px-4 font-semibold">Amount</th>
                                    <th className="py-3 px-4 font-semibold">Status</th>
                                    <th className="py-3 px-4 font-semibold">Payment</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders?.slice(-5).reverse().map(order => (
                                    <tr key={order._id} className="border-t hover:bg-blue-50 transition-all">
                                        <td className="py-3 px-4">{order._id.slice(-6)}</td>
                                        <td className="py-3 px-4">₹{order.price}</td>
                                        <td className="py-3 px-4">{order.status}</td>
                                        <td className="py-3 px-4">{order.payment ? "Paid" : "Unpaid"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </section>
        </>
    );
};

const DashboardCard = ({ title, value, color }) => (
    <div className={`rounded-xl p-6 shadow-md ${color}`}>
        <h3 className="text-xl font-semibold text-gray-700">{title}</h3>
        <p className="text-3xl font-bold text-green-900 mt-2">{value}</p>
    </div>
);

export default AdminDashboard;
