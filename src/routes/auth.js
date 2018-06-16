import express from "express";
import User from "../models/User";

const router = express.Router();

router.post("/", (req, res) => {
  const { credentials } = req.body;
  User.findOne({ email: credentials.email }).then(user => {
    if (user && user.isValidPasswords(credentials.passwords)) {
      req.json({ user: user.toAuthJSON() });
    } else {
      res.status(400).json({ errors: { global: "Invalid Credential" } });
    }
  });
});

export default router;
