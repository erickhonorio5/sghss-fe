import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const protectedRoutes = ['/dashboard']
const authRoutes = ['/auth/signin']

export function middleware(request: NextRequest) {
    const currentPath = request.nextUrl.pathname
    const token = request.cookies.get('token')?.value

    if (protectedRoutes.some(route => currentPath.startsWith(route))) {
        if (!token) {
            return NextResponse.redirect(new URL('/auth/signin', request.url))
        }

        try {
            const payload = JSON.parse(atob(token.split('.')[1]))
            if (!payload.exp || Date.now() >= payload.exp * 1000) {
                throw new Error('Token expirado')
            }
        } catch (error) {
            const response = NextResponse.redirect(new URL('/auth/signin', request.url))
            response.cookies.delete('token')
            return response
        }
    }

    if (authRoutes.includes(currentPath) && token) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}