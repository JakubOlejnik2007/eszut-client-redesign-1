import EUserRole from "../types/userroles.enum";

const checkUserRole = (minRole: EUserRole, userRole: EUserRole) => userRole >= minRole;

export default checkUserRole;