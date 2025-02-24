import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import NAVIGATION_ITEMS from "../utils/navigationItems";
import WindowWrapper from "./windowWrapper";
import { AuthData } from "../auth/AuthWrapper";
import EUserRole from "../types/userroles.enum";
import useKeyboardNavigation from "../utils/UseKeyboardNavigations";

const RenderMenu = () => {
    const { user } = AuthData();
    const navigate = useNavigate();

    useKeyboardNavigation();

    return (
        <Routes>
            {NAVIGATION_ITEMS.map((item, index) => (
                <Route
                    key={index}
                    path={item.path}
                    element={
                        <WindowWrapper
                            title={item.name}
                            element={item.element}
                            minUserRole={item.minUserRole}
                            userRole={user?.role ?? EUserRole.GUEST}
                        />
                    }
                />
            ))}
        </Routes>
    );
};

export default RenderMenu;
