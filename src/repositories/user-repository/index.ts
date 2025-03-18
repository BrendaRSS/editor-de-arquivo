import User from "../../models/User";
import { UserType } from "../../types";

async function findByEmail(email: string): Promise<User | null> {
    return await User.findOne({
        where: { email }
    });
}

async function create(body: UserType): Promise<User> {
    return await User.create(body);
}

async function getAllUsers(): Promise<User[]> {
    return await User.findAll();
}

async function getUserById(id: number): Promise<User | null> {
    return await User.findByPk(id);
}

const userRepository = {
    findByEmail,
    create,
    getAllUsers,
    getUserById
};

export default userRepository;