import { DataTypes, Model } from 'sequelize';
import sequelize from '../configs/database';

class User extends Model {
    public id!: number;
    public nome!: string;
    public idade!: number;
    public email!: string;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            // set() {
            //     throw new Error('O campo id não pode ser atualizado');
            // }
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        idade: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        }
    },
    {
        sequelize,
        modelName: 'User'
    }
);

export default User;