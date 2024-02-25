import usermodel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

class userController {
  static userRegistration = async (req, res) => {
    const { name, email, password, confirmPassword, termsConditions } =
      req.body;
    const user = await usermodel.findone({ email: email });
    if (user) {
      return res.status(400).json({ message: "Email Already Exist" });
    } else {
      if (name && email && password && confirmPassword && termsConditions) {
        if (password !== confirmPassword) {
            try{
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
          const document = new usermodel({
            name: name,
            email: email,
            password: hashedPassword,
            termsConditions: termsConditions,
          });
         await document.save();
        }catch(err) {
            console.log(err);
            res.status(400).json({ message: "Something went wrong" });
        }
        }
      } else {
        res.status(400).json({ message: "Password Not Match" });
      }
    }
    res.status(400).json({ message: "All fields are required" });
  };
}

export default userController;