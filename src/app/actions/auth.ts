'use server';

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

// Whitelist of allowed admin emails
const ALLOWED_ADMIN_EMAILS = [
    "shuklaabhinav824@gmail.com",
    "shuklajiabhi869@gmail.com",
    // Add more allowed emails here
];

export async function signInAction(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
        throw new Error("Email and password are required");
    }

    try {
        // Sign in with proper headers
        const response = await auth.api.signInEmail({
            body: {
                email,
                password
            },
            headers: await headers()
        });

        // Check if sign-in was successful
        if (!response) {
            throw new Error("Invalid credentials");
        }

        console.log("[signInAction] User signed in successfully:", email);
    } catch (error) {
        console.error("[signInAction] Sign-in error:", error);
        throw new Error("Invalid email or password. Please try again.");
    }

    redirect("/blogs/admin");
}

export async function signUpAction(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;

    if (!email || !password || !name) {
        throw new Error("All fields are required");
    }

    // Check if email is in the allowed list
    if (!ALLOWED_ADMIN_EMAILS.includes(email.toLowerCase())) {
        throw new Error("Registration is restricted. This email is not authorized.");
    }

    try {
        // Sign up with proper headers
        const response = await auth.api.signUpEmail({
            body: {
                email,
                password,
                name,
            },
            headers: await headers()
        });

        if (!response) {
            throw new Error("Failed to create account");
        }

        console.log("[signUpAction] User registered successfully:", email);
    } catch (error) {
        console.error("[signUpAction] Sign-up error:", error);
        
        // Check for specific error messages
        if (error instanceof Error) {
            if (error.message.includes("already exists") || error.message.includes("duplicate")) {
                throw new Error("An account with this email already exists. Please sign in instead.");
            }
            throw error;
        }
        
        throw new Error("Failed to create account. Please try again.");
    }

    redirect("/blogs/admin");
}

export async function signOutAction() {
    try {
        await auth.api.signOut({
            headers: await headers()
        });
        console.log("[signOutAction] User signed out successfully");
    } catch (error) {
        console.error("[signOutAction] Sign-out error:", error);
    }

    redirect("/");
}