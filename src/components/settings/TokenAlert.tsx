import ReactDOM from "react-dom";

const TokenAlert = ({
  closeModal,
  token
}: {
  closeModal: () => void,
  token: string
}) => {



  return ReactDOM.createPortal(
    <div className="modalContainer fade-in">
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className='modalTitle'>Tworzenie tokenu</div>
        <div className="modalDescription" style={{ width: "90%", overflow: "hidden" }}>Twój token został pomyślnie utworzony! zapisz go w bezpiecznym miejscu -<br /> gdy go zgubisz już go nie dostaniesz.<br></br><br></br><p className='code'>{token}</p></div>
        <div className="closeButton" onClick={closeModal}></div>
        <div className="bottomModalPart" style={{}}>
          <button className="mainButton successButton" onClick={() => { navigator.clipboard.writeText(token) }}>Skopiuj do schowka</button>
        </div>
      </div>
    </div>
    , document.body)
}

export default TokenAlert;