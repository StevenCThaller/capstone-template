import { Router } from "express";
import { healthCheck } from "../controllers/api.controller";
import { createUser } from "../controllers/createUser";

const router = Router();

router.route("/").post(createUser);

export default router;
