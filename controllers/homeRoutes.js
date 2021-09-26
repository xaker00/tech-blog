const { withAuth } = require("../utils/auth");
const { Post, User, Comment } = require("../models");

const router = require("express").Router();

// landing page
router.get("/", async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        { model: Comment, include: [{ model: User, attributes: ["name"] }] },
      ],
    });
    let posts2;

    posts2 = posts.map((q) => q.get({ plain: true }));

    // .get({ plain: true })),
    const data = {
      posts: posts2,
      loggedIn: req.session.loggedIn,
    };
    // const data = posts;
    console.log("data", data);
    res.render("home", data);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.get("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findOne({
      where:{id:req.params.id},
      include: [
        { model: Comment, include: [{ model: User, attributes: ["name"] }] },
        { model: User },
      ],
    });

    // TODO: add 404 page

    const data = {
      post: post.get({ plain: true }),
      loggedIn: req.session.loggedIn,
    };
    // const data = posts;
    console.log("data", data);
    res.render("post", data);
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
  if(req.session.loggedIn){
    res.redirect('/');
    return;
  }
  res.render("login", { page: "login" });
});

module.exports = router;
