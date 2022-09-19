import Model from "sequelize";
import Datatype from "sequelize";


// Import connection file
import sequelize from '../config/connection.js';

const Comment = sequelize.define('Comment', {
        id: {
            type: Datatype.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        text: {
            type: Datatype.STRING,
            allowNull: false
        },
        creation_date: {
            type: Datatype.DATE,
            allowNull: false
        },
        updated_at: {
            type: Datatype.DATE,
            allowNull: true
        },
        post_id: {
            type: Datatype.INTEGER,
            allowNull: false,
            references: {
                model: 'post',
                key: 'id'
            }
        },
        user_id: {
            type: Datatype.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: true,
        createdAt: 'creation_date',
        updatedAt: 'updated_at',
        freezeTableName: true,
        underscored: true,
        modelName: 'comment'
    }
)

export default Comment
