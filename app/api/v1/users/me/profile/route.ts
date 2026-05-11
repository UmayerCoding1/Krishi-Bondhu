import { connectToDB } from "@/config/db";
import { User } from "@/models/user.model";
import { verifyToken } from "@/lib/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
    try {
        await connectToDB();
        const token = req.cookies.get("accessToken")?.value;
        const decode = verifyToken(token as string);

        if (!decode) {
            throw new Error("Unauthorized");
        }

        const { name } = await req.json();
        if (!name) {
            throw new Error("Name is required");
        }

        const user = await User.findByIdAndUpdate(decode._id, { name }, { returnDocument: 'after' }).select("-password -accessToken -refreshToken -otp -__v ");

        if (!user) {
            throw new Error("User not found");
        }

        return NextResponse.json({ message: "Profile updated successfully", success: true, user }, { status: 200 });

    } catch (error: any) {
        console.log(error);
        throw new Error(error)
    }
}