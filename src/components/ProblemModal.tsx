import ReactDOM from "react-dom";

const ProblemModal = () => {
    return ReactDOM.createPortal(
        <div className="modalContainer">

            <div className="modal">
                <div className="modalTitle">Zgłoszenie: title</div>
                <div className="modalDescription">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit laudantium sunt at corporis similique nisi, placeat pariatur natus recusandae quod praesentium corrupti neque eligendi facere dolorem rerum explicabo velit suscipit.
                </div>
                <div className="modalInfo">sdfsdfsdfsdfsdf</div>
                <div className="closeButton"></div>
                <div className="bottomModalPart"><button className="mainButton">test</button><button  className="mainButton">test</button><button  className="mainButton successButton">Ukończ</button></div>
            </div>
        </div>, document.body
    )
}


export default ProblemModal
