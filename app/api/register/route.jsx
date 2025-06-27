import { connectDB } from "@/app/_lib/db"
import User from "@/app/_lib/userModel"
import { NextResponse } from "next/server"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export async function POST(req){
    try {
        await connectDB()
        const payload = await req.json()
        if (!payload.name || !payload.password || !payload.email) return NextResponse.json({ success: false, message: "all fields are required" })
        const existingUser = await User.findOne({ email: payload.email })
        if (existingUser) return NextResponse.json({ success: false, message: 'User already exist' })
        if (payload.password < 8) return NextResponse.json({ success: false, message: "Password must be 8 charater long" })
        
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(payload.password, salt)

        const newUser = await User.create({
            name: payload.name,
            email: payload.email,
            password:hashedPassword
        })
        
        const token = jwt.sign({ userId: newUser._id }, process.env.SECRET_KEY)
        
        return NextResponse.json({ success: true, message: "User registered successfully", token, role: "user" })
    } catch (error) {
        console.log(error)
        return NextResponse.json({success:false,message:"server error"})
    }
}