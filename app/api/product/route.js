import { connectDB } from "@/app/_lib/db";
import Products from "@/app/_lib/product.model"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        await connectDB();
        const products = await Products.find({})
        return NextResponse.json({ success: true, products })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: "server error" })
    }
}