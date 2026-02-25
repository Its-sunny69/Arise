import User from "../models/userModel.js";

//Home logic
const home = async (req, res) => {
  try {
    res.status(200).send("welcome from home");
  } catch (error) {
    console.error(error);
  }
};

//Registraion logic
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userExist = await User.findOne({ email });
    const userName = await User.findOne({ username });

    if (userName) {
      return res.status(400).json({ msg: "Username already exists" });
    }
    if (userExist) {
      return res.status(400).json({ msg: "Email is Already Registerd" });
    }

    const userCreated = await User.create({
      username,
      email,
      password,
      points: 0,
    });

    const token = await userCreated.generateToken();
    return res.status(201).json({
      msg: "Registerd Successfully",
      token: token,
    });
  } catch (error) {
    console.error("Error in Registration Logic", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

//Login logic
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (isPasswordMatched) {
      res.status(200).json({
        msg: "Login successfully",
        token: await user.generateToken(),
      });
    } else {
      res.status(401).json({ msg: "Invalid Email or Password" });
    }
  } catch (error) {
    console.error("Login error", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

//get user data logic
const user = async (req, res) => {
  try {
    const userId = await req.userId;

    const userData = await User.findOne({ _id: userId }).select({
      password: 0,
      email: 0,
      __v: 0,
    });

    if (!userData) {
      return res.status(404).json({ msg: "User not found" });
    }

    return res.status(200).json(userData);
  } catch (error) {
    console.error(error);
  }
};

const authControllers = { home, register, login, user };

export default authControllers;
