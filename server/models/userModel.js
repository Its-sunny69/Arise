import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//Creating user schema
const userSchema = new mongoose.Schema({
  username: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  points: { type: Number, require: true },
});

//Encrypting user password
userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) {
    next();
  }

  try {
    const saltRound = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(user.password, saltRound);

    user.password = hashPassword;
  } catch (error) {
    next(error);
  }
});

userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      { userId: this._id.toString(), email: this.email },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );
  } catch (error) {
    console.error(error);
  }
};

//Comparing Password
userSchema.methods.comparePassword = async function (password) {
  try {
    const result = await bcrypt.compare(password, this.password);
    return result;
  } catch (error) {
    console.error(error);
  }
};

//Creating model
const User = new mongoose.model("User", userSchema);

export default User;
