const { withAuth } = require("../utils/auth");
const { Post, User, Comment } = require("../models");

const router = require("express").Router();

// landing page
router.get("/", async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [{ model: Comment }, { model: User, through: Comment }],
    });
    let posts2;

    posts2 = posts.map((q) => q.get({ plain: true }));

    // .get({ plain: true })),
    const data = {
      posts: posts2,
    };
    // const data = posts;
    console.log("data", data);
    res.render("home", data);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// App (protected route)
router.get("/dashboard", withAuth, async (req, res) => {
  res.render("dashboard", { page: "app" });
});

// login page
router.get("/login", async (req, res) => {
  res.render("login", { page: "login" });
});

module.exports = router;
