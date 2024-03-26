import express from "express";
import cors from "cors";
const app = express;

app.use (express.json());

app.use (
    cors({
        origin : ["http://localhost:5173"],
    })
)

app.use((req,res,next) => {
    if (req.path.startsWith("/api")){
        next();
    }else{
        res.send('URL tidak valid (URL harus diawali "/api")')
    }
})