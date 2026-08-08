import express from "express";
import { addInfo } from "../controller/info-controller.js";

const router = express.Router();

router.post("/addinfo", addInfo);

export default router;