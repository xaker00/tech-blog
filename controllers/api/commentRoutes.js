const router = require("express").Router();
const { Comment } = require("../../models");
const { withAuthApi } = require("../../utils/auth");

router.post("/", withAuthApi, async (req, res) => {
  try {
    const dbCommentData = await Comment.create({
      ...req.body,
      userId: req.session.userId,
    });
    res.status(201).json(dbCommentData);
  } catch (err) {
    // output error to console
    console.log(err);
    // send error to client
    res.status(500).json(err.message);
  }
});

module.exports = router;