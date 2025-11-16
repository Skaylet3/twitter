import { Router } from 'express'
import { getTweets, createTweet, deleteTweet, updateTweet, getParentTweet } from '../controllers/tweetsController.js'
import { checkAuth } from '../middlewares/checkAuth.js'

const router = Router()

router.get('/', checkAuth, getTweets)
router.get('/:tweetId', checkAuth, getParentTweet)
router.post('/', checkAuth, createTweet)
router.put('/:tweetId', checkAuth, updateTweet)
router.delete('/:tweetId', checkAuth, deleteTweet)

export default router
