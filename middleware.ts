import { NextResponse, NextRequest } from 'next/server';
import { getSessionCookie} from 'better-auth/cookies'
// import { getToken } from 'next-auth/jwt';

export async function middleware(req : NextRequest) {
    const sessionCookie = getSessionCookie(req)
}