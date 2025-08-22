import NavButtons from "@/ui/NavButtons";

export default function Header() {
    return (
        <div className="fixed flex justify-between px-8 items-center z-100 top-4 h-12 w-full font-sans">
            <div className="w-1/2 h-full bg-black/20 rounded-xl">

            </div>
            <div className="flex justify-evenly w-3/8 h-full  rounded-xl">
                <NavButtons text='Contacts' logoPath='/contact.png'/>
                <NavButtons text='Coding Profiles' logoPath='/coding.png'/>
                <NavButtons text='News' logoPath='/News.png'/>
            </div>
        </div>
    )
}

// export function HeaderBar( props : {logoPath : string, value : number, max : number, color : string}) {
//     return (
//         <div>
            
//         </div>
//     )
// }