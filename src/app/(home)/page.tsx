import Achievements from "@/components/About/Achievements";
import IntroHeader from "@/components/About/IntroHeader";
import SkillsSection from "@/components/About/SkillsSection";
import StatsSection from "@/components/About/StatsSections";
import WorkExperience from "@/components/About/WorkExperience";
import Banner from "@/components/Banner/Banner";
import NavLinks from "@/components/Home/NavLinks/NavLinks";
import Profile from "@/components/Home/Profile";
import Resume from "@/components/Home/Resume";

export default function Home() {
  return (
    <div className="h-screen snap-y snap-proximity overflow-y-scroll font-sans">
      <section 
        id="home"
        className="relative snap-start flex flex-col items-start min-h-screen h-auto sm:h-screen w-full bg-violet-800 bg-[radial-gradient(white_1px,transparent_1px)] [background-size:30px_30px] [contain:paint_layout] px-0 sm:px-0"
      >
        <Profile />
        <Resume />
        <NavLinks />
      </section>
      
      <Banner />

      <section 
        id="projects" 
        className="snap-start min-h-screen h-auto sm:h-[200vh] w-full bg-green-400 bg-[radial-gradient(white_1.2px,transparent_0.5px)] [background-size:30px_30px] [contain:paint_layout] p-4 sm:p-6 md:p-8"
      >
      </section>
      
      <Banner />

      {/* About Section */}
      <section 
        id="about"
        className="snap-start min-h-screen h-[100vh] w-full bg-teal-600 bg-[radial-gradient(white_1.3px,transparent_0.5px)] [background-size:30px_30px] [contain:paint_layout] overflow-y-auto custom-scrollbar"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-2">
          {/* Intro Header with Personal Note */}
          <IntroHeader />
          
          {/* Two Column Layout on Desktop */}
          <div className="grid lg:grid-cols-2 gap-6 mb-4">
            {/* Right Column: Work Experience & Achievements */}
            <div className="space-y-4">
              <WorkExperience />
              <Achievements />
            </div>

            {/* Left Column: Skills */}
            <div className="space-y-4">
              <StatsSection />
              <SkillsSection />
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
}