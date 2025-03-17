import User from "../../models/User";
import { UserType } from "../../types";

async function findByEmail(email: string) {
    return await User.findOne({
        where: { email }
    });
}

async function create(body: UserType) {
    return await User.create(body);
}

async function getAllUsers() {
    return await User.findAll();
}

const userRepository = {
    findByEmail,
    create,
    getAllUsers,
};

export default userRepository;