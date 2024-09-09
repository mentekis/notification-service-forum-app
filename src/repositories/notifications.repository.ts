import { INotification } from "../dto/notifications.dto";
import { NotificationModel } from "./models";

export const repository = {
    getAllByUser: async (userId: string) => {
        const result = await NotificationModel.find({ user: userId }).populate(["user", "thread"]);

        return result;
    },

    findById: async (id: string) => {
        return await NotificationModel.findById(id).populate(["user", "thread"]);
    },

    create: async (data: INotification) => {
        const notification = new NotificationModel(data);

        return (await notification.save()).populate(["user", "thread"]);
    },

    update: async (id: string, data: INotification) => {
        return await NotificationModel.findByIdAndUpdate(id, data);
    },
}