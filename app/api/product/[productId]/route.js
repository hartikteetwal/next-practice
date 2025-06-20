import { connectDB } from "@/app/_lib/db";
import Products from "@/app/_lib/product.model";
import { NextResponse } from "next/server";
import mongoose from "mongoose"; 

export async function GET(req,{ params }) {
    console.log("productId aa gayi",params)
    const id =  params?.productId
    if (!id) return NextResponse.json({ success: false, message: "Invalid ID" })
    try {
        if (mongoose.Types.ObjectId.isValid(id)) {
            await connectDB()
            const products = await Products.findById(id)
            return NextResponse.json({ success: true, products })
        } else {
       console.log("error")
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: "server error" })
    }
}