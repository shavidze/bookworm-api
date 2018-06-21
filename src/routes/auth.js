import express from "express";
import User from "../models/User";

const router = express.Router();

router.post("/", (req, res) => {
  const { credentials } = req.body;
  User.findOne({ email: credentials.email }).then(user => {
    if (user && user.isValidPasswords(credentials.password)) {
      // console.log({ user: user.toAuthJSON() });
      return res.json({ user: user.toAuthJSON() });
    }
    return res.status(400).json({ errors: { global: "Invalid Credential" } });
  });
});

router.post("/confirmation", (req, res) => {
  const token = req.body.token;
  console.log("ager a", token);
  User.findOneAndUpdate(
    {
      confirmationToken: token
    },
    {
      confirmationToken: "",
      confirmed: true
    },
    {
      new: true
    }
  ).then(
    user =>
      user ? res.json({ user: user.toAuthJSON() }) : res.status(400).json({})
  );
});

export default router;
