import Stripe from 'stripe'
import dotenv from 'dotenv'
import Order from '@/app/_lib/orderModel'
import User from '@/app/_lib/userModel'
dotenv.config()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const placeOrder = async (req) => {
    try {
        const { products, address, price, city, state, pincode } = req.body
        const userId = req.userId;
        const paymentData = await Order.create({
            products, address, price, userId, city, state, pincode,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        })
        await User.findByIdAndUpdate(userId, { cartData: {} })
        return new Response(JSON.stringify({ success: true, paymentData }))
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ success: false, message: "server error" }))
    }
}

const placeStripe = async (req) => {
    try {
        const { products, address, price, city, state, pincode, origin } = req.body
        const userId = req.userId;
        const orderData = {
            products, address, price, userId, city, state, pincode,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now()
        }
        const newOrder = new Order(orderData)
        await newOrder.save()

        const line_items = products.map((product) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: product.productName, // ✅ Only name, not whole object
                },
                unit_amount: product.price * 100,
            },
            quantity: product.quantity || 1,
        }));


        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "deliver charge"
                },
                unit_amount: 10
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancle_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: "payment"
        })

        return new Response(JSON.stringify({ success: true, session_url: session.url }))
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ success: false, message: "server error" }))
    }

}

const getOderByUserId = async (req) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return new Response(JSON.stringify({ success: false, message: "User ID is required" }));
        }
        const orders = await Order.find({ userId }).sort({ date: -1 });
        if (!orders || orders.length === 0) {
            return new Response(JSON.stringify({ success: false, message: "No orders found for this user" }));
        }
        res.status(200).json({ success: true, orders });
    } catch (error) {
        console.error("Error fetching orders:", error);
        return new Response(JSON.stringify({ success: false, message: "Internal server error" }));
    }
}

const getAllOrderByAdmin = async (req) => {
    try {
        const orders = await Order.find({})
        if (!orders || orders.length === 0) {
            return new Response(JSON.stringify({ success: false, message: "No orders found for this user" }));
        }
        return new Response(JSON.stringify({ success: true, orders }))
    } catch (error) {
        console.error("Error fetching orders:", error);
        return new Response(JSON.stringify({ success: false, message: "Internal server error" }));
    }
}

export const GET = userAuth(placeOrder);
// export const GET = userAuth(placeStripe);
export const POST = userAuth(getOderByUserId);
// export const POST = userAuth(getAllOrderByAdmin);
