import { Router } from "express";
import { createUser } from "../controllers/createUser";
import { searchedMovies } from "../controllers/searchedMovies";
import { oneMovie } from "../controllers/oneMovie";
import { findUser } from "../controllers/getUser";
import { createReview } from "../controllers/createReview";
import { getUserReviews } from "../controllers/getUserReviews";
import { getMovieReviews } from "../controllers/getMovieReviews";
import { createReply } from "../controllers/createReply";
import { moviesByPage } from "../controllers/getMoviesByPage";
import { getReview } from "../controllers/getReview";
import { deleteReview } from "../controllers/deleteReview";
import { deleteReply } from "../controllers/deleteReply";
import { createPost } from "../controllers/createPost";
import { getPosts } from "../controllers/getPosts";
import { deletePost } from "../controllers/deletePost";
import { getUserPosts } from "../controllers/getUserPosts";

const router = Router();

router.route("/").post(createUser);

router.route("/movies/:movieTitle").get(searchedMovies)

router.route('/movieByID/:id').get(oneMovie)

router.route('/user/:uid').get(findUser)

router.route('/review').post(createReview)

router.route('/review/:reviewID').get(getReview)

router.route('/getReviews/:uid').get(getUserReviews)

router.route('/movieReviews/:movieID').get(getMovieReviews)

router.route('/reply').post(createReply)

router.route('/moviesByPage/:page').get(moviesByPage)

router.route('/deleteReview/:uid/:reviewID').delete(deleteReview)

router.route('/deleteReply/:reviewID/:replyID').delete(deleteReply)

router.route('/createPost').post(createPost)

router.route('/getPosts').get(getPosts)

router.route('/deletePost/:uid/:postID').delete(deletePost)

router.route('/getUserPosts/:uid').get(getUserPosts)

export default router;
