import User from "@/app/_lib/userModel";

export async function GET() {
    try {
        const users = await User.find({},'-password')
        return new Response(JSON.stringify({ success: true, users }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({success:false,message:"Server error"}))
    }
}