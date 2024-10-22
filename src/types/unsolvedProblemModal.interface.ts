import IUnsolvedProblem from "./unsolvedproblem.interface";

interface IUnsolvedProblemModal extends IUnsolvedProblem {
    handleClose: () => void;
}

export default IUnsolvedProblemModal;