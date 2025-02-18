import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthData } from "../../auth/AuthWrapper";
import EUserRole from "../../types/userroles.enum";
import NAVIGATION_ITEMS from "../../utils/navigationItems";
import NavItem from "./navItem";
import urls from "../../utils/urls";

const Navbar = () => {
    const { user, logout } = AuthData();
    const navigate = useNavigate();
    const [navBarShown, setNavBarShown] = useState(false); // State for navbar visibility

    return (
        <nav className="navbar">
            <div
                className="logo"
                onClick={() => user ? navigate(urls.client.reportProblem) : navigate(urls.client.mainpage)}
            >ESZUT
            </div>
            <div className="hamburgerButton" onClick={() => setNavBarShown(prev => !prev)}>☰</div>

            <div className={navBarShown ? "navBarDynamic" : "navBarDynamic navBarHidden"}>
                {NAVIGATION_ITEMS.map((item, index) => (
                    <NavItem key={index} {...item} userRole={user?.role ?? EUserRole.GUEST} />
                ))}

                {user ? (
                    <button
                        className="navButton"
                        onClick={() => {
                            logout();
                            navigate(urls.client.mainpage);
                        }}>Wyloguj się</button>) : (<button className="navButton" onClick={() => navigate(urls.client.mainpage)}>Zaloguj się</button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
