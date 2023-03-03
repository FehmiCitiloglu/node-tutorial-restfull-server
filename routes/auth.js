const express = require("express");
const { body } = require("express-validator");
const User = require("../models/user");
const {
  signup,
  login,
  getUserStatus,
  updateUserStatus,
} = require("../controllers/auth");
const isAuth = require("../middleware/is-auth");
const router = express.Router();

router.put(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("E-Mail address already exists");
          }
        });
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 5 }),
    body("email").trim().not().isEmpty(),
  ],
  signup
);

router.post("/login", login);

router.get("/status", isAuth, getUserStatus);

router.patch(
  "/status",
  isAuth,
  [body("status").trim().not().isEmpty()],
  updateUserStatus
);

module.exports = router;
