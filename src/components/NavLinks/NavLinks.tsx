// import { div } from "motion/react-client";

import Navigators from "@/ui/Navigators";

export default function NavLinks() {
  return (
    <div className="flex gap-4 justify-evenly items-center mx-auto w-3/4 h-1/3">
      <div>
        <Navigators content="Projects" sectionId="projects"/>
      </div>
      <div>
        <Navigators content="Blogs" sectionId="blog"/>
      </div>
    </div>
  )
}