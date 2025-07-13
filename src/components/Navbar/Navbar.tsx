// import { useState } from "react";
// import { HomeIcon, AboutIcon, ContactIcon } from "@heroicons/react/outline";

export default function Navbar() {
    const sections = [
        { id: 'home', Icon: 'HomeIcon'},
        { id: 'projects', Icon: 'ProjectsIcon'},
        { id: 'blog', Icon: 'BlogIcon'},
        { id: 'about', Icon: 'AboutIcon'},
        { id: 'contact', Icon: 'ContactIcon'},
    ];
    // const [active, setActive] = useState(sections[0].id);

    // const handleClick = (id: string) => {
    //     setActive(id);
    // };
  return (
    <div className="fixed h-120 w-22 z-100 right-2 top-1/2 -translate-y-1/2 flex flex-col justify-around items-center gap-4 text-black bg-white">
        {sections.map((section) => {
            return (
                <div key={section.id} className="flex flex-row gap-2 items-center">
                    <section className="flex flex-row gap-2 items-center">
                        <section className="w-6 h-6">
                            <section className={`${ section.Icon} text-2xl`}></section>
                        </section>
                        <section className="text-sm">{section.id}</section>
                    </section>
                </div>
            )
        })}
    </div>
    );
}