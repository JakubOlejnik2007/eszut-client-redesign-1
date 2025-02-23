import EUserRole from "../types/userroles.enum";

const checkUserRole = (minUserRole: EUserRole, userRole: EUserRole, maxUserRole: EUserRole = EUserRole.ADMIN) =>  minUserRole <= userRole && userRole <= maxUserRole;

export default checkUserRole;