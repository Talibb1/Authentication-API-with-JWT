import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectToDatabase from "./database/dbConfig.js";
import userRoutes from "./routes/userRouter.js";
dotenv.config();
const app = express();
const port = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

// Database configuration
connectToDatabase(MONGODB_URI);

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

// CORS policy
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Load routes
app.use("/", userRoutes);

app.listen(port, () => {
  console.log(`Server is listening on port http://localhost:${port}`);
});
