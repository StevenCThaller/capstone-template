import { Router } from "express";
import { createUser } from "../controllers/createUser";
import { allMovies } from "../controllers/allMovies";

const router = Router();

router.route("/").post(createUser);

router.route("/movies").get(allMovies)

export default router;
