const { validationResult } = require('express-validator')

const Game = require('../../models/game')
const Publisher = require('../../models/publisher')
const Platform = require('../../models/platform')

const ObjectId = require('mongoose').Types.ObjectId

exports.addPlatform = async (req, res, next) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        const error = new Error('Entered data is incorrect')
        error.statusCode = 422
        throw error
    }

    const name = req.body.name
    const dateReleased = req.bodydateReleased

    try {
        const platform = await Platform.findOne({ name: name })

        if (platform) {
            const error = new Error('Platform already exists')
            error.statusCode = 409
            throw error
        }

        const newPlatform = new Platform({
            name: name,
            dateReleased: dateReleased
        })

        newPlatform.save()

        res.status(200).json({ message: 'Platform added succesfully', platform: newPlatform })

    } catch (err) {
        next(err)
    }
}

exports.getPlatforms = async (req, res, next) => {
    try {
        const platforms = await Platform.find()

        if (platforms.length === 0) {
            const error = new Error('There are no platforms')
            error.statusCode = 404
            throw error
        }

        res.status(200).json({ message: 'Platforms retrieved correctly', platforms: platforms })
    } catch (err) {
        next(err)
    }
}

exports.deletePlatform = async (req, res, next) => {
    const platformId = req.body.platformId

    try {
        const platform = await Platform.findById(new ObjectId(platformId))
        if (!platform) {
            const error = new Error('Platform not found')
            error.statusCode = 404
            throw console.error();
        }

        platform.games.forEach(async gameId => {
            Game.findByIdAndDelete(new ObjectId(gameId))
        })

        await Platform.findByIdAndDelete(platformId)

        res.status(200).json({ message: 'Platform and its games have been removed', platform: platform })
    } catch (err) {
        next(err)
    }
}

exports.updatePlatform = async (req, res, next) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        const error = new Error('Entered data is incorrect')
        error.statusCode = 422
        throw error
    }

    const platformId = req.body.platformId
    try {
        const platform = await Platform.findById(new ObjectId(platformId))

        if (!platform) {
            const error = new Error('Platform not found')
            error.statusCode = 404
            throw error
        }

        const name = req.body.name

        const toBeUpdatedPlatform = await Platform.findOne({ name: name })

        if (toBeUpdatedPlatform) {
            const error = new Error('Platform already exists')
            error.statusCode = 409
            throw error
        }

        platform.name = name
        await platform.save()

        res.status(200).json({ message: 'Platform updated', platform: platform })

    } catch (err) {
        next(err)
    }
}