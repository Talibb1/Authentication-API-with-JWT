import bcrypt from "bcrypt";
import UserModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


const userRegistration = async (req, res) => {
  const { name, email, password, confirmPassword, termsConditions } = req.body;
  const user = await UserModel.findOne({ email: email });

  if (user) {
    return res.status(400).json({ message: "Email Already Exist" });
  } else {
    if (name && email && password && confirmPassword && termsConditions) {
      if (password === confirmPassword) {
        try {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
          const document = new UserModel({
            name: name,
            email: email,
            password: hashedPassword,
            termsConditions: termsConditions,
          });
          await document.save();
          // jwt token configuration
          const saved_user = await UserModel.findOne({ email: email })
          const token = jwt.sign({ userID: saved_user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
        //   const token = jwt.sign({ userID: saved_user._id }, process.env.JWT_SECRET_KEY, { expiresIn: 60 * 60 });
          return res.status(201).json({ message: "Message Saved Successfully", token: token });
        } catch (err) {
          console.log(err);
          return res.status(400).json({ message: "Something went wrong" });
        }
      } else {
        return res.status(400).json({ message: "Password Not Match" });
      }
    } else {
      return res.status(400).json({ message: "All fields are required" });
    }
  }
};

export default userRegistration;

// {
//     "name": "ahans",
//     "email": "talib123@gmail.com",
//     "password": "123",
//     "confirmPassword": "123",
//     "termsConditions": true

// }
