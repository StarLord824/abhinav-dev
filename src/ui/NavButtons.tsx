
interface NavButtonProps {
    logoPath : string;
    text : string;
}

export default function NavButton(props : NavButtonProps) {
    return (
        <div>
            {props.text}
        </div>
    )
}