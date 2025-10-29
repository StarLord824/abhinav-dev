export default function BlogsLayout( { children }: { children: React.ReactNode } ) {
    return (
        // <html lang="en">
            <div className="snap-y snap-mandatory font-sans">
                {/* header : contains title, contacting link buttons, search bar and dark mode toggler*/}
                {children} {/* contains blogs arranged in bento grid */}
                {/* footer : contains copyright, privacy policy link, and report issue link */}
            </div>
        // </html>
    )
}

export function BlogPageHeader(){
    return (
    <>
        <div className="h-1/5 w-full bg-violet-500 flex justify-center items-center">
            {/* top bar */}
            <div className="flex flex-col justify-center items-center">
                <div>
                    <h1 className="text-4xl font-bold text-white">Abhinav's Blogs</h1>
                </div>
                <div>
                    {/* search bar */}
                    {/* dark mode toggler */}
                    {/* sign up button */}
                </div>
            </div>

            {/* secondary bar */}
            <div className="flex flex-col justify-center items-center">
                {/* contacting link buttons */}
            </div>
        </div>
    </>
    )
}

export function BlogPageFooter(){
    return (
        <>
            <div>
                {/* copyright */}
                {/* privacy policy link */}
                {/* report issue link */}
            </div>
        </>
    )
}