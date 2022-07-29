const User = require("../model/user");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  checkToken,
  checKTokenAndSeller,
  checkTokenAndAuthorization,
} = require("../middlewares/middlewares");

// register User
router.post("/signup", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) res.status(409).json({ msg: "User is already existing" });
    else {
      const unhashedPassword = req.body.password;
      const hash = await bcrypt.hash(unhashedPassword, 10);
      const user = await User.create({ ...req.body, password: hash });
      res.json({ success: true, data: user });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// --------------
router.post("/signin", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(401).send("Please provide valid credentials!");
    } else {
      const valid = await bcrypt.compare(req.body.password, user.password);
      if (valid) {
        const token = jwt.sign(
          {
            id: user._id,
            role: user.role,
            username: user.username,
          },
          process.env.SECRETE_JWT
          // { expiresIn: "24hr" }
        );
        const isAdmin = user.role.toLowerCase() === "seller" ? true : false;
        res.json({
          success: true,
          data: token,
          isAdmin: isAdmin,
          id: user._id,
          profileImage: user.profileImage,
        });
      } else {
        res.status(401).send("Please provide valid credentials!");
      }
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// get all the users only allowed for the admin/seller
router.get("/", checKTokenAndSeller, async (req, res, next) => {
  const query = req.query.new;

  try {
    let users;
    if (query) {
      users = await User.find().sort({ _id: -1 }).limit(1);
    } else {
      users = await User.find();
    }
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", checKTokenAndSeller, async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch("/:id", checkTokenAndAuthorization, async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", checkTokenAndAuthorization, async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send("Deleted successfully!");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
