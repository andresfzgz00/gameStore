const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

exports.signUp = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const error = new Error('Data introduced not valid')
        error.statusCode = 422
        throw error
    }

    const username = req.body.username
    const email = req.body.email


    try {
        const usernameUser = await User.findOne({ username: username })
        const emailUser = await User.findOne({ email: email })
        if (usernameUser || emailUser) {
            const error = new Error('User already signed up')
            error.statusCode = 409
            throw error
        }

        const password = req.body.password
        const name = req.body.name
        const lastName = req.body.lastName
        const confirmPassword = req.body.confirmPassword
        const type = req.body.type

        if (password !== confirmPassword) {
            const error = new Error('Passwords do not match')
            throw error
        }

        const hashedPassword = bcrypt.hashSync(password, 12)

        const newUser = new User({
            name: name,
            username: username,
            password: hashedPassword,
            email: email,
            lastName: lastName,
            type: type
        })

        await newUser.save()

        const token = jwt.sign({
            username: newUser.username,
            userId: newUser._id.toString()
        },
            'unsecretobienguardado',
            { expiresIn: '1h' }
        )

        res.status(201).json({ message: 'User created succesfully', token: token })

    } catch (err) {
        next(err)
    }
}

exports.logIn = async (req, res, next) => {
    console.log(req.body)
    const errors = validationResult(req)

    try {
        if (!errors.isEmpty()) {
            const error = new Error('Data introduced not valid')
            error.statusCode = 422
            throw error
        }
        const username = req.body.username

        const user = await User.findOne({ username: username })

        if (!user) {
            const error = new Error('A user with this username could not be found')
            error.statusCode = 401
            throw error
        }

        const password = req.body.password
        const isEqual = await bcrypt.compare(password, user.password)
        if (!isEqual) {
            const error = new Error('Wrong password')
            error.statusCode = 401
            throw error
        }

        const token = jwt.sign({
            username: user.username,
            userId: user._id.toString()
        },
            'unsecretobienguardado',
            { expiresIn: '1h' }
        )

        res.status(200).json({ message: 'Logged in successfully', token: token })

    } catch (err) {
        next(err)
    }
}