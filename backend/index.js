import express from "express";
import cors from "cors";
// import argon2 from "argon2";
import jwt from "jsonwebtoken";
import multer from "multer";
import { addPakaian, deletePakaianById, editPakaianById, getPakaian } from "./public/route/pakaian.js";
import { login } from "./public/route/login.js";



const app = express();
const upload = multer({ dest: "public/photos" });


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

// app.post("/api/v1/register", async (req, res) => {
//     const hash = await argon2.hash(req.body.pass);
//     await pool.query("INSERT INTO admin (username, pass) VALUES (?, ?)", [
//       req.body.username,
//       hash,
//     ]);
//     res.send("Pendaftaran berhasil.");
// })



// Middleware otentikasi
// app.use((req, res, next) => {
//   const authorization = req.headers.authorization;
//   if (authorization) {
//     if (authorization.startsWith("Bearer ")) {
//       const token = authorization.split(" ")[1];
//       try {
//         req.user = jwt.verify(token, process.env.SECRET_KEY);
//         next();
//       } catch (error) {
//         res.send("Token tidak valid.");
//       }
//     } else {
//       res.send('Otorisasi tidak valid (harus "Bearer").');
//     }
//   } else {
//     res.send("Anda belum login (tidak ada otorisasi).");
//   }
// });
  
  
app.use(express.static("public"));

app.post("/api/v1/login", login);
app.post("/api/v1/addPakaian", upload.single("foto") , addPakaian); 
app.get("/api/v1/getPakaian", getPakaian);
app.delete("/api/v1/deleteById/:kode_pakaian", deletePakaianById);
app.put("/api/v1/editById/:kode_pakaian", editPakaianById);




  
  
  
  
  
app.listen(3000,() => console.log("Server berhasil dijalankan."))