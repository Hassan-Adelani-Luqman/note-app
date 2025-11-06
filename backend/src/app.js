import express from "express";
import router from "./routes/notesRoutes.js";
const app = express();
import { connectDB } from "./config/db.js";
import { connect } from "mongoose";
import ratelimiter from "./middlewars/rateLimiter.js";
import dotenv from "dotenv";
import cors from "cors"

dotenv.config();
const PORT = 5000;

app.use(cors());
app.use(express.json())
app.use(ratelimiter);
console.log(process.env.MONGO_URI);
app.use("/api/notes", router);
connectDB().then(()=> app.listen(PORT, () => console.log("listening for requests")));
