const bcrypt = require("bcryptjs");
const validator = require("validator");

const User = require("../models/user");

module.exports = {
  async createUser(args, req) {
    const { email, password, name } = args.userInput;
    const errors = [];

    if (!validator.isEmail(email)) {
      errors.push({ message: "E-Mail is invalid." });
    }

    if (
      validator.isEmpty(password) ||
      !validator.isLength(password, { min: 5 })
    ) {
      errors.push({ message: "Password is too short!" });
    }

    if (errors.length > 0) {
      const error = new Error("Invalid Input");
      error.data = errors;
      error.code = 422;
      throw error;
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const error = new Error("User exists already!");
      throw error;
    }

    const hashedPw = await bcrypt.hash(password, 12);
    const user = new User({
      email,
      name,
      password: hashedPw,
    });
    const createdUser = await user.save();
    console.log("createdUser._id", createdUser._id.equals(createdUser._id));
    return {
      ...createdUser._doc,
      _id: createdUser._id.toString(),
    };
  },
};
