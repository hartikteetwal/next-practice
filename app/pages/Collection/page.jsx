'use client'
import Cards from "@/app/components/Cards";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import { ShopContext } from "@/app/context/ShopContext";
import React, { useState, useContext } from "react";

const categories = ["Mobile", "Tablet", "iPad"];

const Collection = () => {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [sortOrder, setSortOrder] = useState("");
    const { products } = useContext(ShopContext);

    const filteredData = products
        .filter((item) =>
            selectedCategory ? item.category === selectedCategory : true
        )
        .sort((a, b) => {
            if (sortOrder === "lowToHigh") return a.price - b.price;
            if (sortOrder === "highToLow") return b.price - a.price;
            return 0;
        });

    return (
        <>
            <Navbar/>
        <section className="py-[100px] px-4 sm:px-6 lg:px-16">
            <h2 className="text-3xl font-bold text-[#016630] mb-8 text-center">
                All <span className="text-[#009966]">Collections</span>
            </h2>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Filter Panel */}
                <div className="w-full lg:w-[20%] bg-white p-6 rounded-xl shadow-md border border-gray-200">
                    <h3 className="text-xl font-semibold mb-6 text-gray-800">Filters</h3>

                    {/* Category Filter */}
                    <div className="mb-8">
                        <h4 className="font-medium mb-3 text-gray-700">Category</h4>
                        <div className="space-y-2">
                            {categories.map((cat) => (
                                <label key={cat} className="flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        name="category"
                                        value={cat}
                                        checked={selectedCategory === cat}
                                        onChange={() => setSelectedCategory(cat)}
                                        className="mr-2 accent-[#009966]"
                                    />
                                    <span className="text-gray-600">{cat}</span>
                                </label>
                            ))}
                        </div>
                        <button
                            onClick={() => setSelectedCategory("")}
                            className="mt-4 inline-block px-3 py-1 bg-gray-200 text-sm rounded hover:bg-gray-300"
                        >
                            Clear Category
                        </button>
                    </div>

                    {/* Price Filter */}
                    <div>
                        <h4 className="font-medium mb-3 text-gray-700">Sort by Price</h4>
                        <div className="space-y-2">
                            <button
                                onClick={() => setSortOrder("lowToHigh")}
                                className={`block w-full text-left px-3 py-1 rounded hover:bg-gray-100 ${sortOrder === "lowToHigh" ? "bg-green-100 font-semibold text-green-700" : ""
                                    }`}
                            >
                                Low to High
                            </button>
                            <button
                                onClick={() => setSortOrder("highToLow")}
                                className={`block w-full text-left px-3 py-1 rounded hover:bg-gray-100 ${sortOrder === "highToLow" ? "bg-green-100 font-semibold text-green-700" : ""
                                    }`}
                            >
                                High to Low
                            </button>
                            <button
                                onClick={() => setSortOrder("")}
                                className="mt-4 inline-block px-3 py-1 bg-gray-200 text-sm rounded hover:bg-gray-300"
                            >
                                Clear Sort
                            </button>
                        </div>
                    </div>
                </div>

                {/* Product Panel */}
                <div className="w-full lg:w-[80%] px-2 lg:px-6">
                    {filteredData.length === 0 ? (
                        <p>No products found.</p>
                    ) : (
                        <Cards products={filteredData} />
                    )}
                </div>
            </div>
            </section>
            <Footer/>
        </>

    );
};

export default Collection;