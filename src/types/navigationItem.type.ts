import { ReactNode } from "react";
import TUserRole from "./userroles.enum";

type TNavigationItem = {
    id: string,
    path: string,
    name: string,
    element: ReactNode,
    isMenu: boolean,
    minUserRole: TUserRole
}

export default TNavigationItem;