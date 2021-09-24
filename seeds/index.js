const sequelize = require("../config/connection");
const Sequelize = require("sequelize");
const { User, Post, Comment } = require("../models");

const userData = require("./userData.json");
const postData = require("./postData.json");
const commentData = require("./commentData.json");

const createDatabase = async () => {
  // get sequelize configuration
  const config = sequelize.config;
  // create new sequelize object based on the original without the db name
  const sequelize2 = new Sequelize(
    `mysql://${config.username}:${config.password}@${config.host}:${config.port}`
  );
  // drop existing db if it exists
  let result = await sequelize2.query(
    `DROP DATABASE IF EXISTS ${config.database};`
  );
  // log result to console
  console.log("Drop and create database", result);
  // create new database
  result = await sequelize2.query(`CREATE DATABASE ${config.database};`);
  // log results to console
  console.log("Drop and create database", result);
};

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const posts = await Post.bulkCreate(postData, {
    returning: true,
  });

  const comments = await Comment.bulkCreate(commentData, {
    returning: true,
  });
};

createDatabase().then(() => {
  seedDatabase().then(() => {
    process.exit();
  });
});
