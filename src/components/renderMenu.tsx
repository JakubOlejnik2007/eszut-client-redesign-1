import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import NAVIGATION_ITEMS from "../utils/navigationItems";
import WindowWrapper from "./windowWrapper";
import { AuthData } from "../auth/AuthWrapper";
import EUserRole from "../types/userroles.enum";

const RenderMenu = () => {
    const { user } = AuthData();
    const navigate = useNavigate();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.altKey) {
                const item = NAVIGATION_ITEMS.find(item => e.key === String(item.id));
                if (item) {
                    navigate(item.path);
                }
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [navigate]);

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
