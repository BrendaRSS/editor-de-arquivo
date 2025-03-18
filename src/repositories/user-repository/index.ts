import { where } from "sequelize";
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

async function updateUser(id: number, body: UserType) {
    return await User.update(body, { where: { id }})
}

async function deleteUser(id: number) {
    return await User.destroy({
        where: { id }
    })
}

const userRepository = {
    findByEmail,
    create,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};

export default userRepository;