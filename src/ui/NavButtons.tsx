
interface NavButtonProps {
    logoPath : string;
    text : string;
}

export default function NavButton(props : NavButtonProps) {
    return (
        <div className="relative flex flex-col justify-evenly items-center h-24 w-24 bg-black/15 rounded-[10px] border-[3px] border-black/20  ">
            <div className="absolute top-[12px]  bg-white rounded-lg opacity-20 h-8 w-18"/>
            <div>
                Logo
            </div>
            <div className="flex justify-center items-center text-center text-white/80 text-xs z-10 opacity-100">
                {props.text}
            </div>
        </div>
    )
}
// A470E3
