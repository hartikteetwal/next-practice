"use client"
import React from 'react'
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useContext } from 'react';
import { ShopContext } from '@/app/context/ShopContext';
import { useRouter } from 'next/navigation';
import { CreateProduct } from '@/app/services/api';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';


const AddProducts = () => {
    const [formData, setFormData] = useState({
        productName: "",
        productImage: "",
        description: "",
        price: "",
        category: "",
        latestProduct: false,
    });

    const router = useRouter()

    const { getProducts } = useContext(ShopContext)

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);

    };

    const onSubmit = async (formData) => {
        const response = await CreateProduct(formData)
        if (response.success) {
            toast.success(response.message || "Product Added Successfully")
            setFormData({
                productName: "",
                productImage: "",
                description: "",
                price: "",
                category: "",
                latestProduct: false,
            });
            router.push("/pages/Collection")
            getProducts()
        } else {
            toast.error(response.message || "Product not added")
        }
    }
    return (
        <>
                <Navbar />
            
        <form
            onSubmit={handleSubmit}
                className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md py-[100px]"
        >
            <h2 className="text-2xl font-bold text-[#016630] mb-6">Add Product</h2>

            {/* Product Name */}
            <div className="mb-4">
                <label className="block text-sm font-semibold mb-1 text-gray-700">
                    Product Name *
                </label>
                <input
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#016630]"
                />
            </div>

            {/* Product Image URL */}
            <div className="mb-4">
                <label className="block text-sm font-semibold mb-1 text-gray-700">
                    Product Image URL
                </label>
                <input
                    type="text"
                    name="productImage"
                    value={formData.productImage}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#016630]"
                />
            </div>

            {/* Description */}
            <div className="mb-4">
                <label className="block text-sm font-semibold mb-1 text-gray-700">
                    Description *
                </label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#016630]"
                />
            </div>

            {/* Price */}
            <div className="mb-4">
                <label className="block text-sm font-semibold mb-1 text-gray-700">
                    Price (₹) *
                </label>
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#016630]"
                />
            </div>

            {/* Category */}
            <div className="mb-4">
                <label className="block text-sm font-semibold mb-1 text-gray-700">
                    Category *
                </label>
                <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#016630]"
                />
            </div>

            {/* Latest Product Checkbox */}
            <div className="mb-4 flex items-center">
                <input
                    type="checkbox"
                    name="latestProduct"
                    checked={formData.latestProduct}
                    onChange={handleChange}
                    className="mr-2 accent-[#016630]"
                />
                <label className="text-sm text-gray-700 font-medium">
                    Mark as Latest Product
                </label>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full bg-[#016630] hover:bg-[#014f29] text-white font-semibold py-2 px-4 rounded-lg transition"
            >
                Submit Product
            </button>
            </form>
            <Footer />
        </>
    )
}

export default AddProducts