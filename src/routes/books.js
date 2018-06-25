import express from "express";
import authenticate from "../middlewares/authenticate";

const router = express.Router();
router.use(authenticate);

router.get("/search", (req, res) => {
  res.json({});
});
