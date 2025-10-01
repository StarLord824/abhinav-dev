import { html } from "motion/react-client";

export default function BlogsLayout( { children }: { children: React.ReactNode } ) {
    return (
        <html lang="en">
            <body className="snap-y snap-mandatory font-sans">
                {/* header : contains title, contacting link buttons, search bar and dark mode toggler*/}
                {children} {/* contains blogs arranged in bento grid */}
                {/* footer : contains copyright, privacy policy link, and report issue link */}
            </body>
        </html>
    )
}

export function BlogPageHeader(){
    return (
    <>
        <div>
        </div>
    </>
    )
}