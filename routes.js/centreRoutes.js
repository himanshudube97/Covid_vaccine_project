import express from "express";
const router = express.Router();

import { isAuthenticatedUser } from "../middleware/auth.js";
import checkAdmin from "../middleware/checkAdmin.js";
import { createCentre, deleteCentre, getAvailableSlots, registerSlot } from "../controller/centresController.js";


router.route("/createCentre").post(isAuthenticatedUser,checkAdmin, createCentre);
router.route("/registerSlot").post(isAuthenticatedUser, registerSlot);
router.route("/getAvailableSlots").get(isAuthenticatedUser, getAvailableSlots);
router.route("/deleteCentre").get(isAuthenticatedUser, deleteCentre );

export default router;



