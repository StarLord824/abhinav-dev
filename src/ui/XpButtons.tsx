
interface XpButtonProps {
    text : string;
    amount : number;
    logo : string;
    colorPallete : string;
}

export default function XpButton(props : XpButtonProps) {
    return <div>
       {props.text}
    </div>
}