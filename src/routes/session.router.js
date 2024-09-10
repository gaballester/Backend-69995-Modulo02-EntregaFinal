import { Router } from 'express'
import passport from  'passport'
import userController from '../controllers/user.controller.js'

const sessionRouter = Router()

sessionRouter.post('/register', userController.register)
sessionRouter.post('/login',userController.login)
sessionRouter.get('/current', passport.authenticate('jwt',{session: false}), userController.current)
sessionRouter.post('/logout', userController.logout)

export default sessionRouter