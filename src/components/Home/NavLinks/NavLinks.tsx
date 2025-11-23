import Navigators from "@/components/Home/NavLinks/Navigators";

export default function NavLinks() {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-evenly items-center mx-auto mt-12 sm:mt-16 md:mt-18 w-full sm:w-4/5 md:w-3/4 h-auto sm:h-1/3 px-4 sm:px-0">
      <Navigators content="Projects" sectionId="projects" />
      <Navigators content="About" sectionId="about" />
    </div>
  );
}