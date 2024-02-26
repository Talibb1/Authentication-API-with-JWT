import bcrypt from "bcrypt";
import UserModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const user = await UserModel.findOne({ email: email });
      if (user != null) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (user.email === email && isMatch) {
          // Generate JWT Token
          const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' })
          return res.status(201).json({ message: "Login Success", token: token });
        } else {
          return res
            .status(400)
            .json({ message: "Email or Password is not Valid" });
        }
      } else {
        return res
          .status(400)
          .json({ message: "You are not a Registered User" });
      }
    } else {
      return res.status(400).json({ message: "All Fields are Required" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Unable to Login" });
  }
};

export default userLogin;


// {
//     "email": "talib123@gmail.com",
//     "password": "123"
// }