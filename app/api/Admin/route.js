const AdminLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) return res.status(400).json({ success: false, messgae: "All fields are required" })
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: "1h" })
            res.status(200).json({ success: true, token })
        } else {
            res.status(400).json({ success: false, message: "Invalid Credential" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "server error" })
    }
}
