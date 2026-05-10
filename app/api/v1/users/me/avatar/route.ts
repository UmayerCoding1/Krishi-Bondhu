import { connectToDB } from "@/config/db";
import imagekit from "@/config/imagekit";
import { verifyToken } from "@/lib/verifyToken";
import { User } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");
const AVATAR_DIR = path.join(UPLOADS_DIR, "avatar");

if (!fs.existsSync(AVATAR_DIR)) {
    fs.mkdirSync(AVATAR_DIR, { recursive: true });
}

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE = 2 * 1024 * 1024; // 2MB
export async function PATCH(req: NextRequest,) {
    try {
        await connectToDB();
        const token = req.cookies.get("accessToken")?.value;

        const decode = verifyToken(token as string);


        if (!decode) {
            return NextResponse.json({ message: "Unauthorized", success: false }, { status: 401 });
        }
        const userId = decode._id;
        const formData = await req.formData();
        const file = formData.get("avatar") as File;


        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        if (!ALLOWED_TYPES.includes(file.type)) {
            return NextResponse.json(
                { error: "Only JPG, PNG, WebP allowed" },
                { status: 400 }
            );
        }

        // Convert file to buffer
        const buffer = Buffer.from(await file.arrayBuffer());

        // Save temporary file
        const tempFilePath = path.join(AVATAR_DIR, `temp_avatar_${decode._id}.jpg`);
        fs.writeFileSync(tempFilePath, buffer);


        if (file.size > MAX_SIZE) {
            return NextResponse.json(
                { error: "File size max 2MB" },
                { status: 400 }
            );
        }



        const user = await User.findById(decode._id);
        if (!user) {
            return NextResponse.json({ message: "User not found", success: false }, { status: 404 });
        }




        const fileBuffer = fs.readFileSync(tempFilePath);
        const uploaded = await imagekit.upload({
            file: fileBuffer,
            fileName: `avatar-${userId}.jpg`,
        });

        if (!uploaded.url) {
            return NextResponse.json({ message: "Avatar uploaded failed", success: false }, { status: 500 });
        }



        await User.findByIdAndUpdate(user._id, { avatar: uploaded.url });
        fs.unlinkSync(tempFilePath);
        return NextResponse.json({ message: "Avatar updated successfully", success: true, avatar: uploaded.url }, { status: 200 });
    } catch (error) {
        console.log('error', error)
        return NextResponse.json({ message: error, success: false }, { status: 500 })
    }
}