import express from "express";
import User from "../models/User";
import { sendResetPassword } from "../mailer";

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

router.post("/reset_password_request", (req, res) => {
  console.log("HTTP -movida", req);
  User.findOneAndUpdate({ email: req.body.email }).then(user => {
    if (user) {
      console.log("mevida");
      sendResetPassword(user);
      res.json({});
    } else {
      res
        .status(400)
        .json({ errors: { global: "There is no user with such email" } });
    }
  });
});

export default router;
