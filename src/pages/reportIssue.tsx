import { useQuery } from "react-query";
import { getCategories, getPlaces } from "../service/apiFetchFunctions";

export const ReportIssueScreen = () => {

    const categoriesQuery = useQuery("categories", getCategories, { staleTime: 60000 });
    const placesQuery = useQuery("places", getPlaces, { staleTime: 60000 });

    if (categoriesQuery.isError || placesQuery.isError) return (
        <div>Error</div>
    )
    if (categoriesQuery.isLoading || placesQuery.isLoading) return (
        <div className="h-100 d-flex align-items-center justify-content-center">
            <div className="spinner-border" role="status">
                you spin me
            </div>
        </div>
    );

    interface ICategory {
        _id: string;
        name: string;
    }

    interface IPlace {
        _id: string;
        name: string;
    }

    const places = placesQuery.data as IPlace[];
    const categories = categoriesQuery.data as ICategory[];

    console.log(placesQuery.data, placesQuery.data)
    return (
        <>

            <div style={{ backgroundColor: '', width: '35%', minHeight: '512px' }} className="divider text-justify"><h3 style={{ textAlign: "center" }}>Instrukcja</h3>
                {/* {" 📄 Formularz 📄 znajdujący się 🔍 na tej stronie 🌐 umożliwia ✨ zgłoszenie 📥 wystąpienia 🚨 usterki 🔧 związanej z komputerem 💻, dziennikiem 📓, rzutnikiem 📽, itp. ℹ️ W tym celu ➡️ należy 📝 wypełnić formularz 📄, podając 🖊️ dane 🆔 na temat osoby 🧑‍💻, która zgłasza 📣 wystąpienie problemu ❗, wskazać 👉 lokalizację 📍 usterki 🔧 (numer sali 🏫) 📍, a także 🤝 pozostawić ✍️ zwięzły opis 📝 tego, co się stało 💥, oraz 🛠️ wybrać ✔️ jedną z dostępnych kategorii 📑 zgłoszenia 📥. Do zgłoszenia 📨 jest przypisywany 🔄 domyślny priorytet 🚦, który wynika 🧾 z kategorii ⚠️. "} */}
                <div style={{ color: '#8F8F8F', marginRight: '28px', marginLeft: '28px' }}>Formularz znajdujący się na tej stronie umożliwia zgłoszenie wystąpienia usterki związanej z komputerem, dziennikiem, rzutnikiem itp.
                    W tym celu należy wypełnić formularz, podając dane na temat osoby, która zgłasza wystąpeinie problemu, wskazać lokalizację usterki (numer sali),
                    a także pozostawić zwięzły opis tego co się stało oraz wybrać jedną z dostępnych kategorii zgłoszenia. Do zgłoszenia jest przypisywany domyślny priorytet, który wynika z kategorii.
                </div>
            </div>
            <div style={{ backgroundColor: '', width: '65%', marginLeft: '28px' }} className="content-padding text-justify"><h3 style={{ textAlign: "center" }}>Zgłoś usterkę</h3>



                <label>miejsce usterki:</label>
                <br />

                {/* <div class="dropdown">
        <button className="dropbtn">miejsce usterki</button>
        <div className="dropdown-content">
            <a href="#">10</a>
            <a href="#">11</a>
            <a href="#">12</a>
         </div>
         </div> */}


                <select>
                    {
                        places.map(place => (
                            <option value={place._id}>{place.name}</option>
                        ))
                    }
                </select>

                <br />
                <label>opis usterki</label>
                <br /><textarea className="textInput"></textarea><br></br>
                <label>kategoria zgłoszenia:</label>
                <br /><select>

                    {
                        categories.map(place => (
                            <option value={place._id}>{place.name}</option>
                        ))
                    }
                </select><br />


                <button className="mainButton trashButton">Wyczyść</button>        <button className="mainButton">Wyślij</button>

            </div>


        </>
    )
}
