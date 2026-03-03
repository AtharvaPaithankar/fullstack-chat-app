import express from "express";
import { protectroute } from "../middlewares/authmiddleware.js";
import { getloggedinusers, getMessages, sendMessage } from "../controllers/messageroute.js";

const router = express.Router();

router.get('/users', protectroute ,getloggedinusers);
router.get('/:id' , protectroute, getMessages)

router.post('/send/:id' , protectroute , sendMessage)


export default router;