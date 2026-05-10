import { connectToDB } from "@/config/db";
import { createHashPassword } from "@/lib/crypto-hash";
import { User } from "@/models/user.model";
import { sendEmail } from "@/services/sendEmail";
import { generateAccessToken, generateRefreshToken } from "@/utils/token";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectToDB();
        const { name, email, password } = await req.json();
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return NextResponse.json({ message: "User already exists", success: false }, { status: 400 });
        }

        const user = await User.create({ name, email, password });


        const accessToken = await generateAccessToken({ _id: user._id, role: user.role });
        const refreshToken = await generateRefreshToken({ _id: user._id, role: user.role });



        const response = NextResponse.json(
            { message: "Registration successful", success: true, data: user },
            { status: 201 }
        );

        response.cookies.set("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24, // 1 day in sec
            path: "/",
        });

        response.cookies.set("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60,
            path: "/",
        });

        return response;

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: error, success: false }, { status: 500 })
    }
}


