'use client';
import React, { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from 'axios'
import { GetAllOrders, GetCartData, GetProductById, GetProducts, GetUserOrders, GetUsers } from "../services/api";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [role, setRole] = useState("");
    const [products, setProducts] = useState([]);
    const [cartProducts, setCartProducts] = useState([]);
    const [cartData, setClientData] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [productLoader, setProductLoader] = useState(false)
    const [cartLoader, setCartLoader] = useState(false)
    const [OrderLoader, setOrderLoader] = useState(false)
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
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
        setProductLoader(true)
        const response = await GetProducts();
        if (response.success) {
            setProducts(response.products);
            setProductLoader(false)
        } else {
            toast.error(response.message || "Failed to fetch products");
            setProductLoader(false)
        }
    }

    const getCartData = async () => {
        setCartLoader(true)
        try {
            
            const response = await GetCartData(token);
            if (response.success) {
                setClientData(response.cartData);
            } else {
                toast.error(response.message || "Failed to fetch cart data");
            }
        } catch (error) {
            toast.error(error?.message || "Server error while fetching cart data");
            setCartLoader(false)
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
            setCartLoader(false)

            setCartProducts(productList);
        };

        fetchCartProducts();
    }, [cartData]);

    useEffect(() => {
        if (token) {
            getProducts();
            role==="user"&&getCartData()
        }
    }, [token]);

    useEffect(() => {
        let total = 0;
        cartProducts.forEach((item) => {
            total += item.price * item.quantity;
        });
        setSubtotal(total);
    }, [cartProducts]);

    const getOrder = async () => {
        try {
        setOrderLoader(true)
            const getOrders = role === "admin" ? GetAllOrders : GetUserOrders;
            const response = await getOrders();

            if (response.success) {
                setOrders(response.orders);
                console.log("orders",response.orders)
                // toast.success("Orders fetched successfully");
                setOrderLoader(false)
            } else {
                toast.error("Failed to fetch orders");
                setOrderLoader(false)
            }
        } catch (err) {
            console.error(err);
            setLoading(false)
            toast.error("Something went wrong");
        }
    };

    const getusers = async() => {
        const response = await GetUsers()
        if (response.success) {
            setUsers(response.users)
        }
    }
    useEffect(() => {
        if (token) { getOrder() }
        if (role === "admin"&&token) {
            getusers();
        }
    }, [role,token]);


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
        setCartProducts, role, setRole, cartLoader, productLoader, orders, setOrders, setOrderLoader, OrderLoader, getOrder, users
    };

    return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
