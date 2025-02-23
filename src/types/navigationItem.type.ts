import { ReactNode } from "react";
import EUserRole from "./userroles.enum";

type TNavigationItem = {
    id: string,
    path: string,
    name: string,
    element: ReactNode,
    isMenu: boolean,
    minUserRole: EUserRole;
    maxUserRole?: EUserRole;
}

export default TNavigationItem;