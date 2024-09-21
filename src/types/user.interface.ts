import { AuthenticationResult } from "@azure/msal-browser";
import EUserRole from "./userroles.enum";

interface IUser {
    role: EUserRole;
    AuthRole: AuthenticationResult;
}

export default IUser;