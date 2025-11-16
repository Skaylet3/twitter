import { Router } from 'express'
import { register, checkSomething, login, logOut } from '../controllers/authController.js'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logOut)
router.get('/check-auth', checkSomething)

export default router
