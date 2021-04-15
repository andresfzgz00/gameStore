const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization')
    console.log(authHeader)
    if (!authHeader) {
        console.log('error error')
        const error = new Error('Not authenticated')
        error.statusCode = 401
        throw error
    }

    const token = authHeader.split(' ')[1]
    let decodedToken
    try {
        decodedToken = jwt.verify(token, 'unsecretobienguardado')
    } catch (err) {
        return next(err)
    }
    if (!decodedToken) {
        const error = new Error('Not authenticated')
        error.statusCode = 401
        throw error
    }
    req.userId = decodedToken.userId
    next()
}