import TNavigationItem from "../types/navigationItem.type";
import EUserRole from "../types/userroles.enum";
import checkUserRole from "../utils/checkUserRole";

const NavItem = ({ path, name, isMenu, minUserRole, userRole }: TNavigationItem & { userRole: EUserRole }) => {
    return isMenu && checkUserRole(minUserRole, userRole) ? <button className='navButton' value={path}>{name}</button> : <></>
}

export default NavItem;