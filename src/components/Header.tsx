import NavButtons from "@/ui/NavButtons";
import XpButton from "@/ui/XpButtons";

export default function Header() {
    const contactList = [
        { label: 'Email', url: 'mailto:shuklaabhinav824@gmail.com' },
        { label: 'Twitter', url: 'https://twitter.com/shukla_abhi_nav' },
        { label: 'Instagram', url: 'https://www.instagram.com/_shukla_abhinav' },
        { label: 'LinkedIn', url: 'https://www.linkedin.com/in/shuklaabhinav824' },
        { label: 'Discord', url: 'https://discord.gg/starlord_009' },
    ]

    const profileList = [
        { label: 'Codeforces', url: 'https://codeforces.com/profile/StarLord024' },
        // { label: 'Atcoder', url: 'https://atcoder.jp/users/abhinav_kumar_a_b' },
        { label: 'Leetcode', url: 'https://leetcode.com/shuklaabhinav824' },
        { label: 'Github', url: 'https://github.com/StarLord824' },
        { label: 'LinkedIn', url: 'https://www.linkedin.com/in/shuklaabhinav824' },
    ]

    const blogList = [
        { label: 'Blog', url: 'https://blog.abhinav.xyz' },
    ]

    return (
        <div className="fixed flex justify-between px-8 items-center z-100 top-4 h-15 w-full font-sans">
            <div className="w-1/2 h-full bg-black/20 rounded-xl flex items-center justify-around">
                <XpButton logo={'/xpbutton/Polygon.svg'} amount={'2 Years'} text={'XP'} />
                <XpButton logo={'/xpbutton/gem.svg'} amount='20+ Projects' text={'PoW'}/>
            </div>
            <div className="flex justify-evenly w-3/8 h-full  rounded-xl">
                <NavButtons text='Contacts' logoPath='/navbutton/Contacts.svg' links={contactList}/>
                <NavButtons text='Profiles' logoPath='/navbutton/Codes.svg' links={profileList}/>
                <NavButtons text='Blogs' logoPath='/navbutton/News.svg' links={blogList}/> {/* will navigate to blogpage */}
            </div>
        </div>
    )
}