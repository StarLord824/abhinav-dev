// import NavButtons from "@/ui/NavButtons";
import Image from "next/image";

export default function Profile() {
  return (
    <div className="flex items-center relative top-20 h-2/3 w-full" id="profile">
        <div className=" flex-col h-full w-4/5">
            {/* Profile Banner Image - Gamified*/} 
            <Image
                src={'/banners/banner2.svg'}
                alt="Aurora UI/UX Banner"
                height={1000}
                width={1000}
            />
            <div className="flex justify-between items-start px-10 bg-black/20 h-18 py-2 rounded-r-xl">
                <div className="flex flex-col">
                    <h1 className="font-bold text-2xl ">Abhinav Shukla</h1>
                    <h4 className="font-semibold text-blue-300">Full Stack Developer!</h4>
                </div>
                <div className="flex gap-2 items-center justify-center">
                    <Image
                        src={'/langs/cpp.svg'}
                        alt="C++"
                        height={50}
                        width={50}
                    />
                    <Image
                        src={'/langs/Typescript.svg'}
                        alt="Typescript"
                        height={50}
                        width={50}
                    />
                    <Image
                        src={'/langs/js.svg'}
                        alt="Javascipt"
                        height={50}
                        width={50}
                    />
                    <Image
                        src={"/langs/Go.svg"}
                        alt="Go"
                        height={50}
                        width={50}
                    />
                    <Image
                        src="/langs/java.svg"
                        alt="Java"
                        height={50}
                        width={50}
                    />
                    <Image
                        src="/langs/python.svg"
                        alt="Python"
                        height={50}
                        width={50}                    
                    />
                </div>
            </div>
        </div>
        <div className=" flex flex-col justify-start items-center w-1/2 h-full">
            <div className="absolute flex gap-4 items-center">
                
                {/* <button>Mode Toggle</button>* settings */  }
            </div>
            {/* <div> */}
                {/* <NavButtons text='Projects' logoPath='/Adobe.png'/> */}
                {/* Upcoming Projects */}
                {/* Pass Royale */}
            {/* </div> */}
        </div>
    </div>
  );
}