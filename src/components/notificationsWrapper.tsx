import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import NotifData from "../types/notification.interface";
import './NotificationStyles.css';

const NotifContext = createContext<{
    displayNotif: (data: NotifData) => void
}>({
    displayNotif: () => { },
});

export const Notif = () => useContext(NotifContext);

const NotificationsWrapper = ({ children }: { children: ReactNode }) => {
    const [notifData, setNotifData] = useState<NotifData | null>(null);
    const [show, setShow] = useState(false);
    const [progress, setProgress] = useState(100);

    const displayNotif = (data: NotifData) => {
        setNotifData(data);
        setShow(true);
        setProgress(100);

        const duration = 5000;

        const interval = setInterval(() => {
            setProgress((prev) => prev - (100 / (duration / 100)));
        }, 100);

        setTimeout(() => {
            setShow(false);
            setTimeout(() => setNotifData(null), 500);
            clearInterval(interval);
        }, duration);
    };

    return (
        <NotifContext.Provider value={{ displayNotif }}>
            {notifData && (
                <div className={`notification ${show ? 'fade-in' : 'fade-out'}`} style={{ position: 'fixed', left: 10, bottom: 10 }}>
                    <div className="notification-message">
                        {notifData.message}
                    </div>
                    <div className="progress-bar" style={{ width: `${100 - progress}%` }}></div>
                </div>
            )}
            {children}
        </NotifContext.Provider>
    );
};

export default NotificationsWrapper;
