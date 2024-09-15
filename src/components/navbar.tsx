import EUserRole from "../types/userroles.enum"
import NAVIGATION_ITEMS from "../utils/navigationItems"
import NavItem from "./navItem"

const Navbar = (props: any) => {

    console.log("navbar")

    return (

        <nav className='navbar'>

            <div className='logo'>ESZUT</div>
            {
                NAVIGATION_ITEMS.map((item, index) => <NavItem key={index} {...item} userRole={EUserRole.USER} />)
            }



            <button className='navButton'>logIn</button>

        </nav>

    )
}

export default Navbar;
