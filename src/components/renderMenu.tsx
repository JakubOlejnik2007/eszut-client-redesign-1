import { Routes, Route } from "react-router-dom"
import NAVIGATION_ITEMS from "./partials/navigationItems"
import WindowWrapper from "./windowWrapper"
import { AuthData } from "../auth/AuthWrapper";

const RenderMenu = () => {

    const { user } = AuthData();

    return (
        <Routes>
            {
                NAVIGATION_ITEMS.map((item, index) =>
                    <Route
                        key={index}
                        path={item.path}
                        element={<WindowWrapper title={item.name} element={item.element} minUserRole={item.minUserRole} userRole={user === null ? 0 : user.role} />}
                    />
                )
            }
        </Routes>
    )
}

export default RenderMenu;