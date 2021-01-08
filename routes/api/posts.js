const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

//item model
const Posts = require("../../models/Posts");

////////////////////////// posts///////////////////////////

//@route GET api/posts
//@desc Get All root posts
//@acess public
router.get("/", (req, res) => {
  Posts.find()
    .sort({ date: -1 })
    .then((posts) => res.json(posts));
});

//@route POST api/posts/
//@desc create a post
//@acess private
router.post("/", auth, (req, res) => {
  const newPost = new Posts({
    userId: req.user.id,
    userName: req.user.name,
    text: req.body.text,
  });
  newPost.save().then((post) => res.json(post));
});

//@route put api/posts/:id
//@desc edit a post
//@acess private
router.put("/:id", auth, (req, res) => {
  Posts.findById(req.params.id, function (err, post) {
    if (err) {
      console.log(err);
    } else {
      post.text = req.body.text;
      post.save().then((post) => res.json(post));
    }
  });
});

//@route DELETE api/posts/:id
//@desc Delete a post
//@acess private
router.delete("/:id", auth, (req, res) => {
  Posts.findById(req.params.id).then((post) =>
    post
      .remove()
      .then(() => res.json({ success: true }))
      .catch((err) => res.status(404).json({ success: false }))
  );
});

////////////////////////// comments///////////////////////////

//@route post api/comments/:id
//@desc add a comment to a post
//@acess private
router.post("/comments/", auth, (req, res) => {
  Posts.findById(req.body.id, function (err, post) {
    if (err) {
      console.log(err);
    } else {
      let newreply = {
        userId: req.user.id,
        userName: req.user.name,
        text: req.body.text,
      };
      post.comments.unshift(newreply);
      post.save().then((post) => res.json(post));
    }
  });
});

//@route put api/comments/:id
//@desc edit a comment
//@acess private
router.put("/comments/:id", auth, (req, res) => {
  console.log(req.body);
  Posts.findById(req.body.postId, function (err, post) {
    if (err) {
      console.log(err);
    } else {
      post.comments.map((comment) => {
        if (comment._id == req.body.commentId) {
          comment.text = req.body.text;
        }
      });
      post.save().then((post) => res.json(post));
    }
  });
});
//@route DELETE api/comments/:id
//@desc Delete an comment
//@acess private
router.delete("/comments/:postId/:commentId", auth, (req, res) => {
  console.log(req.params);
  Posts.findById(req.params.postId).then((post) => {
    post.comments.map((comment) => {
      if (comment._id == req.params.commentId) comment.remove();
    });
    post.save().then((post) => res.json(post));
  });
});

module.exports = router;
