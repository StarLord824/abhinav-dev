'use server';
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function getSession() {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    if(!session) {
        return { user: { status : 'guest'}}
    }
    return { user: { status : 'authenticated', name: session.user.name }}
}