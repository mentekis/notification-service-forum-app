import { IThread } from "../dto/thread.dto";
import { ThreadRepo } from "../repositories";


export const service = {
    findById: async (id: string) => {
        return await ThreadRepo.findById(id);
    },

    create: async (requestData: IThread) => {
        // Store data to database by given request data
        // Pass rquest data to reposuitory
        const result = await ThreadRepo.create(requestData);

        return result;
    },

    update: async (requestData: IThread, id: string) => {
        return await ThreadRepo.update(id, requestData);
    },

    mapSingleThread: (thread: any) => {
        return mapSingleThread(thread);
    },

    mapListThreads: (threads: any[]) => {
        return threads.map((thread) => {
            return mapSingleThread(thread);
        });
    },
}

const mapSingleThread = (thread: IThread): IThread => {
    return {
        _id: thread._id,
        title: thread.title,
    }
}