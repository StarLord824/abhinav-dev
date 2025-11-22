import NavButtons from "@/ui/NavButtons";
import XpButton from "@/ui/XpButtons";

export default function Header() {
  const contactList = [
    { label: 'Email', url: 'mailto:shuklaabhinav824@gmail.com' },
    { label: 'Twitter', url: 'https://twitter.com/shukla_abhi_nav' },
    { label: 'Instagram', url: 'https://www.instagram.com/_shukla_abhinav' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/shuklaabhinav824' },
    { label: 'Discord', url: 'https://discord.gg/starlord_009' },
  ];

  const profileList = [
    { label: 'Codeforces', url: 'https://codeforces.com/profile/StarLord024' },
    { label: 'Leetcode', url: 'https://leetcode.com/shuklaabhinav824' },
    { label: 'Github', url: 'https://github.com/StarLord824' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/shuklaabhinav824' },
  ];

  const blogList = [
    { label: 'Blogs', url: '/blogs' },
  ];

  return (
    <div className="fixed flex flex-col md:flex-row justify-between px-4 md:px-6 lg:px-8 items-center z-100 top-2 md:top-4 gap-2 md:gap-0 w-full font-sans">
      {/* XP Buttons - Stack on mobile, side by side on tablet+ */}
      <div className="w-full md:w-1/2 h-full bg-black/20 rounded-xl flex flex-col sm:flex-row items-center justify-around gap-2 sm:gap-0 py-2 sm:py-0">
        <XpButton logo={'/xpbutton/Polygon.svg'} amount={'2 Years'} text={'XP'} />
        <XpButton logo={'/xpbutton/gem.svg'} amount='20+ Projects' text={'PoW'} />
      </div>

      {/* Nav Buttons - Hide on mobile, show on tablet+ */}
      <div className="hidden md:flex justify-evenly w-full md:w-3/8 h-full rounded-xl gap-2">
        <NavButtons text='Contacts' logoPath='/navbutton/Contacts.svg' links={contactList} />
        <NavButtons text='Profiles' logoPath='/navbutton/Codes.svg' links={profileList} />
        <NavButtons text='Blogs' logoPath='/navbutton/Blogs.svg' links={blogList} />
      </div>
    </div>
  );
}