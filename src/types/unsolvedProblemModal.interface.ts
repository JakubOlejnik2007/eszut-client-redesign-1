import IUnsolvedProblem from "./unsolvedproblem.interface";

interface IUnsolvedProblemModal extends IUnsolvedProblem {
    handleClose: () => void;
    handleReject: (e: React.MouseEvent<HTMLElement>) => void;
    handleMarkAsSolved: (e: React.MouseEvent<HTMLElement>) => void;
}

export default IUnsolvedProblemModal;