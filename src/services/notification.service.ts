import { INotification } from "../dto/notifications.dto";
import { NotificationRepo } from "../repositories";
import { ThreadService, userService } from ".";

export const service = {
    listByUser: async (userId: string) => {
        // Get list of notification by user ID via Repository
        const data = await NotificationRepo.getAllByUser(userId);

        return data;
    },

    findById: async (id: string) => {
        return await NotificationRepo.findById(id);
    },

    create: async (requestData: INotification) => {
        // Contruct data
        const data = {
            threadId: requestData.thread,
            userId: requestData.user,
            event: requestData.event,
        };

        // Store data to database by given request data
        // Pass rquest data to reposuitory
        const result = await NotificationRepo.create(data);

        return result;
    },

    mapNotification: (notification: any) => {
        return mapSingleNotification(notification);
    },

    mapListNotifications: (notifications: any[]) => {
        return notifications.map((notification) => {
            return mapSingleNotification(notification);
        });
    },
}

const mapSingleNotification = (notification: INotification): INotification => {
    return {
        _id: notification._id,
        event: notification.event,
        user: userService.mapUserResponse(notification.user),
        thread: ThreadService.mapSingleThread(notification.thread),
    }
}