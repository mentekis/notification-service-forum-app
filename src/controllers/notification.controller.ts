import { Request, Response } from "express";
import { responseGenerator } from "../utils";
import { NotificationService } from "../services";

const controller = {
    listByUser: async (req: Request, res: Response) => {
        try {
            // Get user data from locals
            const user = res.locals.user;

            const result = await NotificationService.listByUser(user._id);

            const response = NotificationService.mapListNotifications(result);

            return responseGenerator.generatedResponse(res, { data: response });
        } catch (error) {
            const issue = (error as Error).message;

            return responseGenerator.generatedResponse(res, { status: 400, message: issue });
        }
    },

    findById: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            const result = await NotificationService.findById(id);

            const response = NotificationService.mapNotification(result);

            return responseGenerator.generatedResponse(res, { data: response });
        } catch (error) {
            const issue = (error as Error).message;

            return responseGenerator.generatedResponse(res, { status: 400, message: issue });
        }
    }
}

export { controller };