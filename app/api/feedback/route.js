import nodemailer from "nodemailer";

export async function POST(req){
    const { name, email, message } = await req.json();
    if (!name || !email || !message) {
        return new Response(JSON.stringify({ error: "All fields are required." }));
    }

    try {
        const testAccount = await nodemailer.createTestAccount();

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",   // 👈 If you're using Gmail, not Ethereal!
            port: 587,
            secure: false, // true for port 465, false for 587

            auth: {
                user: 'teetwalhartik@gmail.com',
                pass: 'mwkm fhye dobm rafs',
            },
        });

        const mailOptions = {
            from: `"Ecowear Feedback" teetwalhartik@gmail.com`,
            to: "teetwalhartik@gmail.com",
            subject: `🌿 New Feedback Received from ${name}`,
            html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; background: #f3f4f6; border-radius: 10px;">
              <h2 style="color: #047857;">EcoWear - Customer Feedback</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Message:</strong></p>
              <pre style="background: #fff; padding: 10px; border-left: 4px solid #d97706;">${message}</pre>
              <hr style="margin-top: 20px;">
              <p style="font-size: 12px; color: #6b7280;">This message was sent from EcoWear's feedback form.</p>
            </div> 
          `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Preview URL: " + nodemailer.getTestMessageUrl(info));

        return new Response(JSON.stringify({ success: true, preview: nodemailer.getTestMessageUrl(info) }));
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ success:false, messgae: "Failed to send feedback." }));
    }
};



