import adminAuth from "../../lib/adminMiddleware"

const AdminLogin = async (req) => {
    try {
        const { email, password } = req.json()
        if (!email || !password) return res.status(400).json({ success: false, messgae: "All fields are required" })
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign({ email }, process.env.SECRET_KEY)
            return new Response(JSON.stringify({ success: true, token }),{status:200})
        } else {
            return new Response(JSON.stringify({ success: false, message: "Invalid Credential",admin:true }), {
                status:401
            })
        }
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ success: false, message: "server error" }))
    }
}


export default AdminLogin