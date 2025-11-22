import Navigators from "@/ui/Navigators";

export default function NavLinks() {
  return (
    <div className="flex gap-4 justify-evenly items-center mx-auto mt-18 w-3/4 h-1/3">
      <Navigators content="Projects" sectionId="projects" />
      <Navigators content="About" sectionId="about" />
      {/* <Navigators content="Contact" sectionId="contact" /> */}
    </div>
  );
}