import express from "express";
import "dotenv/config";
import authRoutes from "./routes/authRoutes.js";

const app = express();

const PORT=process.env.PORT;

app.listen(PORT, ()=>{
    console.log({PORT});
    console.log(`server is running on Port ${PORT}`);
});

app.use("/api/auth",authRoutes);