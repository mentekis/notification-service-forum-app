import { IUser } from "../../dto/user.dto";
import { NotificationService, ThreadService, userService } from "../../services";
import { rabbitmq } from "../../utils";


// Create new connection
// Start to listening channel
export async function startListenMessage() {
    try {
        // Listen to channel
        await rabbitmq.listenTo("newReply", async (msg) => {
            // Decode and destructure from message
            const { threadId, userId } = JSON.parse(msg.content.toString());
            console.log(threadId, userId);

            // Create notification data
            await NotificationService.create({ thread: threadId, user: userId, event: "New reply added" });

            // Request for data enrichment by emitting an event
            await rabbitmq.emitEventTo("newNotificationReply", {
                threadId, userId
            });
        });

        await rabbitmq.listenTo("updateUserData", (msg) => {
            // Decode the data from message to object
            const user: IUser = JSON.parse(msg.content.toString());

            // Update data using user service
            userService.update(user?._id, user?.name);
        });

        await rabbitmq.listenTo("enrichThreadNotifData", async (msg) => {
            // Update thread data by data proven from message
            const { threadId, title } = JSON.parse(msg.content.toString());

            // Search thread by ID.
            // Create new thread data if not exists
            const currentThread = await ThreadService.findById(threadId);

            if (currentThread) {
                return;
            }

            return await ThreadService.create({
                _id: threadId,
                title
            });
        });

        await rabbitmq.listenTo("enrichUserNotifData", async (msg) => {
            // Update user data using data proven from message
            const user = JSON.parse(msg.content.toString());

            return await userService.create(user._id, user.name);
        });

        await rabbitmq.listenTo("updateThreadTitle", async (msg) => {
            // Get data from mesage and only update the titile
            const { _id, title } = JSON.parse(msg.content.toString());

            return await ThreadService.update({ _id, title }, _id);

        });

    } catch (error) {
        throw error;
    }
}