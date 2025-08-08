'use client';

import { motion } from "motion/react";

// props : {/*height, width, text, bg-color, shadow-color */}
interface ButtonProps {
    content : string;
}
export default function Button(props : ButtonProps) {
    return (
        <motion.div className="w-[203px] h-[80px] hover-w-[213px]"
         >
            <button>
                <div className="flex justify-center items-center relative w-[203px] h-20 top-0 left-0 bg-[#ffc403] rounded-[13px] border-b-4 [border-bottom-style:solid] border-[#d36f0a] shadow-[inset_0px_4px_4px_#61523d40]" >
                    <div className="font-bold text-3xl text-black heavy-stroke-text">
                        {props.content} 
                    </div>
                    <div className="absolute w-1 h-[7px] top-1.5 right-2 bg-white rounded-[2.1px/3.3px] rotate-[-35.23deg]" />
                </div>
            </button>
        </motion.div>
        // <button className="relative h-20 w-60 bg-yellow-400 rounded-xl text-white font-bold ">
        //     Button
        //     <div className="absolute w-[10px] h-[21px] top-2 right-2 bg-white rounded-[5px/10.5px] rotate-[-40deg]" />
        //     {/* <div className="absolute top-2 right-2 -rotate-30 h-4 w-2 bg-white rounded-full"></div> */}
        // </button>
    //     <button
    //         className="relative z-10 px-8 py-5 rounded-[2rem] bg-yellow-400 shadow-lg text-black font-semibold text-lg"
    //     >
    //     {/* Glossy highlight */}
    //     <div className="absolute top-2 right-2 w-6 h-3 bg-white opacity-80 rounded-full rotate-45 pointer-events-none"></div>

    //   </button>
    );
}