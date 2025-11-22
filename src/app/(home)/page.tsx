import Banner from "@/components/Banner/Banner";
import NavLinks from "@/components/NavLinks/NavLinks";
import Profile from "@/components/Profile/Profile";
import Resume from "@/ui/Resume";

export default function Home() {
  return (
    <div className="h-screen snap-y snap-proximity overflow-y-scroll font-sans">
      {/* Home Section */}
      <section 
        id="home"
        className="relative snap-start flex flex-col items-start h-screen w-full bg-violet-800 bg-[radial-gradient(white_1px,transparent_1px)] [background-size:30px_30px] [contain:paint_layout]"
      >
        <Profile />
        <Resume />
        <NavLinks />
      </section>
      
      <Banner />
      
      {/* Projects Section */}
      <section 
        id="projects"
        className="snap-start h-[200vh] w-full bg-green-400 bg-[radial-gradient(white_1.2px,transparent_0.5px)] [background-size:30px_30px] [contain:paint_layout]"
      >
        {/* Add your projects content here */}
      </section>
      
      <Banner />
      
      {/* About Section */}
      <section 
        id="about"
        className="snap-start h-screen w-full bg-red-500 bg-[radial-gradient(white_1.3px,transparent_0.5px)] [background-size:30px_30px] [contain:paint_layout]"
      >
        {/* Add your about content here */}
      </section>
    </div>
  );
}