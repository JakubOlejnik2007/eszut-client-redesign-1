import ReactDOM from "react-dom";
import QRCode from "react-qr-code";

const TokenAlert = ({
  closeModal,
  token
}: {
  closeModal: () => void,
  token: string
}) => {



  return ReactDOM.createPortal(
    <div className="modalContainer fade-in">
      <div className="modal" onClick={e => e.stopPropagation()} >
        <div className='modalTitle'>Tworzenie tokenu</div>
        <div className="modalDescription" style={{ width: "90%", overflow: "scroll"}}>Twój token został pomyślnie utworzony! zapisz go w bezpiecznym miejscu -<br /> gdy go zgubisz już go nie dostaniesz.<br></br><br></br>
    
        <div className="qrCode">
        <QRCode
              size={256}
              style={{ height: "auto" }}
              value={token}
              viewBox={`0 0 256 256`}
              bgColor="var(--mainText)"
              fgColor="var(--pageForeBG)"
            />
          </div><br/>
        <div className='code'>{token}</div>
          
            
        </div>
        <div className="closeButton" onClick={closeModal}></div>
        <div className="bottomModalPart" style={{}}>
          <button className="mainButton successButton" onClick={() => { navigator.clipboard.writeText(token) }}>Skopiuj do schowka</button>
        </div>
      </div>
    </div>
    , document.body)
}

export default TokenAlert;