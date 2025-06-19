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

export const GET = userAuth(getCartData);