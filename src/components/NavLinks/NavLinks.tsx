// import { div } from "motion/react-client";

import Button from "@/ui/Button";

export default function NavLinks() {
  return (
    <div className="flex gap-4 justify-evenly items-center mx-auto w-3/4 h-1/3">
      <div>
        <Button content="Projects"/>
      </div>
      <div>
        <Button content="Blogs"/>
      </div>
    </div>
  )
}