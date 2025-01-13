import { useNavigate } from "react-router-dom";
import { AuthData } from "../../auth/AuthWrapper";
import EUserRole from "../../types/userroles.enum"
import NAVIGATION_ITEMS from "../partials/navigationItems"
import NavItem from "./navItem"
import urls from "../../utils/urls";

const Navbar = () => {

    const { user, logout } = AuthData();

    const navigate = useNavigate();

    console.log("navbar")

    return (

        <nav className='navbar'>

            <div className='logo' onClick={() => user ? navigate(urls.client.reportProblem) : navigate(urls.client.mainpage)}>ESZUT</div>
            {
                NAVIGATION_ITEMS.map((item, index) => <NavItem key={index} {...item} userRole={user !== null && user.role !== null ? user.role : EUserRole.GUEST} />)
            }


            {
                user !== null && user.AuthRole !== null ? <button className='navButton' onClick={() => {
                    logout();
                    navigate(urls.client.mainpage);
                }}>Wyloguj się</button> : <button className='navButton' onClick={() => navigate(urls.client.mainpage)}>Zaloguj się</button>
            }


        </nav>

    )
}

export default Navbar;
