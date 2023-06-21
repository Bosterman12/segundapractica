import { Router } from "express";
import passport from "passport";
import { createUser } from "../controllers/users.controller.js";

const userRouter = Router()

userRouter.get('/register', async (req, res) =>{
    res.render('sessions/register')
})

userRouter.post('/register', passport.authenticate('register'), createUser)



export default userRouter