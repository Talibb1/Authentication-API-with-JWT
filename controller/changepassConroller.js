import bcrypt from "bcrypt";
import UserModel from "../models/userModel.js";

const changeUserPassword = async (req, res) => {
  const { password, password_confirmation } = req.body;
  if (password && password_confirmation) {
    if (password !== password_confirmation) {
      return res.status(400).json({
        message: "New Password and Confirm New Password doesn't match",
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      const newHashPassword = await bcrypt.hash(password, salt)
      await UserModel.findByIdAndUpdate(req.user._id, {
        $set: { password: newHashPassword }});
      return res.status(201).json({ message: "Password changed succesfully" });
    }
  } else {
    return res.status(400).json({ message: "All Fields are Required" });
  }
};




export default changeUserPassword;

// {
//     "name": "ahans",
//     "email": "talib123@gmail.com",
//     "password": "123",
//     "confirmPassword": "123",
//     "termsConditions": true

// }
