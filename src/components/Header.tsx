import NavButtons from "@/ui/NavButtons";
import XpButton from "@/ui/XpButtons";

export default function Header() {
    return (
        <div className="fixed flex justify-between px-8 items-center z-100 top-4 h-15 w-full font-sans">
            <div className="w-1/2 h-full bg-black/20 rounded-xl flex items-center justify-around">
                <XpButton logo={'/xpbutton/Polygon.svg'} amount={'2 Years'} text={'XP'} />
                <XpButton logo={'/xpbutton/gem.svg'} amount='20+ Projects' text={'PoW'}/>
            </div>
            <div className="flex justify-evenly w-3/8 h-full  rounded-xl">
                <NavButtons text='Contacts' logoPath='/navbutton/Contacts.svg'/>
                <NavButtons text='Profiles' logoPath='/navbutton/Codes.svg'/>
                <NavButtons text='Blogs' logoPath='/navbutton/News.svg'/> {/* will navigate to blogpage */}
            </div>
        </div>
    )
}