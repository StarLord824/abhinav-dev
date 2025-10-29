'use server';

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function signInAction(formData : FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    await auth.api.signInEmail({
        body : {
            email,
            password
        }
    })

    redirect("/blogs");
}

export async function signUpAction(formData : FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;
    // const role = formData.get("role") as string;

    await auth.api.signUpEmail({
        body : {
            email,
            password,
            name,
            // role,
        }
    })

    redirect("/blogs");
}

export async function signOutAction() {
    await auth.api.signOut({
        headers: await headers()
    });

    redirect("/");
}