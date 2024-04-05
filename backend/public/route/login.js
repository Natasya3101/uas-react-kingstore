import argon2 from "argon2";
import jwt from "jsonwebtoken";
import pool from "../../db.js";


export async function login(req, res) {
    try {
        const [rows] = await pool.query("SELECT * FROM admin WHERE username = ?", [req.body.username]);
        const user = rows[0];
        if (user) {
            if (await argon2.compare(req.body.pass, user.pass)) {
                const token = jwt.sign({ id: user.id, username: user.username }, process.env.SECRET_KEY);
                res.cookie("jwt", token, { httpOnly: true }).send("Login berhasil.");
            } else {
                res.status(401).send("Kata sandi salah.");
            }
        } else {
            res.status(401).send("Pengguna tidak ditemukan.");
        }
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).send("Terjadi kesalahan saat melakukan login.");
    }
}
