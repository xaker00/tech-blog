const router = require("express").Router();
const { Post } = require("../../models");
const { withAuthApi } = require("../../utils/auth");

router.post("/", withAuthApi, async (req, res) => {
  try {
    console.log("body", req.body);
    const dbPostData = await Post.create({
      ...req.body,
      author: req.session.userId,
    });
    res.status(201).json(dbPostData);
  } catch (err) {
    // output error to console
    console.log(err);
    // send error to client
    res.status(500).json(err.message);
  }
});

router.put("/:id", withAuthApi, async (req, res) => {
  try {
    console.log("body", req.body);
    const count = await Post.update(
      {
        ...req.body,
      },
      { where: { author: req.session.userId, id: req.params.id } }
    );
    if(count){
      const dbPostData = await Post.findByPk(req.params.id);
      res.status(201).json(dbPostData);
    }
  } catch (err) {
    // output error to console
    console.log(err);
    // send error to client
    res.status(500).json(err.message);
  }
});


router.delete("/:id", withAuthApi, async(req,res)=>{
  try{
    const count = await Post.destroy({where:{id:req.params.id, author:req.session.userId}});
    if(count){
      res.status(204).json({message: `${count} item(s) deleted`});
      return;
    }else{
      res.status(404);
      return;
    }

  }catch(err){
    // output error to console
    console.log(err);
    // send error to client
    res.status(500).json(err.message);
  }
});

module.exports = router;
