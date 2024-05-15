import express, { Router } from "express";
import { fileUpload, showData } from "../controller/fileController";
import upload from "../middleware/upload";
const fileRoute: Router = express.Router();

fileRoute.post("/fileUpload", upload.single("file"), fileUpload);

fileRoute.get("/showData", showData);

export default fileRoute;
