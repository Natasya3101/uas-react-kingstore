import express from "express";
import cors from "cors";
import pool from "./db.js";
import argon2 from "argon2";
// import jwt from "jsonwebtoken";

const app = express();

app.use(express.json());

app.use(
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

app.post("/api/v1/register", async (req, res) => {
    const hash = await argon2.hash(req.body.pass);
    await pool.query("INSERT INTO admin (username, pass) VALUES (?, ?)", [
      req.body.username,
      hash,
    ]);
    res.send("Pendaftaran berhasil.");
})

app.listen(3000,() => console.log("Server berhasil dijalankan."))