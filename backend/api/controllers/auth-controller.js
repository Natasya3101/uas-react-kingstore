import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../../db.js";

export async function login(req, res) {
  const { username, password } = req.body;
  try {
    // Mencari data user berdasarkan username
    const rows = await pool.query("SELECT * FROM admin WHERE username = ?", [
      username,
    ]);
    // console.log(rows[0].PASSWORD)
    if (rows.length > 0) {
      const isPasswordMatch = await bcrypt.compare(password,rows[0].PASSWORD);
      if (isPasswordMatch) {
        const token = jwt.sign(rows[0], process.env.SECRET_KEY);
        res.cookie("token", token, {
          httpOnly: true,
        });
        res.status(200).json({
          token,
          message: "Login berhasil !!!",
        });
      } else {
        return res.status(400).json({ msg: "Password salah !!!" });
      }
    } else {
      return res.status(400).json({ msg: "User tidak ditemukan !!!" });
    }
  } catch (error) {
    console.log(error)
  }
}
export const logout = async (_req, res) => {
  res.setHeader("Cache-Control", "no-store");
  res.clearCookie("token");
  res.status(200).json({ msg: "Logout berhasil" });
};


