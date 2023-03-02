const router = require("express").Router();
const { body } = require("express-validator");

const {
  getPosts,
  createPost,
  getPost,
  updatePost,
} = require("../controllers/feed");

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

router.put(
  "/post/:postId",
  [
    body("title").isString().trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  updatePost
);

module.exports = router;
