const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const clip = require("text-clipper").default;

class Post extends Model {
  snippet() {
    return clip(this.body, 140, { html: true, maxLines: 5 });
  }
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.STRING(4096),
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    timestamps: true,
    underscored: true,
    modelName: "post",
  }
);

module.exports = Post;
