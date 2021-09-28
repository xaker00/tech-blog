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
      order: [['created_at','DESC']],
    });
    let posts2;

    posts2 = posts.map((q) => q.get({ plain: true }));
    posts2.forEach((q,i)=>{q.snippet = posts[i].snippet()});

    const data = {
      posts: posts2,
      loggedIn: req.session.loggedIn,
    };
    console.log("data", data);
    res.render("home", data);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.get("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.id },
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

router.get("/edit-post/:id", withAuth, async (req, res) => {
  try {
    let post = await Post.findOne({
      where: { id: req.params.id },
      include: [
        { model: Comment, include: [{ model: User, attributes: ["name"] }] },
        { model: User },
      ],
    });

    if(post)post = post.get({ plain: true });

    // TODO: add 404 page

    const data = {
      post,
      id: post?.id || 0,
    };
    console.log("data", data);
    res.render("postEdit", data);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Dashboard (protected route)
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const posts = await Post.findAll({
      where: { author: req.session.userId },
      include: [
        { model: Comment, include: [{ model: User, attributes: ["name"] }] },
      ],
      order: [['created_at','DESC']],
    });
    let posts2;

    posts2 = posts.map((q) => q.get({ plain: true }));
    posts2.forEach((q,i)=>{q.snippet = posts[i].snippet()});

    const data = {
      posts: posts2,
      loggedIn: req.session.loggedIn,
      name: (await User.findByPk(req.session.userId)).name,
    };
    console.log("data", data);
    res.render("dashboard", data);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// login page
router.get("/login", async (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login", { page: "login" });
});

module.exports = router;
