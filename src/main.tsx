import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/index.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
        <div className="modalContainer fade-in" style={{zIndex:999}}>
    <div className="modal" onClick={e => e.stopPropagation()}>
    <div className="modalTitle">Nowa wersja ESZUT'a jest już dostępna!</div>
        <div className="updateLogo"></div>
        <div className="modalInfo wide">
          twoja obecna wersja ESZUT'a to 1.0, dostępna jest 1.1b. czy chcesz pobrać paczkę z aktualizacją?
        </div>
        <div className='bottomModalPart'>
        <button className="mainButton marginLeft" >Pomiń tą wersję</button>
        <button className="mainButton marginLeft" >Przypomnij mi później</button>
        <button className="mainButton successButton marginLeft" >Aktualizuj</button>
        </div>
      </div>
    </div>
    <App />
  </React.StrictMode>,
)
