import User from "./User.js";
import Post from "./Post.js";
import Comment from "./Comment.js";

User.hasMany(Post, {
    foreignKey: 'user_id' 
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

export { User, Post, Comment };