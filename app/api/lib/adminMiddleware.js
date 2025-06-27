import jwt from 'jsonwebtoken'

const adminAuth = async (handler) => {
    return async (req) => {
        
    try {
        const  token  = req.headers.get('token')
        if (!token) {
            return new Response(JSON.stringify({ success: false, message: "Not Authorized. Login again." }), {
                status: 401,
            });
        }
        const token_decode = jwt.verify(token, process.env.SECRET_KEY)
        if (token_decode.email !== process.env.ADMIN_EMAIL) return new Response(JSON.stringify({ success: false, message: "Not Authorized Login Again" }), {
            status: 401,
        })
        return handler(req); 

    } catch (error) {
        console.error("Auth Error:", error);
        return new Response(JSON.stringify({ success: false, message: "Auth failed" }), {
            status: 403,
        });
        }
    }

}

export default adminAuth;