import { Router } from "express";
import { createUser } from "../controllers/createUser";

const router = Router();

router.route("/").post(createUser);

export default router;
