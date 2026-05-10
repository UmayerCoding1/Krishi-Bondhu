import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { MyTokenPayload } from "@/type";



export function verifyToken(token: string | null): MyTokenPayload | null {
    try {
        if (!token) return null;

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as MyTokenPayload;
        return decoded;
    } catch {
        return null;
    }
}

// Role check করে
export function verifyRole(token: string, ...allowedRoles: string[]) {
    const user = verifyToken(token);

    if (!user) {
        return {
            user: null,
            error: NextResponse.json(
                { message: "Unauthorized. Please login.", success: false },
                { status: 401 }
            ),
        };
    }

    if (!allowedRoles.includes(user.role)) {
        return {
            user: null,
            error: NextResponse.json(
                { message: "Forbidden. You don't have permission.", success: false },
                { status: 403 }
            ),
        };
    }

    return { user, error: null };
}