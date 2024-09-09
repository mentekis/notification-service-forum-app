import { IUser } from "../dto/user.dto";
import { UserRepo } from "../repositories"


export const userService = {
    findById: async (id: string) => {
        return UserRepo.findById(id);
    },

    create: async (id: string, name: string) => {
        // Create new user instance using data from parameters
        const user: IUser = {
            _id: id,
            name,
        };

        return UserRepo.create(user);
    },

    update: async (id: string, name: string) => {
        // Find user in database
        // Skip operation if user is not exists
        const localUser = UserRepo.findById(id);

        if (!localUser) {
            return;
        }

        // Create new user instance using data from parameters
        const user: IUser = {
            _id: id,
            name,
        };

        return UserRepo.update(id, user);

    },

    mapUserResponse: (user: any): IUser => {
        return mapSingleUser(user);
    }
}

const mapSingleUser = (user: any): IUser => {
    return {
        _id: user._id,
        name: user.name
    };
}