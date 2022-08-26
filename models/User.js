import Model from "sequelize";
import Datatype from "sequelize";
import bcrypt from "bcrypt";


// Import connection file
import sequelize from '../config/connection.js';

const User = sequelize.define('User', {
        id: {
            type: Datatype.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: Datatype.STRING,
            allowNull: false
        },
        email: {
            type: Datatype.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            } 
        },
        password: {
            type: Datatype.STRING,
            allowNull: false,
            validate: {
                len: [8]
            }
        }
    },
    {
        hooks: {
            beforeCreate: async (newUserData) => {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);

User.prototype.checkPassword = (loginPw, hashedPassword) => {
        return bcrypt.compareSync(loginPw, hashedPassword);
};

export default User;




