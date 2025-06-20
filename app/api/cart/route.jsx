import User from "@/app/_lib/userModel.js";
import userAuth from "../lib/authMiddleware.js";
import { connectDB } from "@/app/_lib/db.js";

const AddToCart = async (req) => {
    try {
        await connectDB()
        if (req.method !== 'POST') {
            return new Response(JSON.stringify({
                success: false,
                message: "Method Not Allowed",
            }), { status: 405 });
        }

        const userId = req.userId;
        const body = await req.json();
        const { productId } = body;

        if (!userId || !productId) {
            return new Response(JSON.stringify({
                success: false,
                message: "User ID and Product ID are required",
            }), { status: 400 });
        }

        const user = await User.findById(userId);

        if (!user) {
            return new Response(JSON.stringify({
                success: false,
                message: "User not found",
            }), { status: 404 });
        }

        // Initialize or update cart
        const cartData = user.cartData || {};

        if (cartData[productId]) {
            cartData[productId].quantity += 1;
        } else {
            cartData[productId] = { quantity: 1 };
        }

        user.cartData = cartData;
        user.markModified("cartData");
        await user.save();

        return new Response(JSON.stringify({
            success: true,
            message: "Product added to cart successfully",
            cartData,
        }), { status: 200 });

    } catch (error) {
        console.error("AddToCart Error:", error);
        return new Response(JSON.stringify({
            success: false,
            message: "Internal Server Error",
        }), { status: 500 });
    }
};

export const POST = userAuth(AddToCart);


const getCartData = async (req) => {
    try {
        await connectDB()
        const userId = req.userId;

        if (!userId) {
            return new Response(JSON.stringify({ success: false, message: "User ID is missing" }), {
                status: 400,
            });
        }

        const user = await User.findById(userId);

        if (!user) {
            return new Response(JSON.stringify({ success: false, message: "User not found" }), {
                status: 404,
            });
        }

        const cartData = user.cartData || {};

        return new Response(JSON.stringify({ success: true, cartData }), {
            status: 200,
        });
    } catch (error) {
        console.error("Get Cart Data Error:", error);
        return new Response(JSON.stringify({ success: false, message: "Internal Server Error" }), {
            status: 500,
        });
    }
};

const DeleteFromCart = async (req) => {
    console.log(req)
    try {
        const userId = req.userId;
        const { productId ,all} = await req.json();
        if (all==="all") {
            const user = await User.findById(userId);
            if (!user) {
                return new Response(JSON.stringify({ success: false, message: "User not found" }));
            }

            // Remove the product from cartData
            if (user.cartData && user.cartData[productId]) {
                delete user.cartData[productId];
                user.markModified('cartData'); // mark cartData as modified
                await user.save();

                return new Response(JSON.stringify({
                    success: true,
                    message: "Product removed from cart",
                    cartData: user.cartData
                }));
            } else {
                return new Response(JSON.stringify({
                    success: false,
                    message: "Product not found in cart"
                }));
            }
        } else {
            
        if (!userId || !productId) {
            return new Response(JSON.stringify({
                success: false,
                message: "User ID and Product ID are required",
            }));
        }
        const user = await User.findById(userId);
        if (!user) {
            return new Response(JSON.stringify({
                success: false,
                message: "User not found",
            }));
        }
        const cartData = user.cartData || {};

        if (!cartData[productId]) {
            return new Response(JSON.stringify({
                success: false,
                message: "Product not found in cart",
            }));
        }

        if (cartData[productId].quantity > 1) {
            cartData[productId].quantity -= 1;
        } else {
            delete cartData[productId];
        }

        if (Object.keys(cartData).length === 0) {
            user.cartData = {};
        } else {
            user.cartData = cartData;
        }

        user.markModified('cartData');
        await user.save();

        return new Response(JSON.stringify({
            success: true,
            message: "Product updated/removed from cart",
            cartData: user.cartData,
        }));
            
        }

    } catch (error) {
        console.log("DeleteFromCart Error:", error);
        return new Response(JSON.stringify({
            success: false,
            message: "Internal server error",
        }));
    }
}

export const GET = userAuth(getCartData);
export const DELETE = userAuth(DeleteFromCart);