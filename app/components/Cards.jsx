import React, { useContext } from 'react'
import toast from 'react-hot-toast';
import { AddToCart } from '../services/api';
import { ShopContext } from '../context/ShopContext';

const Cards = ({ products }) => {
    const { getCartData } = useContext(ShopContext)

    const handleAddToCart = async (product) => {
        console.log("Adding to cart:", product);
        const response = await AddToCart(product._id);
        console.log("Add to cart response:", response);
        if (response.success) {
            toast.success(response.message || "Product added to cart successfully");
            getCartData()
        } else {
            toast.error(response.message || "Failed to add product to cart");
        }
    }
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
                <div
                    key={product._id}
                    className="bg-white rounded-2xl shadow-md overflow-hidden relative group hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                    <img
                        src={product.productImage}
                        alt={product.productName}
                        className="w-full h-40 object-cover"
                    />

                    <div className="p-5 flex flex-col flex-grow">
                        <h3 className="text-xl font-semibold text-[#009966]">{product.productName}</h3>
                        <p className="text-gray-600 text-sm mt-2">{product.description}</p>
                        <div className="flex justify-between items-center mt-4">
                            <span className="text-lg font-bold text-[#10b981]">₹{product.price}</span>
                            <span className="bg-[#fee2e2] text-red-600 text-xs font-medium px-3 py-1 rounded-full">
                                {product.category}
                            </span>
                        </div>

                        {/* Add to Cart button */}
                        <button onClick={() => handleAddToCart(product)} className="w-full bg-[#009966] text-white font-semibold py-2 rounded-lg opacity-0 group-hover:opacity-100 mt-auto transition duration-300">
                            Add to Cart
                        </button>
                    </div>
                </div>

            ))}
        </div>
    )
}

export default Cards