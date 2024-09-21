export enum ENotifType {
    SUCCESS,
    ERROR,
}

interface NotifData {
    message: string;
    type: ENotifType
}

export default NotifData