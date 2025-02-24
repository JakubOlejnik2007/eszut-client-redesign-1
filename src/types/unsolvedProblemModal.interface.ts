import IUnsolvedProblem from "./unsolvedproblem.interface";

interface IUnsolvedProblemModal extends IUnsolvedProblem {
    handleClose: () => void;
    handleReject: (e: React.MouseEvent<HTMLElement>) => void;
    handleMarkAsSolved: (e: React.MouseEvent<HTMLElement>) => void;
}

export interface IToggleEditableButtonProps {
    isSingle: boolean;
    toggle: () => void;
}

export interface IEditableData {
    categoryId: string;
    placeId: string;
    priority: string;
    wasChanged: boolean;
}


export default IUnsolvedProblemModal;