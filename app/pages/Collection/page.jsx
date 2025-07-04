'use client'
import Cards from "@/app/components/Cards";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import Spinner from "@/app/components/PageLoader";
import ProductTable from "@/app/components/ProductTable";
import SkeletonPage from "@/app/components/SkeletonPage";
import { ShopContext } from "@/app/context/ShopContext";
import { DeleteProduct } from "@/app/services/api";
import { useRouter } from "next/navigation";
import React, { useState, useContext } from "react";
import toast from "react-hot-toast";

const categories = ["Mobile", "Tablet", "iPad"];

const Collection = () => {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [sortOrder, setSortOrder] = useState("");
    const { products, role, token, productLoader, getProducts } = useContext(ShopContext);
    const router = useRouter()

    const filteredData = products
        .filter((item) =>
            selectedCategory ? item.category === selectedCategory : true
        )
        .sort((a, b) => {
            if (sortOrder === "lowToHigh") return a.price - b.price;
            if (sortOrder === "highToLow") return b.price - a.price;
            return 0;
        });
    
    const handleEdit = () => {

    }

    const handleDelete = async (product) => {
        const response = await DeleteProduct(product)
        if (response.success) {
            toast.success(response.message || "Product deleted successfully")
            getProducts()
        } else {
            toast.error(response.message || "Product not deleted")
        }
    }
    
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
                role === "admin" ? <>
                    {
                        productLoader && <Spinner />
                    }
                    <section className="py-[100px] px-2 bg-gray-50 min-h-screen">
                        <div className='padding-both'>

                            <div className='flex justify-between items-center w-full  mb-8'>

                                <h2 className="text-3xl font-bold text-[#016630]">
                                    All <span className="text-[#009966]">Products</span>
                                </h2>
                                <button className="bg-[#016630] text-white px-4 py-2 rounded-lg hover:bg-[#009966] transition" onClick={() => router.push("/pages/AddProducts")}>
                                    Add Product
                                </button>

                            </div>
                            {/* Product Panel */}
                            <div className="w-full lg:w-[80%] px-2 lg:px-6">
                                {products.length === 0 ? (
                                    <p className="w-full bg-[#009966] text-white text-center py-3 rounded-md shadow-md">
                                        No products found.
                                    </p>

                                ) : (
                                    <ProductTable products={products} onEdit={handleEdit} onDelete={handleDelete} />
                                )}
                            </div>
                        </div>
                    </section>
                </> :
        <section className="py-[100px] px-4 sm:px-6 lg:px-16">
            <h2 className="text-3xl font-bold text-[#016630] mb-8 text-center">
                All <span className="text-[#009966]">Collections</span>
            </h2>

            <div className="flex flex-col lg:flex-row gap-6">
                            {/* Filter Panel */}
                            {
                                !productLoader&&
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
                            }

                {/* Product Panel */}
                <div className="w-full lg:w-[80%] px-2 lg:px-6">
                                {products.length === 0 ? (
                                    <p className="w-full bg-[#009966] text-white text-center py-3 rounded-md shadow-md">
                                        No products found.
                                    </p>
                      
                    ) : (
                        <Cards products={filteredData} />
                    )}
                </div>
            </div>
                    </section> 
                    
            }

            <Footer/>
        </>

    );
};

export default Collection;