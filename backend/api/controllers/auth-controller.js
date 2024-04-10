import argon2 from "argon2";

import jwt from "jsonwebtoken";
import pool from "../../db.js";

export async function login(req, res) {
  const { username, password } = req.body;
  try {
  // Mencari data user berdasarkan username
  const [rows, _fields] = await pool.execute(
    "SELECT * FROM admin WHERE username = ?",
    [username]
  );

  if (rows != undefined) {
    // Verifikasi antara password yang diinputkan di client dengan database
    // const isPasswordValid = await argon2.verify(password, rows.PASS);
    const isPasswordValid = await argon2.compare(password, rows.PASS);
    console.log(isPasswordValid);
    if (isPasswordValid) {
      const token = jwt.sign(rows[0], process.env.SECRET_KEY);

      // Set cookie`
      res.cookie("token", token, {
        httpOnly: true,
      });

      res.status(200).json({
        token,
        message: "Login berhasil !!!",
      });
    } else {
      return res.status(401).json({ msg: "Password salah !!!" });
    }
  } else {
    return res.status(404).json({ msg: "User tidak ditemukan !!!" });
  }
  } catch (error) {
    res.status(500).json({ error });
  }
}

