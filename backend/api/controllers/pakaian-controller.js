import pool from "../../db.js";

export async function addPakaian(req, res) {
  const { nama_pakaian, kategori, jenis, harga, stok, foto } = req.body;
  try {
    // Check if the nama_pakaian already exists
    const existingPakaian = await pool.query(
      "SELECT * FROM pakaian WHERE nama_pakaian = ?",
      [nama_pakaian]
    );

    if (existingPakaian.length > 0) {
      return res
        .status(400)
        .json({ msg: "Nama pakaian sudah ada. Pilih nama yang lain." });
    }
    // If nama_pakaian doesn't exist, proceed with the insertion
    await pool.query("INSERT INTO pakaian VALUES (NULL, ?, ?, ?, ?, ?, ?)", [
      kategori,
      nama_pakaian,
      jenis,
      parseInt(harga.replace(/\D/g, ""), 10),
      stok,
      foto,
    ]);
    res.status(200).json({ msg: "Pakaian Sudah di Tambahkan" });
  } catch (error) {
    console.error("Terjadi kesalahan saat menambahkan pakaian:", error);
    res.status(500).json({ msg: "Internal Server Error!!" });
  }
}

export async function getPakaian(req, res) {
  const { nama_pakaian, sort } = req.query;
  try {
    if (nama_pakaian != "" && sort != "") {
      const result = await pool.query(
        `SELECT pakaian.kode_pakaian AS id, pakaian.nama_pakaian, pakaian.jenis, pakaian.harga, pakaian.stok, pakaian.foto, kategori.kategori AS kategori 
        FROM pakaian JOIN kategori ON pakaian.kategori = kategori.id WHERE pakaian.nama_pakaian LIKE '%${nama_pakaian}%' ORDER BY pakaian.harga ${sort}`
      );
      res.status(200).json({ result: result });
    } else if (nama_pakaian != "" && sort == "") {
      const result = await pool.query(
        `SELECT pakaian.kode_pakaian AS id, pakaian.nama_pakaian, pakaian.jenis, pakaian.harga, pakaian.stok, pakaian.foto, kategori.kategori AS kategori 
        FROM pakaian JOIN kategori ON pakaian.kategori = kategori.id WHERE pakaian.nama_pakaian LIKE '%${nama_pakaian}%' `
      );
      res.status(200).json({ result: result });
    } else if (sort != "") {
      const result = await pool.query(
        `SELECT pakaian.kode_pakaian AS id, pakaian.nama_pakaian, pakaian.jenis, pakaian.harga, pakaian.stok, pakaian.foto, kategori.id AS id_kategori, kategori.kategori AS kategori
          FROM pakaian
          JOIN kategori ON pakaian.kategori = kategori.id ORDER BY pakaian.harga ${sort}`
      );
      res.status(200).json({ result: result });
    } else {
      const result = await pool.query(
        `SELECT pakaian.kode_pakaian AS id, pakaian.nama_pakaian, pakaian.jenis, pakaian.harga, pakaian.stok, pakaian.foto, kategori.id AS id_kategori, kategori.kategori AS kategori
          FROM pakaian
          JOIN kategori ON pakaian.kategori = kategori.id`
      );
      res.status(200).json({ result: result });
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error!!" });
  }
}

export async function deletePakaianById(req, res) {
  try {
    await pool.query(`DELETE FROM pakaian WHERE kode_pakaian = ?`, [
      req.params.kode_pakaian,
    ]);
    res.status(200).json({ msg: "Pakaian telah dihapus." });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error!!" });
  }
}

export async function editPakaianById(req, res) {
  const { nama_pakaian, kategori, jenis, harga, stok, foto } = req.body;
  try {
    await pool.query(
      `UPDATE pakaian SET kategori = ?, jenis = ?, nama_pakaian = ?, harga = ?, stok = ?, foto = ? WHERE kode_pakaian = ?`,
      [
        kategori,
        jenis,
        nama_pakaian,
        parseInt(harga.replace(/\D/g, ""), 10),
        stok,
        foto,
        req.params.kode_pakaian,
      ]
    );
    res.status(200).json({ msg: "Pakaian Telah Diedit." });
  } catch (error) {
    console.error("Error editing pakaian:", error);
    res.status(500).json({ msg: "Internal Server Error!!" });
  }
}
