import { useNavigate } from "react-router-dom";
import EUserRole from "../types/userroles.enum";
import { useEffect } from "react";

const WindowWrapper = ({ title, element, minUserRole, userRole }: { title: string, element: React.ReactNode } & { minUserRole: EUserRole, userRole: EUserRole }) => {

    const navigate = useNavigate();


    useEffect(() => {
        if (minUserRole > userRole) {

            navigate("/");
        }
    })
    return (
        <div className='window'>
            <div className='titleBar'>{title}</div>
            <div className='windowContent'>
                {element}
            </div>
        </div>
    )
}

export default WindowWrapper;