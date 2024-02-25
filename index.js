import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
import cors from "cors";
const port = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
import connectToDatabase from "./database/dbConfig.js";

// Database configuration
connectToDatabase(MONGODB_URI);

// cors policy
app.use(cors());

// facth data in to the json
app.use(express.json());

app.listen(port, () => {
  console.log(`sever listeners listening on port http://localhost:${port}`);
});
