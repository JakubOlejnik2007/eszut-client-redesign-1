import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NAVIGATION_ITEMS from "./navigationItems";

const shiftKeyMap: Record<string, string> = {
    "!": "1",
    "@": "2",
    "#": "3",
    "$": "4",
    "%": "5",
    "^": "6",
    "&": "7",
    "*": "8",
    "(": "9",
    ")": "0"
};

const useKeyboardNavigation = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.shiftKey) {
                const mappedKey = shiftKeyMap[e.key] || e.key; // Zamiana znaku na cyfrę
                const item = NAVIGATION_ITEMS.find(item => mappedKey === String(item.id));
                
                if (item) {
                    navigate(item.path);
                    e.preventDefault();
                }
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [navigate]);

};

export default useKeyboardNavigation;
