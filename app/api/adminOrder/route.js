const { default: Order } = require("@/app/_lib/orderModel");
const { NextResponse } = require("next/server");

export async function GET(){
    try {
        const orders = await Order.find({})
        if (!orders || orders.length === 0) {
            return NextResponse.json({ success: false, message: "No orders found for this user" });
        }
        return NextResponse.json({ success: true, orders })
    } catch (error) {
        console.error("Error fetching orders:", error);
        return NextResponse.json({ success: false, message: "Internal server error" });
    }
}