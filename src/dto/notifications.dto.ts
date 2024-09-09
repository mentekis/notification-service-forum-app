import { IThread } from "./thread.dto";
import { IUser } from "./user.dto";

export interface INotification {
    event: string;
    _id?: string;
    user?: IUser | string;
    thread?: IThread | string | null;
}