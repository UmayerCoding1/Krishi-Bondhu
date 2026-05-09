import { connectToDB } from "@/config/db";
import { User } from "@/models/user.model";
import { MyTokenPayload } from "@/type";
import { jwtDecode } from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const token = req.cookies.get('accessToken')?.value;
    await connectToDB();
    if (!token) {
        return NextResponse.json({ message: "Unauthorized", success: false }, { status: 401 });
    }
    const decode = jwtDecode<MyTokenPayload>(token as string);
    const user = await User.findById(decode._id)
        .select("-password -accessToken -refreshToken -otp -__v ")
        .lean();

    if (!user) {
        return NextResponse.json({ message: "User not found", success: false }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "User fetched successfully", data: user });
}