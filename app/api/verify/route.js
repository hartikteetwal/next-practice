import Order from "@/app/_lib/orderModel";
import User from "@/app/_lib/userModel";
import userAuth from "../lib/authMiddleware";

export const verifStripe = async (req) => {
    const { orderId, success } = await req.json();
    const userId = req.userId;
    console.log("Verifying payment for order:", orderId, "Success:", success, "User ID:", userId);
    try {
        if (success === 'true') {
            await Order.findByIdAndUpdate(orderId, { payment: true });
            await User.findByIdAndUpdate(userId, { cartData: {} })
            return new Response(JSON.stringify({ success: true }))
        } else {
            await Order.findByIdAndDelete(orderId)
            return new Response(JSON.stringify({ success: false }))
        }
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ success: false, message: error.message }))
    }
}



export const POST = userAuth(verifStripe);