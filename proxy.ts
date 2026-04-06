import { NextRequest, NextResponse } from 'next/server'

export function proxy(req: NextRequest) {
    const token = req.cookies.get('accessToken')?.value
    const { pathname } = req.nextUrl
    console.log(pathname)
    // শুধু private route protect
    if (!token && pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/', req.url))
    }

    if (token && (pathname.startsWith('/auth'))) {
        return NextResponse.redirect(new URL('/', req.url))
    }


    return NextResponse.next()
}

export const config = {
    matcher: ['/dashboard/:path*', '/auth/:path*'],
}


