const router = require("express").Router();
const userRoutes = require("./userRoutes");
// const habitRoutes = require("./postRoutes");
// const logRoutes = require("./commentRoutes");

router.use("/users", userRoutes);
// router.use("/posts", postRoutes);
// router.use("/comments", commentRoutes);

module.exports = router;
