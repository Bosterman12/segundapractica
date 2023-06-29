import { Router } from "express";
import { getSession, destroySession, testLogin } from "../controllers/session.controller.js";
import passport from "passport";

const routerSession = Router()

routerSession.get('/', getSession)
routerSession.post('/login', passport.authenticate('login',{
    passReqToCallback: true,
    failureRedirect: '../api/errorLogin',
    successRedirect: '../api/product',
    failureMessage: '',
  }), testLogin)
routerSession.get('/logout', destroySession)

export default routerSession