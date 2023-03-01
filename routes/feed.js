const router = require("express").Router();
const { body } = require("express-validator/check");

const { getPosts, createPost } = require("../controllers/feed");

router.get("/posts", getPosts);

router.post(
  "/post",
  [
    body("title").isString().trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  createPost
);

module.exports = router;
