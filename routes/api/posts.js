const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

//item model
const Posts = require("../../models/Posts");

////////////////////////// posts///////////////////////////

//@route GET api/posts
//@desc Get All root posts
//@acess public
router.get("/", async (req, res) => {
  try {
    const posts = await Posts.find().sort({ date: -1 });
    if (!posts) throw Error("No posts");
    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

//@route POST api/posts/
//@desc create a post
//@acess private
router.post("/", auth, async (req, res) => {
  try {
    const newPost = new Posts({
      userId: req.user.id,
      userName: req.user.name,
      text: req.body.text,
    });
    const post = await newPost.save();
    if (!post) throw Error("Something went wrong saving the post");
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

//@route put api/posts/:id
//@desc edit a post
//@acess private
router.put("/:id", auth, async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (!post) throw Error("no matching post found");
    post.text = req.body.text;
    const saved = await post.save();
    if (!saved) throw Error("Something went wrong saving the post");
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

//@route DELETE api/posts/:id
//@desc Delete a post
//@acess private
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (!post) throw Error("no matching post found");
    const removed = await post.remove();
    if (!removed)
      throw Error("Something went wrong while trying to delete the post");
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

////////////////////////// comments///////////////////////////

//@route post api/comments/:id
//@desc add a comment to a post
//@acess private
router.post("/comments/", auth, async (req, res) => {
  let newreply = {
    userId: req.user.id,
    userName: req.user.name,
    text: req.body.text,
  };
  try {
    const post = await Posts.findById(req.body.id);
    if (!post) throw Error("no matching post found");
    post.comments.unshift(newreply);
    const saved = await post.save();
    if (!saved) throw Error("Something went wrong saving the post");
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

//@route put api/comments/:id
//@desc edit a comment
//@acess private
router.put("/comments/:id", auth, async (req, res) => {
  try {
    const post = await Posts.findById(req.body.postId);
    if (!post) throw Error("no matching post found");
    post.comments.map((comment) => {
      if (comment._id == req.body.commentId) {
        comment.text = req.body.text;
      }
    });
    const saved = await post.save();
    if (!saved) throw Error("Something went wrong saving the post");
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});
//@route DELETE api/comments/:id
//@desc Delete an comment
//@acess private
router.delete("/comments/:postId/:commentId", auth, async (req, res) => {
  try {
    const post = await Posts.findById(req.params.postId);
    if (!post) throw Error("no matching post found");
    post.comments.map((comment) => {
      if (comment._id == req.params.commentId) comment.remove();
    });
    const saved = await post.save();
    if (!saved) throw Error("Something went wrong saving the post");
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

module.exports = router;
