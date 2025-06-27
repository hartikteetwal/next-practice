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

export async function  POST(req){
    try {
        await connectDB();
        const { productName, productImage, description, price, category } = await req.json()
        if (!productImage || !productName || !description || !price || !category) return res.status(400).json({ success: false, message: "All fields are required" })
        const newProduct = await Products.create({
            productName: productName,
            description: description,
            price: price,
            category: category,
            productImage: productImage
        })
        return NextResponse.json({ success: true, message: "Product created successfully", newProduct })
    } catch (error) {
        console.log("error", error)
        return NextResponse.json({ success: false, message: "server error" })
    }
}
