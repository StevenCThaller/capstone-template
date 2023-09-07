import { Router } from "express";
import { createUser } from "../controllers/createUser";
import { allMovies } from "../controllers/allMovies";
import { oneMovie } from "../controllers/oneMovie";
import { findUser } from "../controllers/getUser";

const router = Router();

router.route("/").post(createUser);

router.route("/movies").get(allMovies)

router.route('/movieByID/:id').get(oneMovie)

router.route('/user/:uid').get(findUser)

export default router;
