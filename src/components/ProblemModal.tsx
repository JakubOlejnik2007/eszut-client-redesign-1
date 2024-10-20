import ReactDOM from "react-dom";

const ProblemModal = () => {
    return ReactDOM.createPortal(
        <div className="modalContainer">
            
            <div className="modal">
            <div className="closeButton"></div>
            <div>problem title</div><br/>
            

            time left: 69min<br/>
            sala: 10<br/>
            reporter<br/>
            </div>
        </div>, document.body
    )
}


export default ProblemModal
