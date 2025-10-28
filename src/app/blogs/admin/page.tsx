import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminBlogPage() {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if(!session) {
        redirect("/sign-in") // Redirect to absolute url/sign-in route page
    }
    return (
        <>
            <div className="snap-y snap-mandatory font-sans">
                <h1 className="text-3xl font-bold text-center my-8">Admin Blog Page</h1>
                {/* Admin functionalities like creating, editing, deleting blogs will go here */}
            </div>
        </>
    )
}