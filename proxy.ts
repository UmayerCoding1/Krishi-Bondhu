import { NextRequest, NextResponse } from 'next/server';
import { jwtDecode } from 'jwt-decode';

type MyTokenPayload = {
    role: "user" | "admin";
}

export function proxy(req: NextRequest) {
    const token = req.cookies.get('accessToken')?.value;

    const { pathname } = req.nextUrl;



    // শুধু private route protect
    if (
        !token &&
        (
            pathname.startsWith('/dashboard') ||
            pathname.startsWith('/crop-advice') ||
            pathname.startsWith('/ai-chatbot')
        )
    ) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    if (token && (pathname.startsWith('/auth') || pathname.startsWith('/verify'))) {
        return NextResponse.redirect(new URL('/', req.url))
    }

    let decode: MyTokenPayload | null = null;
    if (token) {
        decode = jwtDecode<MyTokenPayload>(token as string);
    }
    // role base access controll
    // admin route 
    if (
        pathname.startsWith('/dashboard/admin') && decode?.role === 'admin'
    ) {
        return NextResponse.redirect(new URL('/unauthorized', req.url));
    }



    if (pathname.startsWith('/dashboard/admin')) { }

    return NextResponse.next()
}
export const config = {
    matcher: [
        '/dashboard/:path*',
        '/auth/:path*',
        '/verify/:path*',
        '/crop-advice/:path*',
        '/ai-chatbot/:path*'
    ],
};


