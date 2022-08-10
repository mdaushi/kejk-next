import { NextResponse, NextRequest } from 'next/server'

export async function middleware(req, ev) {
    const { pathname } = req.nextUrl
    if (pathname == '/thoughts') {
        return NextResponse.redirect('/writing')
    }
    return NextResponse.next()
}