'use client';

import NavButtons from "@/components/Header/NavButtons";
import XpButton from "@/components/Header/XpButtons";
import { useState, useEffect } from "react";

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    // Find the scroll container (the main div with overflow-y-scroll)
    const scrollContainer = document.querySelector('.overflow-y-scroll');
    
    if (!scrollContainer) return;

    const controlHeader = () => {
      const currentScrollY = scrollContainer.scrollTop;

      // Show header when at top (within 10px)
      if (currentScrollY < 10) {
        setIsVisible(true);
      }
      // Hide when scrolling down, show when scrolling up
      else if (currentScrollY > lastScrollY) {
        setIsVisible(false); // Scrolling down
      } else {
        setIsVisible(true); // Scrolling up
      }

      setLastScrollY(currentScrollY);
    };

    // Add scroll event listener to the container
    scrollContainer.addEventListener('scroll', controlHeader);

    // Cleanup
    return () => {
      scrollContainer.removeEventListener('scroll', controlHeader);
    };
  }, [lastScrollY]);

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
    <div 
      className={`fixed flex flex-col md:flex-row justify-between px-4 md:px-6 lg:px-8 items-center z-100 gap-2 md:gap-0 w-full font-sans transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0 top-2 md:top-4' : '-translate-y-full'
      }`}
    >
      {/* XP Buttons - Stack on mobile, side by side on tablet+ */}
      <div className="w-full md:w-1/2 h-full bg-black/20 rounded-xl flex flex-col sm:flex-row items-center justify-around gap-2 sm:gap-0 py-2 sm:py-0">
        <XpButton logo={'/xpbutton/Polygon.svg'} amount={'2 Years'} text={'XP'} />
        <XpButton logo={'/xpbutton/Gem.svg'} amount='15+ Projects' text={'PoW'} />
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