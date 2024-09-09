import { Router } from "express";
import { NotificationController as controller } from "../../controllers";
import { jwtMiddleware } from "../../middleware/jwt-auth.middleware";

export const NotificationRouter = Router();

NotificationRouter.get("/", jwtMiddleware, controller.listByUser);
NotificationRouter.get("/:id", jwtMiddleware, controller.findById);