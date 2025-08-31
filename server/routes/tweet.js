import express from "express";
import { 
    getTweets,
    createTweet,
    deleteTweet,
    updateTweet,
    getParentTweet,
} from "../controllers/tweetsController.js";
import { checkAuth } from "../middlewares/checkAuth.js";

const router = express.Router();

router.get("/", checkAuth, getTweets);
router.get("/:tweetId", checkAuth, getParentTweet);
router.post("/", checkAuth , createTweet);
router.put("/:tweetId", checkAuth, updateTweet);
router.delete('/:tweetId', deleteTweet);

export default router;