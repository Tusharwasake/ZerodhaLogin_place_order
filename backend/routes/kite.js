import express from "express";
import { kitelogin } from "../controllers/kiteLogin.js";
import { kiteCallbackHandler } from "../controllers/kiteCallback.js";
import { profileController } from "../controllers/profileController.js";
import { marginsController } from "../controllers/marginsController.js";
import { logoutController } from "../controllers/logoutController.js";

const router = express.Router();

router.get("/login", kitelogin);
router.get("/callback", kiteCallbackHandler);

router.get("/profile", profileController);
router.get("/profile/:user_id", profileController);

router.get("/margins", marginsController);
router.get("/margins/:segment", marginsController);
router.get("/logout", logoutController);

export default router;
