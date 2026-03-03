import express from "express";
import { login, logout, signup , updateprofile, checkauth} from "../controllers/authroute.js";
import { protectroute } from "../middlewares/authmiddleware.js";

const router = express.Router();

router.post('/signup',signup);

router.post('/login',login);

router.post('/logout',logout);

router.put('/update' ,protectroute, updateprofile)

router.get('/check' ,protectroute, checkauth)


export default router;