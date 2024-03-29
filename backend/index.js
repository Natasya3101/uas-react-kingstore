import express from "express";
import cors from "cors";
import pool from "./db.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import multer from "multer";


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

app.post("/api/v1/register", async (req, res) => {
    const hash = await argon2.hash(req.body.pass);
    await pool.query("INSERT INTO admin (username, pass) VALUES (?, ?)", [
      req.body.username,
      hash,
    ]);
    res.send("Pendaftaran berhasil.");
})



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

app.post("/api/v1/login", async (req, res) => {
  console.log("Nama Pengguna yang Diterima:", req.body.username); // Menampilkan nama pengguna yang diterima dari permintaan POST
  const [rows] = await pool.query("SELECT * FROM admin WHERE username = ?", [
      req.body.username,
  ]);

  if (rows && rows[0]) {
      const user = rows[0]; // Mengambil elemen pertama dari array rows
      const passwordMatch = await argon2.verify(user.pass, req.body.pass);

      if (passwordMatch) {
          const token = jwt.sign({ id: user.id, username: user.username },SECRET_KEY); // Menggunakan secret key "kim"
          res.send({
              token,
              message: "Login berhasil.",
          });
      } else {
          res.status(401).send("Kata sandi salah.");
      }
  } else {
      res.status(404).send(`Pengguna dengan nama pengguna ${req.body.username} tidak ditemukan.`);
  }
});

app.post("/api/v1/addPakaian", upload.single("foto"), async (req, res) => {
  try {
      // Check if the nama_pakaian already exists
      const existingPakaian = await pool.query(
          'SELECT * FROM pakaian WHERE nama_pakaian = ?',
          [req.body.nama_pakaian]
      );

      if (existingPakaian.length > 0) {
          return res.status(400).send('Nama pakaian sudah ada. Pilih nama yang lain.');
      }

      // If nama_pakaian doesn't exist, proceed with the insertion
      await pool.query(
          'INSERT INTO pakaian VALUES (NULL, ?, ?, ?, ?, ?, ?)',
          [req.body.kategori, req.body.nama_pakaian, req.body.jenis, req.body.harga, req.body.stok, req.file.filename]
      );
     
      res.send('Pakaian Sudah di Tambahkan');
  } catch (error) {
      console.error("Terjadi kesalahan saat menambahkan pakaian:", error);
      res.status(500).send("Terjadi kesalahan saat menambahkan pakaian.");
  }
});







  
  
  
  
  
app.listen(3000,() => console.log("Server berhasil dijalankan."))