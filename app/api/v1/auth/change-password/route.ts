import { connectToDB } from "@/config/db";
import { createHashPassword, verifyHashPassword } from "@/lib/crypto-hash";
import { verifyToken } from "@/lib/verifyToken";
import { User } from "@/models/user.model";
import { MyTokenPayload } from "@/type";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
    await connectToDB();
    const { oldPassword, newPassword } = await req.json();
    const token = req.cookies.get("accessToken")?.value;
    const decoded: MyTokenPayload | null = verifyToken(token as string);
    if (!decoded) {
        return NextResponse.json({ message: "Unauthorized. Please login.", success: false }, { status: 401 });
    }
    const user = await User.findById(decoded?._id);
    if (!user) {
        return NextResponse.json({ message: "User not found", success: false }, { status: 404 });
    }


    const isPasswordValid = verifyHashPassword(oldPassword, user.slug, user.password);

    if (!isPasswordValid) {
        return NextResponse.json({ message: "Invalid old password", success: false }, { status: 400 });
    }

    const { hash, slug } = await createHashPassword(newPassword);

    const updateResult = await User.updateOne(
        { _id: user._id },
        { $set: { password: hash, slug: slug } }
    );

    if (updateResult.modifiedCount === 0) {
        return NextResponse.json({ message: "Password not changed", success: false }, { status: 400 });
    }

    return NextResponse.json({ message: "Password changed successfully", success: true }, { status: 200 });

}