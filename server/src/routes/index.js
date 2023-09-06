import { Router } from "express";
import { createUser } from "../controllers/createUser";
import { allMovies } from "../controllers/allMovies";
import { oneMovie } from "../controllers/oneMovie";

const router = Router();

router.route("/").post(createUser);

router.route("/movies").get(allMovies)

router.route('/movieByID/:id').get(oneMovie)

export default router;
