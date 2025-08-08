import Button from "@/ui/Button";
import Image from "next/image";

export default function Profile() {
  return (
    <div className="flex items-center relative top-20 h-75 w-full">
        <div className=" flex-col h-full w-4/5">
            {/* Profile Banner Image - Gamified*/} 
            <Image
                src={'/banners/banner2.svg'}
                alt="Aurora UI/UX Banner"
                height={1000}
                width={1000}
            />
            <div className="flex justify-between items-start px-10 bg-black/20 h-1/4 py-2">
                <div className="flex flex-col">
                    <h1 className="font-bold text-2xl ">Abhinav Shukla</h1>
                    <h4 className="font-semibold text-blue-300">Full Stack Developer!</h4>
                </div>
                <div>
                    Java, js
                </div>
            </div>
        </div>
        <div className="flex flex-col justify-around items-center w-1/2 h-full">
            <div className="flex gap-4 items-center">
                <button>Contacts</button> {/** friends */  }
                <button>Coding Profiles</button> {/** news */  }
                <button>Mode Toggle</button>{/** settings */  }
            </div>
            <div>
                <Button content='Projects'/>
                Upcoming Projects
                {/* Pass Royale */}
            </div>
        </div>
    </div>
  );
}