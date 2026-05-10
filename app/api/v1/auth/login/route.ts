import { connectToDB } from "@/config/db";
import { verifyHashPassword } from "@/lib/crypto-hash";
import { STATUS, User } from "@/models/user.model";
import { generateAccessToken, generateRefreshToken } from "@/utils/token";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectToDB();
        const { email, password } = await req.json();
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "User not found", success: false }, { status: 404 });
        }
        const verifyPassword = verifyHashPassword(password, user.slug, user.password);
        if (!verifyPassword) {
            return NextResponse.json({ message: "Invalid password", success: false }, { status: 401 });
        }

        if (user.status === STATUS.BANNED) {
            return NextResponse.json({ message: "User is banned", success: false }, { status: 400 });
        }

        if (user.status === STATUS.BLOCK) {
            return NextResponse.json({ message: "User is blocked", success: false }, { status: 400 });
        }

        if (user.status === STATUS.DELETED) {
            return NextResponse.json({ message: "User is deleted", success: false }, { status: 400 });
        }


        const accessToken = await generateAccessToken({ _id: user._id, role: user.role });
        const refreshToken = await generateRefreshToken({ _id: user._id, role: user.role });


        const userWithoutPassword = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.status,
            avatar: user.avatar,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }

        const response = NextResponse.json({ message: "Login successful", success: true, data: userWithoutPassword }, { status: 200 });
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
        console.log(error);
        return NextResponse.json({ message: "Something went wrong", success: false }, { status: 500 });
    }
}