import { useNavigate } from 'react-router-dom';
import TNavigationItem from "../../types/navigationItem.type";
import EUserRole from "../../types/userroles.enum";
import checkUserRole from "../../utils/checkUserRole";

const NavItem = ({ path, name, isMenu, minUserRole, userRole, maxUserRole }: TNavigationItem & { userRole: EUserRole }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(path);
    };

    return isMenu && checkUserRole(minUserRole, userRole, maxUserRole) ? (
        <button className='navButton' onClick={handleClick}>
            {name}
        </button>
    ) : <></>;
}

export default NavItem;
