import { Router } from "express";
import passport from "passport";
import { createUser } from "../controllers/users.controller.js";

const userRouter = Router()

userRouter.get('/register', async (req, res) =>{
    res.render('sessions/register')
})

userRouter.post('/register', passport.authenticate('register'), createUser)

userRouter.get(
    '/githubregister',
    passport.authenticate('githubSignup', { scope: ['user:email'] })
  )

 userRouter.get('/github', 
  passport.authenticate('githubSignup', { failureRedirect: '/session/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('../api/product');
  })

export default userRouter