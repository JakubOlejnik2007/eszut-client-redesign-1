import { createContext, ReactNode, useContext, useState } from "react";
import NotifData from "../types/notification.interface";



const NotifContext = createContext<{
    displayNotif: (data: NotifData) => void
}>({
    displayNotif: () => { },
});

export const Notif = () => useContext(NotifContext);

const NotificationsWrapper = ({ children }: { children: ReactNode }) => {

    const [notifData, setNotifData] = useState<NotifData | null>(null)

    const displayNotif = (data: NotifData) => {
        console.log(data)
        setNotifData(data);
        setTimeout(() => {
            setNotifData(null);
            console.log("Notification cleared")
        }, 5000)
    }

    return (
        <NotifContext.Provider value={{ displayNotif }}>
            {
                notifData && <div
                    style={{ position: 'fixed', left: 10, bottom: 10 }}>
                    {
                        notifData.message
                    }
                </div>
            }
            {children}
        </NotifContext.Provider>
    );
}

export default NotificationsWrapper;