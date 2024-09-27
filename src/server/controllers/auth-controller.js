import User from "../../models/userModal.js";

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
      return res.status(400).json({ msg: "email already registerd" });
    }

    const userCreated = await User.create({ username, email, password });

    res.status(201).send({
      data: userCreated,
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    res.status(500).json("internal server error");
    console.error(error);
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
      res.status(401).json({ msg: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
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