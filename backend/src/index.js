import express from "express";
import "dotenv/config";
import authRoutes from "./routes/authRoutes.js";
import { connectDB } from "../lib/db.js";
import bookRoutes from "./routes/bookRoutes.js";
import cors from "cors";

const app = express();

// const PORT=process.env.PORT;




app.use(express.json());
app.use(cors());


app.use("/api/authentication",authRoutes);
app.use("/api/books", bookRoutes);

connectDB();
// app.listen(PORT,()=>{
//     console.log({PORT});
//     console.log(`server is running on Port ${PORT}`);
//     console.log("AUTH ROUTES:", authRoutes);
    
// });