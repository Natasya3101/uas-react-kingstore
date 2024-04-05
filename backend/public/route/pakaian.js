import pool from "../../db.js";

export async function addPakaian (req, res) {
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
}



export async function getPakaian(_req,res) {
    const result = await pool.query(
        'SELECT * FROM pakaian'
    )
    res.send(result);
}

export async function deletePakaianById(req, res) {
    try {
      await pool.query(
        `DELETE FROM pakaian WHERE kode_pakaian = ?`,
        [req.params.kode_pakaian]
      );
  
      res.send("Pakaian telah dihapus.");
    } catch (error) {
      console.error('Error deleting pakaian:', error);
    }
}

export async function editPakaianById(req, res) {

    try {
        await pool.query(
            `UPDATE pakaian SET kategori = ?,nama_pakaian = ?, jenis = ?,harga = ?, stok = ?,foto = ? WHERE kode_pakaian = ?`,
            [
                req.body.kategori,
                req.body.nama_pakaian,
                req.body.jenis,
                req.body.harga,
                req.body.stok,
                req.file.filename,
                req.params.kode_pakaian
            ]
        );

        res.send("Telah Diedit.");
    } catch (error) {
        console.error('Error editing pakaian:', error);
    }
}