export const ReportIssueScreen = () => {
    return(
        <>
        
        <div style={{backgroundColor: '', width: '35%', minHeight: '512px'}} className="divider text-justify"><h3 style={{textAlign: "center"}}>Instrukcja</h3>
        {/* {" 📄 Formularz 📄 znajdujący się 🔍 na tej stronie 🌐 umożliwia ✨ zgłoszenie 📥 wystąpienia 🚨 usterki 🔧 związanej z komputerem 💻, dziennikiem 📓, rzutnikiem 📽, itp. ℹ️ W tym celu ➡️ należy 📝 wypełnić formularz 📄, podając 🖊️ dane 🆔 na temat osoby 🧑‍💻, która zgłasza 📣 wystąpienie problemu ❗, wskazać 👉 lokalizację 📍 usterki 🔧 (numer sali 🏫) 📍, a także 🤝 pozostawić ✍️ zwięzły opis 📝 tego, co się stało 💥, oraz 🛠️ wybrać ✔️ jedną z dostępnych kategorii 📑 zgłoszenia 📥. Do zgłoszenia 📨 jest przypisywany 🔄 domyślny priorytet 🚦, który wynika 🧾 z kategorii ⚠️. "} */}
            <div style={{color: '#8F8F8F', marginRight: '28px', marginLeft: '28px'}}>Formularz znajdujący się na tej stronie umożliwia zgłoszenie wystąpienia usterki związanej z komputerem, dziennikiem, rzutnikiem itp.
            W tym celu należy wypełnić formularz, podając dane na temat osoby, która zgłasza wystąpeinie problemu, wskazać lokalizację usterki (numer sali),
            a także pozostawić zwięzły opis tego co się stało oraz wybrać jedną z dostępnych kategorii zgłoszenia. Do zgłoszenia jest przypisywany domyślny priorytet, który wynika z kategorii.
            </div>
            </div>        
        <div style={{backgroundColor: '', width: '65%', marginLeft: '28px'}}className="content-padding text-justify"><h3 style={{textAlign: "center"}}>Zgłoś usterkę</h3>



        <label>miejsce usterki:</label> 
        <br/><select>
            <option value="1">weź to tam zrób</option>
            <option value="2">by było to wiesz</option>
            <option value="3">z bazy danych</option>
        </select><br/>
        <label>opis usterki</label>
        <br/><textarea className="textInput"></textarea><br></br>
        <label>kategoria zgłoszenia:</label>
        <br/><select>
            <option value="1">to też</option>
        </select><br/>

        
        <button>🗑️</button>        <button>ślij</button>

        </div>        


        </>
    )
}
