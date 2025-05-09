import { AuthenticationResult } from "@azure/msal-browser";
import EUserRole from "./userroles.enum";

interface IUser {
    userId: string;
    email: string;
    username: string;
    role: EUserRole;
}

export default IUser;