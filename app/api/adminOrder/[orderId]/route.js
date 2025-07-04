
import { connectDB } from "@/app/_lib/db";   // make sure you're connecting to DB
import Order from "@/app/_lib/orderModel";

export async function PATCH(req, { params }) {
    await connectDB(); // connect MongoDB

    const orderId = params?.orderId;
    const { status } = await req.json();

    console.log("orderId",orderId,status)

    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );

        if (!updatedOrder) {
            return new Response(JSON.stringify({ success: false, message: "Order not found" }), { status: 404 });
        }

        return new Response(JSON.stringify({ success: true, order: updatedOrder }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });

    } catch (error) {
        console.error("Update Status Error:", error);
        return new Response(JSON.stringify({ success: false, message: "Server Error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}


export async function DELETE({ params }) {
    await connectDB();

    const { orderId } = params?.orderId;

    try {
        const deleted = await Order.findByIdAndDelete(orderId);

        if (!deleted) {
            return new Response(JSON.stringify({ success: false, message: "Order not found" }), { status: 404 });
        }

        return new Response(JSON.stringify({ success: true, message: "Order deleted" }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });

    } catch (error) {
        console.error("Delete Error:", error);
        return new Response(JSON.stringify({ success: false, message: "Server Error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
  