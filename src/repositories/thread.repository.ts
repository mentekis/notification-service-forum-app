import { IThread } from "../dto/thread.dto";
import { ThreadModel } from "./models";

export const repository = {

    findById: async (id: string) => {
        return await ThreadModel.findById(id);
    },

    create: async (data: IThread) => {
        const user = new ThreadModel(data);

        return await user.save();
    },

    update: async (id: string, data: IThread) => {
        return await ThreadModel.findByIdAndUpdate(id, data);
    },
}