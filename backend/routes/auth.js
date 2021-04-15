const express = require('express')
const { body } = require('express-validator/check')

const authController = require('../controllers/auth')

const Router = express.Router()

Router.post('/signup', [
    body('name').trim().not().isEmpty(),
    body('lastName').trim().not().isEmpty(),
    body('email').trim().not().isEmpty().isEmail()
], authController.signUp)

Router.post('/login', [
    body('username').trim().not().isEmpty(),
    body('password').trim().not().isEmpty()
], authController.logIn)

module.exports = Router