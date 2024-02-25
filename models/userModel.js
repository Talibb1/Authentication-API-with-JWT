import mongoose from "mongoose";

// ***********   Create a Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
  },
  termsConditions: {
    type: Boolean,
    required: true,
  },
  join: {
    type: Date,
    default: Date.now,
  },
});

const usermodel = mongoose.model("user", userSchema);

export default usermodel;

// import mongoose from "mongoose";
// import bcrypt from "bcrypt";
// import dotenv from "dotenv";
// dotenv.config();


// const saltRounds = 10;
// const pepper = process.env.PEPPER;

// const studentSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     trim: true,
//     unique: true,
//     validate: {
//       validator: function(v) {
//         return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
//       },
//       message: props => `${props.value} is not a valid email address!`
//     }
//   },
//   password: {
//     type: String,
//     required: true,
//     trim: true,
//     minlength: 7
//   },
//   termsConditions: {
//     type: Boolean,
//     required: true,
//   },
//   join: {
//     type: Date,
//     default: Date.now,
//   },
// });

// studentSchema.pre("save", async function(next) {
//   if (!this.isModified("password")) {
//     return next();
//   }
//   try {
//     const salt = await bcrypt.genSalt(saltRounds);
//     const hashedPassword = await bcrypt.hash(this.password + pepper, salt);
//     this.password = hashedPassword;
//     next();
//   } catch (error) {
//     return next(error);
//   }
// });

// studentSchema.methods.comparePassword = async function(candidatePassword) {
//   try {
//     return await bcrypt.compare(candidatePassword + pepper, this.password);
//   } catch (error) {
//     throw new Error("Comparison failed", error);
//   }
// };

// const Student = mongoose.model("Student", studentSchema);

// export default Student;
