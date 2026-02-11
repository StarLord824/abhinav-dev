import NavLinks from "@/components/Home/NavLinks/NavLinks";
import Profile from "@/components/Home/Profile";
import Resume from "@/components/Home/Resume";

export default function Home() {
  return (
    <div className="h-screen snap-y snap-proximity overflow-y-scroll font-sans">
      {/* Home Section */}
      <section 
        id="home"
        className="relative snap-start flex flex-col items-start min-h-screen h-auto sm:h-screen w-full bg-violet-800 bg-[radial-gradient(white_1px,transparent_1px)] [background-size:30px_30px] [contain:paint_layout] px-0 sm:px-0"
      >
        <Profile />
        <Resume />
        <NavLinks />
      </section>
      
      {/* <Banner /> */}

      {/* Projects Section */}
      {/* <section 
        id="projects" 
        className="snap-start min-h-screen h-auto sm:h-[200vh] w-full bg-green-400 bg-[radial-gradient(white_1.2px,transparent_0.5px)] [background-size:30px_30px] [contain:paint_layout] p-4 sm:p-6 md:p-8"
      >
        <ProjectsSection />
      </section>
      
      <Banner /> */}

      {/* About Section */}
        {/* <section 
          id="about"
          className="snap-start min-h-screen h-[100vh] w-full bg-teal-600 bg-[radial-gradient(white_1.3px,transparent_0.5px)] [background-size:30px_30px] [contain:paint_layout] overflow-y-auto custom-scrollbar"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-2">
            <IntroHeader />
            
            <div className="grid lg:grid-cols-2 gap-6 mb-4">
              <div className="space-y-4">
                <WorkExperience />
                <Achievements />
              </div>
              <div className="space-y-4">
                <StatsSection />
                <SkillsSection />
              </div>
              
            </div>
          </div>
        </section> */}
    </div>
  );
}