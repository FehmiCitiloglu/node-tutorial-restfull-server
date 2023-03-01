const router = require("express").Router();
const { body } = require("express-validator");

const { getPosts, createPost, getPost } = require("../controllers/feed");

router.get("/posts", getPosts);

router.post(
  "/post",
  [
    body("title").isString().trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  createPost
);

router.get("/post/:postId", getPost);

module.exports = router;
