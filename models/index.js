// import models
const User = require("./user");
const Post = require("./post");
const Comment = require("./comment");

User.hasMany(Post, { foreignKey: "author" });
User.hasMany(Comment, { foreignKey: "user_id" });
Post.hasMany(Comment, { foreignKey: "post_id" });
// Post.hasOne(User, { foreignKey: "author" });

module.exports = {
  User,
  Post,
  Comment,
};
