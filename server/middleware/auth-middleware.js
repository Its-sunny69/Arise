import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";
import User from "../models/userModal.js";

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1];

  try {

    const isVerified = jwt.verify(token, process.env.JWT_SECRET);
    const id = isVerified.userId;

    const userData = await User.findOne({ _id: id }).select({ password: 0 });
    // console.log(userData);

    req.userId = userData._id;
    req.user = userData;
    req.token = token;

    next();
  } catch (err) {
    console.error(err.message);
    res.status(403).json({ msg: "Token is not valid, Unauthorized Access" });
  }
};

export default authMiddleware;
