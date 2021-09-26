// import models
const User = require("./user");
const Post = require("./post");
const Comment = require("./comment");

User.hasMany(Post, { foreignKey: "author" });
User.hasMany(Comment, { foreignKey: "user_id" });
Post.hasMany(Comment, { foreignKey: "post_id" });
Post.belongsTo(User, { foreignKey: "author" });
Comment.belongsTo(User, { foreignKey: "user_id" });
Comment.belongsTo(Post, { foreignKey: "post_id" });

module.exports = {
  User,
  Post,
  Comment,
};
