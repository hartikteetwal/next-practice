import { connectDB } from "@/app/_lib/db"
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import User from "@/app/_lib/userModel";

export async function POST(req) {
    await connectDB()
    const payload = await req.json()
    if (!payload.email || !payload.password) return NextResponse.json({ success: false, message: "All fields are required" })
    
    const user = await User.findOne({ email: payload.email })

    if (!user) return NextResponse.json({ success: false, message: "User not found" })
    
    const isMatched = await bcrypt.compare(payload.password, user.password)
    if (!isMatched) return NextResponse.json({ success: false, message: "Invalid credential" })
    
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY)
    
    
     return NextResponse.json({ success: true, message: "Login successfully", token: token })
}
