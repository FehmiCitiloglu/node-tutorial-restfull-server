const router = require("express").Router();
const { body } = require("express-validator");
const isAuth = require("../middleware/is-auth");

const {
  getPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
} = require("../controllers/feed");

router.get("/posts", isAuth, getPosts);

router.post(
  "/post",
  isAuth,
  [
    body("title").isString().trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  createPost
);

router.get("/post/:postId", isAuth, getPost);

router.put(
  "/post/:postId",
  isAuth,
  [
    body("title").isString().trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  updatePost
);

router.delete("/post/:postId", isAuth, deletePost);

module.exports = router;
