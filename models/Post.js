import {Model, Datatypes} from Sequelize;

// Import connection file
import sequelize from './config/connection.js';

class Post extends Model {};

Post.init (
    {
        id: {
            type: Datatypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Datatypes.STRING,
            allowNull: false
        },
        contents: {
            type: Datatypes.STRING,
            allowNull: false
        },
        creation_date: {
            type: Datatypes.DATE,
            allowNull: false
        },
        updated_at: {
            type: Datatypes.DATE,
            allowNull: true
        },
        user_id: {
            type: Datatypes.INTEGER,
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
        modelName: 'post'
    }
)

export default Post;
