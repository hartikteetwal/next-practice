import Stripe from 'stripe'
import dotenv from 'dotenv'
import Order from '@/app/_lib/orderModel'
import User from '@/app/_lib/userModel'
import userAuth from '../lib/authMiddleware'
import { NextResponse } from 'next/server'
dotenv.config()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const placeOrder = async (req) => {
    try {
        const body = await req.json();
        const {
            products,
            address,
            price,
            city,
            state,
            pincode,
            paymentMethod,
            origin,
        } = body;

        // ✅ Step 1: Basic Validation
        if (!products || !Array.isArray(products) || products.length === 0) {
            return new Response(
                JSON.stringify({ success: false, message: "No products in order." }),
                { status: 400 }
            );
        }

        if (!address || !price || !city || !state || !pincode) {
            return new Response(
                JSON.stringify({ success: false, message: "Missing order details." }),
                { status: 400 }
            );
        }

        const userId = req.userId;
        if (!userId) {
            return new Response(
                JSON.stringify({ success: false, message: "Unauthorized user." }),
                { status: 401 }
            );
        }

        // ✅ Step 2: Handle Cash on Delivery (COD)
        if (paymentMethod === "cod") {
            const order = await Order.create({
                products,
                address,
                price,
                city,
                state,
                pincode,
                userId,
                paymentMethod: "COD",
                payment: false,
                date: new Date(),
            });

            // Clear user's cart
            await User.findByIdAndUpdate(userId, { cartData: {} });

            return new Response(JSON.stringify({ success: true, order }), {
                status: 201,
                headers: { "Content-Type": "application/json" },
            });
        }

        // ✅ Step 3: Handle Stripe Payment
        if (paymentMethod === "stripe") {

            if (!origin) {
                return new Response(
                    JSON.stringify({ success: false, message: "Missing origin URL." }),
                    { status: 400 }
                );
            }

            console.log("origin", origin);

            const orderData = {
                products,
                address,
                price,
                city,
                state,
                pincode,
                userId,
                paymentMethod: "Stripe",
                payment: false,
                date: new Date(),
            };

            const newOrder = await Order.create(orderData);

            // Map products to Stripe line_items
            const line_items = products.map((product) => ({
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: product.productName,
                    },
                    unit_amount: product.price * 100,
                },
                quantity: product.quantity || 1,
            }));

            // Add delivery charge
            line_items.push({
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: "Delivery Charge",
                    },
                    unit_amount: 1000, // ₹10
                },
                quantity: 1,
            });

            // Create Stripe session
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items,
                mode: "payment",
                success_url: `${origin}/pages/Verify?success=true&orderId=${newOrder._id}`,
                cancel_url: `${origin}/pages/Verify?success=false&orderId=${newOrder._id}`,
                metadata: {
                    orderId: newOrder._id.toString(),
                    userId: userId.toString(),
                },
            });

            return new Response(
                JSON.stringify({ success: true, session_url: session.url }),
                {
                    status: 200,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

        // ❌ Invalid payment method fallback
        return new Response(
            JSON.stringify({ success: false, message: "Invalid payment method." }),
            { status: 400 }
        );
    } catch (error) {
        console.error("Order Placement Error:", error);
        return new Response(
            JSON.stringify({
                success: false,
                message: "Server error. Please try again later.",
            }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
};
  


// const placeStripe = async (req) => {
//     try {
//         const { products, address, price, city, state, pincode, origin } = req.body
//         const userId = req.userId;
//         const orderData = {
//             products, address, price, userId, city, state, pincode,
//             paymentMethod: "Stripe",
//             payment: false,
//             date: Date.now()
//         }
//         const newOrder = new Order(orderData)
//         await newOrder.save()

//         const line_items = products.map((product) => ({
//             price_data: {
//                 currency: "inr",
//                 product_data: {
//                     name: product.productName, // ✅ Only name, not whole object
//                 },
//                 unit_amount: product.price * 100,
//             },
//             quantity: product.quantity || 1,
//         }));


//         line_items.push({
//             price_data: {
//                 currency: "inr",
//                 product_data: {
//                     name: "deliver charge"
//                 },
//                 unit_amount: 10
//             },
//             quantity: 1
//         })

//         const session = await stripe.checkout.sessions.create({
//             success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
//             cancle_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
//             line_items,
//             mode: "payment"
//         })

//         return new Response(JSON.stringify({ success: true, session_url: session.url }))
//     } catch (error) {
//         console.log(error)
//         return new Response(JSON.stringify({ success: false, message: "server error" }))
//     }

// }

const getOderByUserId = async (req) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return new Response(JSON.stringify({ success: false, message: "User ID is required" }));
        }
        const orders = await Order.find({ userId });
        if (!orders || orders.length === 0) {
            return new Response(JSON.stringify({ success: false, message: "No orders found for this user" }));
        }
        return new Response(JSON.stringify({ success: true, orders }));
    } catch (error) {
        console.error("Error fetching orders:", error);
        return new Response(JSON.stringify({ success: false, message: "Internal server error" }));
    }
}




export const POST = userAuth(placeOrder);
// export const POST  = userAuth(placeStripe);
export const GET = userAuth(getOderByUserId);
// export const GET = userAuth(getAllOrderByAdmin);
