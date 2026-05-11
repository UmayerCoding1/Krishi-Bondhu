import { connectToDB } from "@/config/db";
import { verifyToken } from "@/lib/verifyToken";
import { User } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
    try {
        await connectToDB();
        const token = req.cookies.get("accessToken")?.value;
        const decode = verifyToken(token as string);

        if (!decode) {
            throw new Error("Unauthorized");
        }

        const userId = decode._id;
        const { type, value } = await req.json();

        const allowedTypes = ["email", "system_notification", "safety_alert"];

        if (!allowedTypes.includes(type)) {
            throw new Error("Invalid notification type");
        }

        const updateField = `system_config.notification.${type}`;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: { [updateField]: value } },
            { new: true }
        ).select("system_config.notification");


        return NextResponse.json({
            success: true,
            message: "Notification updated successfully",
            data: {
                email: updatedUser?.system_config.notification.email,
                updates: updatedUser?.system_config.notification.system_notification,
                safety: updatedUser?.system_config.notification.safety_alert,
            },
        });
    } catch (error) {
        console.log(error)
    }
}