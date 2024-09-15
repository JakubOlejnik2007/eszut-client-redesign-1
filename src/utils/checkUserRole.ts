import TUserRole from "../types/userroles.enum";

const checkUserRole = (minRole: TUserRole, userRole: TUserRole) => userRole >= minRole;

export default checkUserRole;