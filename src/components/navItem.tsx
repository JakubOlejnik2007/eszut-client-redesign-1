import TNavigationItem from "../types/navigationItem.type";
import TUserRole from "../types/userroles.enum";
import checkUserRole from "../utils/checkUserRole";

const NavItem = ({ path, name, isMenu, minUserRole, userRole }: TNavigationItem & { userRole: TUserRole }) => {
    return isMenu && checkUserRole(minUserRole, userRole) ? <button className='navButton' value={path}>{name}</button> : <></>
}

export default NavItem;