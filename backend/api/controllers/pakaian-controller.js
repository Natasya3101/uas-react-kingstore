import fs from "fs";
import pool from "../../db.js";

export async function addPakaian(req, res) {
  try {
    // Check if the nama_pakaian already exists
    const existingPakaian = await pool.query(
      "SELECT * FROM pakaian WHERE nama_pakaian = ?",
      [req.body.nama_pakaian]
    );

    if (existingPakaian.length > 0) {
      return res
        .status(400)
        .json({ msg: "Nama pakaian sudah ada. Pilih nama yang lain." });
    }
    const filePath = req.file.path;
    const fileData = fs.readFileSync(filePath);
    const base64Data = fileData.toString("base64");
    // If nama_pakaian doesn't exist, proceed with the insertion
    await pool.query("INSERT INTO pakaian VALUES (NULL, ?, ?, ?, ?, ?, ?)", [
      req.body.kategori,
      req.body.nama_pakaian,
      req.body.jenis,
      req.body.harga,
      req.body.stok,
      base64Data,
    ]);
    res.status(200).json({ msg: "Pakaian Sudah di Tambahkan" });
  } catch (error) {
    console.error("Terjadi kesalahan saat menambahkan pakaian:", error);
    res
      .status(500)
      .json({ msg: "Terjadi kesalahan saat menambahkan pakaian." });
  }
}

export async function getPakaian(_req, res) {
  const result = await pool.query(
    `SELECT pakaian.kode_pakaian AS id, pakaian.nama_pakaian, pakaian.jenis, pakaian.harga, pakaian.stok, pakaian.foto, kategori.id AS id_kategori, kategori.kategori AS kategori
        FROM pakaian
        JOIN kategori ON pakaian.kategori = kategori.id`
  );
  res.status(200).json({ result: result });
}

export async function deletePakaianById(req, res) {
  try {
    await pool.query(`DELETE FROM pakaian WHERE kode_pakaian = ?`, [
      req.params.kode_pakaian,
    ]);
    res.status(200).json({ msg: "Pakaian telah dihapus." });
  } catch (error) {
    console.error("Error deleting pakaian:", error);
  }
}

export async function editPakaianById(req, res) {
  try {
    await pool.query(
      `UPDATE pakaian SET nama_pakaian = ?, harga = ?, stok = ?, foto = ? WHERE kode_pakaian = ?`,
      [
        req.body.nama_pakaian,
        req.body.harga,
        req.body.stok,
        req.file.foto,
        req.params.kode_pakaian,
      ]
    );

    res.status(200).json({ msg: "Telah Diedit." });
  } catch (error) {
    console.error("Error editing pakaian:", error);
    res.status(500).send("Terjadi kesalahan saat mengedit pakaian.");
  }
}
