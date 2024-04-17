import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"
import AuthRoutes from "./api/routes/auth-route.js";
import PakaianRoutes from "./api/routes/pakaian-route.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({origin : ["http://localhost:5173"], credentials: true}))

app.use((req,res,next) => {
    if (req.path.startsWith("/api")){
        next();
    }else{
        res.send('URL tidak valid (URL harus diawali "/api")')
    }
})
  
app.use(express.static("public"));

app.use("/api/v1",AuthRoutes);
app.use("/api/v1",PakaianRoutes);

app.listen(3000,() => console.log("Server berhasil dijalankan."))