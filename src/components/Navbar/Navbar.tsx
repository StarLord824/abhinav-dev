"use client";
import { useState, useEffect } from "react";

export default function Navbar() {
    const sections = [
        { id: 'home', Icon: 'HomeIcon', label: 'home'},
        { id: 'projects', Icon: 'ProjectsIcon', label: 'projects'},
        { id: 'blog', Icon: 'BlogIcon', label: 'blog'},
        { id: 'about', Icon: 'AboutIcon', label: 'about'},
        { id: 'contact', Icon: 'ContactIcon', label: 'contact'},
    ];
    
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-50% 0px -50% 0px', // Trigger when element is in center 50% of viewport
            threshold: 0
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        // Observe all sections
        sections.forEach((section) => {
            const element = document.getElementById(section.id);
            if (element) {
                observer.observe(element);
            }
        });

        // Cleanup
        return () => {
            sections.forEach((section) => {
                const element = document.getElementById(section.id);
                if (element) {
                    observer.unobserve(element);
                }
            });
        };
    }, []);

    const handleNavClick = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    return (
        <div className="fixed h-100 w-15 z-[100] right-0 rounded-bl-2xl rounded-tl-2xl top-1/2 -translate-y-1/2 flex flex-col justify-around items-center gap-4 text-black bg-white shadow-lg">
            {sections.map((section) => {
                const isActive = activeSection === section.id;
                return (
                    <div 
                        key={section.id} 
                        className={`flex flex-row gap-2 items-center border-2 cursor-pointer transition-all duration-300 rounded-lg px-3 py-2 hover:scale-105 ${
                            isActive 
                                ? 'border-violet-600 bg-violet-100 shadow-md' 
                                : 'border-gray-300 hover:border-violet-400 hover:bg-gray-50'
                        }`}
                        onClick={() => handleNavClick(section.id)}
                    >
                        <section className="flex flex-row gap-2 items-center">
                            <section className={`text-xs font-medium transition-colors duration-300 ${
                                isActive 
                                    ? 'text-violet-700' 
                                    : 'text-gray-600 hover:text-violet-600'
                            }`}>
                                {section.label}
                            </section>
                        </section>
                    </div>
                )
            })}
        </div>
    );
}