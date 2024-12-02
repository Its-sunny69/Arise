import User from "../models/userModal.js";

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
    console.log(req.body);
    const { username, email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ msg: "Email is Already Registerd" });
    }

    const userCreated = await User.create({
      username,
      email,
      password,
      points: 0,
    });

    return res.status(201).send({
      msg: "Registerd Successfully",
      data: userCreated,
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
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

    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const isPasswordMatched = await userExist.comparePassword(password);

    if (isPasswordMatched) {
      res.status(200).json({
        msg: "Login successfully",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ msg: "Invalid Email or Password" });
    }
  } catch (error) {
    console.error("Login error", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

//user authentication logic
const user = async (req, res) => {
  try {
    const userData = await req.user;
    return res.status(200).json(userData);
  } catch (error) {
    console.error(error);
  }
};

const authControllers = { home, register, login, user };

export default authControllers;
