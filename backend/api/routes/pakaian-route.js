import pool from "../../db.js";
import express from "express";
import multer from "multer";
import { addPakaian, deletePakaianById, editPakaianById, getPakaian } from "../controllers/pakaian-controller.js";
const router = express.Router();
const upload = multer({ dest: "public/photos" });


router.post("/pakaian/addPakaian", upload.single("foto") , addPakaian); 
router.get("/pakaian/getPakaian", getPakaian);
router.delete("/pakaian/deleteById/:kode_pakaian", deletePakaianById);
router.put("/pakaian/editById/:kode_pakaian", editPakaianById);

export default router;
