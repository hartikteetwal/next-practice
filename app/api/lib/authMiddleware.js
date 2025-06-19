// app/lib/authMiddleware.js
import jwt from 'jsonwebtoken';

const userAuth = (handler) => {
    return async (req) => {
        try {
            const token = req.headers.get('token'); // headers.get() in App Router

            console.log("User Auth Middleware:", token);

            if (!token) {
                return new Response(JSON.stringify({ success: false, message: "Not Authorized. Login again." }), {
                    status: 401,
                });
            }

            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            console.log("Decoded Token:", decoded);

            req.userId = decoded.userId; // 👈 attach userId to req
            return handler(req); // ✅ continue to actual handler
        } catch (error) {
            console.error("Auth Error:", error);
            return new Response(JSON.stringify({ success: false, message: "Auth failed" }), {
                status: 403,
            });
        }
    };
};

export default userAuth;
