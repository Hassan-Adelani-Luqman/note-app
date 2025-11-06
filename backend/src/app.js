import express from "express";
import router from "./routes/notesRoutes.js";
import path from "node:path"
const app = express();
import { connectDB } from "./config/db.js";
import { connect } from "mongoose";
import ratelimiter from "./middlewars/rateLimiter.js";
import dotenv from "dotenv";
import cors from "cors"

dotenv.config();
const PORT = 5000;

//to get the root directory
const __dirname = path.resolve()

if(process.env.NODE_ENV !== "production"){
    app.use(cors(
        {
            origin: "http://localhost:5173"
        }
    ));
}
app.use(express.json())
app.use(ratelimiter);
app.use("/api/notes", router);

if(process.env.NODE_ENV  === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*", (req, res)=>{
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })
}
connectDB().then(()=> app.listen(PORT, () => console.log("listening for requests")));