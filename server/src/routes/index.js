import { Router } from "express";
import { createUser } from "../controllers/createUser";
import { allMovies } from "../controllers/allMovies";
import { oneMovie } from "../controllers/oneMovie";
import { findUser } from "../controllers/getUser";
import { createReview } from "../controllers/createReview";
import { getUserReviews } from "../controllers/getUserReviews";
import { getMovieReviews } from "../controllers/getMovieReviews";
import { createReply } from "../controllers/createReply";

const router = Router();

router.route("/").post(createUser);

router.route("/movies").get(allMovies)

router.route('/movieByID/:id').get(oneMovie)

router.route('/user/:uid').get(findUser)

router.route('/review').post(createReview)

router.route('/getReviews/:uid').get(getUserReviews)

router.route('/movieReviews/:movieID').get(getMovieReviews)

router.route('/reply').post(createReply)

export default router;
