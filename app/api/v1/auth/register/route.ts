import { connectToDB } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        await connectToDB();
        const { name, email, password } = await req.json();



        return NextResponse.json({ message: "success" })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "error" }, { status: 500 })
    }
}