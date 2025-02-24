import { IToggleEditableButtonProps } from "../../types/unsolvedProblemModal.interface";

const ToggleEditableButton = ({ isSingle, toggle }: IToggleEditableButtonProps) => {
    return (
        <button title="Edytuj zgłoszenie" className={`mainButton edit ${isSingle ? "singlebuttonoffset" : ""}`} onClick={toggle}>g</button>
    )
}

export default ToggleEditableButton;