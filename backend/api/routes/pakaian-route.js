import express from "express";
import { addPakaian, deletePakaianById, editPakaianById, getPakaian } from "../controllers/pakaian-controller.js";
import { verifyToken } from "../middleware/auth-middleware.js";
const router = express.Router();

router.post("/pakaian/addPakaian",verifyToken, addPakaian); 
router.get("/pakaian/getPakaian/", verifyToken, getPakaian);
router.delete("/pakaian/deleteById/:kode_pakaian",verifyToken, deletePakaianById);
router.put("/pakaian/editById/:kode_pakaian", verifyToken, editPakaianById);

export default router;