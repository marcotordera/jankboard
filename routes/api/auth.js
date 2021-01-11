const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

//User model
const User = require("../../models/Users");
//@route POST api/auth/login
//@desc login user
//@acess Public
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // validation
  if (!email || !password) {
    return res.status(400).json({ msg: "please enter all fields" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) throw Error("User does not exist");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw Error("Invalid credentials");

    const token = jwt.sign(
      { id: user.id, name: user.name },
      config.get("jwtSecret"),
      { expiresIn: 3600 }
    );
    if (!token) throw Error("Couldnt sign the token");
    res.json({
      token,
      user: {
        _id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});
//@route POST api/auth/register
//@desc register user
//@acess Public
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  // validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "please enter all fields" });
  }
  try {
    const user = await User.findOne({ email });
    if (user) throw Error("User already exists");

    const salt = await bcrypt.genSalt(10);
    if (!salt) throw Error("Something went wrong with bcrypt");

    const hash = await bcrypt.hash(password, salt);
    if (!hash) throw Error("Something went wrong hashing the password");

    const newUser = new User({
      name,
      email,
      password: hash,
    });

    const savedUser = await newUser.save();
    if (!savedUser) throw Error("Something went wrong saving the user");

    const token = jwt.sign(
      { id: savedUser._id, name: savedUser.name },
      config.get("jwtSecret"),
      {
        expiresIn: 3600,
      }
    );

    res.status(200).json({
      token,
      user: {
        _id: savedUser.id,
        name: savedUser.name,
        email: savedUser.email,
      },
    });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

//@route GET api/auth/user
//@desc Get user data
//@acess private
router.get("/user", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) throw Error("User does not exist");
    res.json(user);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});
module.exports = router;
