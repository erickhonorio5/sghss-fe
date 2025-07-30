import { NextResponse, type NextRequest } from 'next/server'

const ROUTES = {
    auth: {
        paths: ['/auth/signin', '/auth/signup'],
        redirect: '/dashboard'
    },
    protected: {
        paths: ['/dashboard', '/dashboard/:path*'],
        redirect: '/auth/signin'
    }
} as const

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    const token = request.cookies.get('token')?.value

    const isAuthRoute = ROUTES.auth.paths.some(route =>
        pathname === route || pathname.startsWith(route + '/')
    )

    const isProtectedRoute = ROUTES.protected.paths.some(route =>
        pathname === route || pathname.startsWith(route.replace(':path*', ''))
    )

    if (token && isAuthRoute) {
        return NextResponse.redirect(new URL(ROUTES.auth.redirect, request.url))
    }

    if (!token && isProtectedRoute) {
        return NextResponse.redirect(new URL(ROUTES.protected.redirect, request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)']
}