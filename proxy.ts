import { NextRequest, NextResponse } from 'next/server';
import { jwtDecode } from 'jwt-decode';
import { MyTokenPayload } from './type';



export function proxy(req: NextRequest) {
    const token = req.cookies.get('accessToken')?.value;
    let decode: MyTokenPayload | null = null;
    if (token) {
        decode = jwtDecode<MyTokenPayload>(token as string);
    }
    const { pathname } = req.nextUrl;



    //  private route protect
    if (
        !token &&
        (
            pathname.startsWith('/dashboard/admin') ||
            pathname.startsWith('/crop-advice') ||
            pathname.startsWith('/ai-chatbot') ||
            pathname.startsWith('/profile') ||
            pathname.startsWith('/settings')
        )
    ) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    if (decode?._id && (pathname.startsWith('/auth') || pathname.startsWith('/verify'))) {
        return NextResponse.redirect(new URL('/', req.url))
    }


    // role base access controll
    // admin route 

    if (
        pathname.startsWith('/dashboard/admin') && decode?.role !== 'admin'
    ) {
        return NextResponse.redirect(new URL('/unauthorized', req.url));
    }



    if (pathname.startsWith('/dashboard/admin')) { }

    return NextResponse.next()
}
export const config = {
    matcher: [
        '/dashboard/admin/:path*',
        '/dashboard/:path*',
        '/auth/:path*',
        '/verify/:path*',
        '/crop-advice/:path*',
        '/ai-chatbot/:path*',
        '/profile/:path*',
        '/settings/:path*'
    ],
};


