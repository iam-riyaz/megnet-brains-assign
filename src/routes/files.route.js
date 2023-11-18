
import express from 'express';
import * as filesController from "../controllers/files.controller.js"

export const filesRouter= express.Router()

filesRouter.post("/create", filesController.createFiles)

filesRouter.get("/getFiles", filesController.getFiles)