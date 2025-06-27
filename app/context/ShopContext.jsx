'use client';
import React, { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from 'axios'
import { GetCartData, GetProductById, GetProducts } from "../services/api";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [role, setRole] = useState("");
    const [products, setProducts] = useState([]);
    const [cartProducts, setCartProducts] = useState([]);
    const [cartData, setClientData] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const deliveryFee = 50;

    // ✅ Get token only on client side
    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        const savedRole = localStorage.getItem('role');
        if (savedToken) {
            setToken(savedToken);
            setRole(savedRole);
        }
    }, []);

    const getProducts = async () => {
        const response = await GetProducts();
        if (response.success) {
            setProducts(response.products);
        } else {
            toast.error(response.message || "Failed to fetch products");
        }
    }

    const getCartData = async () => {
        try {
            const response = await GetCartData(token);
            if (response.success) {
                setClientData(response.cartData);
            } else {
                toast.error(response.message || "Failed to fetch cart data");
            }
        } catch (error) {
            toast.error(error?.message || "Server error while fetching cart data");
        }
    };

    useEffect(() => {
        const fetchCartProducts = async () => {
            const productList = [];

            for (const productId in cartData) {
                try {
                    const res = await GetProductById(productId);
                    if (res.success) {
                        const productInfo = res.products;
                        productList.push({
                            ...productInfo,
                            quantity: cartData[productId].quantity,
                        });
                    }
                } catch (err) {
                    console.error("Error fetching product:", err);
                }
            }

            setCartProducts(productList);
        };

        fetchCartProducts();
    }, [cartData]);

    useEffect(() => {
        if (token) {
            getProducts();
            getCartData()
        }
    }, [token]);

    useEffect(() => {
        let total = 0;
        cartProducts.forEach((item) => {
            total += item.price * item.quantity;
        });
        setSubtotal(total);
    }, [cartProducts]);

    const value = {
        token,
        setToken,
        products,
        setProducts,
        cartData,
        setClientData,
        getProducts,
        getCartData,
        setSubtotal,
        subtotal,
        deliveryFee,
        cartProducts,
        setCartProducts,role,setRole
    };

    return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
