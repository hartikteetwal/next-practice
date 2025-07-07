import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { AddToCart } from '../services/api';
import { ShopContext } from '../context/ShopContext';
import DotSpinner from './DotSpinner';

const Cards = ({ products }) => {
    const [cartAddLoader,setCartAddLoader] = useState(false)
    const { getCartData, productLoader } = useContext(ShopContext)
    const [seletedProduct, setSelectedProduct] = useState(null);

    const handleAddToCart = async (product) => {
        console.log("Adding to cart:", product);
        setSelectedProduct(product);
        setCartAddLoader(true)
        const response = await AddToCart(product._id);
        console.log("Add to cart response:", response);
        if (response.success) {
            toast.success(response.message || "Product added to cart successfully");
            getCartData()
            setCartAddLoader(false)
            setSelectedProduct(null);

        } else {
            toast.error(response.message || "Failed to add product to cart");
            setCartAddLoader(false)
            setSelectedProduct(null);

        }
    }
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
             {
                           productLoader && <DotSpinner />
                       }
            {products.map((product) => (
                <div
                    key={product._id}
                    className="bg-white rounded-2xl shadow-md overflow-hidden relative group hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                    <img
                        src={product?.productImage?.trim() ? product.productImage : "fallback.jpg"}
                        alt={product?.productName || "No Image"}
                        className="w-full h-40 object-cover"
                        onError={(e) => {
                            e.target.src =
                                "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ=";
                        }}
                    />


                    <div className="p-5 flex flex-col flex-grow">
                        <h3 className="text-xl font-semibold text-[#009966]">{product.productName}</h3>
                        <p className="text-gray-600 text-sm mt-2">{product.description}</p>
                        <div className="flex justify-between items-center mt-4 mb-2">
                            <span className="text-lg font-bold text-[#10b981]">₹{product.price}</span>
                            <span className="bg-[#fee2e2] text-red-600 text-xs font-medium px-3 py-1 rounded-full">
                                {product.category}
                            </span>
                        </div>

                        {/* Add to Cart button */}
                        <button onClick={() => handleAddToCart(product)} className="w-full bg-[#009966] text-white font-semibold py-2 rounded-lg opacity-100 md:opacity-0 md:group-hover:opacity-100 mt-auto transition duration-300">
                            {cartAddLoader&&seletedProduct._id===product._id ? "Adding..." : "Add to Cart"}
                        </button>
                    </div>
                </div>

            ))}
        </div>
    )
}

export default Cards