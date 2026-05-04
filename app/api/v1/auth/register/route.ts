import { connectToDB } from "@/config/db";
import { createHashPassword } from "@/lib/crypto-hash";
import { User } from "@/models/user.model";
import { sendEmail } from "@/services/sendEmail";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        await connectToDB();
        const { name, email, password } = await req.json();
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            if (existingUser.isVerified) {
                return NextResponse.json({ message: "User already verified", success: false }, { status: 400 });
            }
            else {
                return NextResponse.json({ message: "User already exists", success: false }, { status: 400 });
            }

        }

        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        const { slug, hash } = createHashPassword(otp);
        const otpData = {
            code: hash,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000),
            slug: slug

        }
        const user = await User.create({ name, email, password, otp: otpData });

        sendEmail(email, "Verify your email", otp).catch((error) => {
            console.log("Email sent failed", error);
        });

        return NextResponse.json({ message: "User registered successfully", success: true }, { status: 201 });

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "error", success: false }, { status: 500 })
    }
}