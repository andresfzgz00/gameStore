const Game = require('../../models/game')
const Publisher = require('../../models/publisher')
const { validationResult } = require('express-validator')

const ObjectId = require('mongoose').Types.ObjectId

exports.getPublishers = async (req, res, next) => {
    try {
        const publishers = await Publisher.find()

        if (publishers.length === 0) {
            // return res.status(404).json({
            //     message: 'Couldn\'t find any publishers'
            // })
            const error = new Error('Couldn\'t find any publishers')
            error.statusCode = 404
            throw error
        }
        res.status(200).json({
            message: 'Publishers retrieved successfully',
            publishers: publishers
        })
    } catch (err) {
        next(err)
    }
}

exports.addPublisher = async (req, res, next) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        const error = new Error('Entered data is incorrect')
        error.statusCode = 422
        throw error
    }

    const name = req.body.name

    try {

        const publisher = await Publisher.findOne({ name: name })
        if (publisher) {
            const error = new Error('Publisher already added, please try another one')
            error.statusCode = 409
            throw error
        }
        const newPublisher = new Publisher({
            name: name
        })

        await newPublisher.save()
        res.status(200).json({ message: 'Publisher addded successfully', publisher: newPublisher })
    } catch (err) {
        next(err)
    }
}

exports.deletePublisher = async (req, res, next) => {
    const publisherId = req.body.publisherId
    try {
        const publisher = findOneById(new ObjectId(publisherId))

        if (!publisher) {
            const error = new Error('Couldn\'t find publisher')
            error.statusCode = 404
            throw error
        }

        if (publisher.games.length > 0) {
            publisher.games.forEach(async game => {
                await Game.findByIdAndDelete(game)
            })
        }

        await Publisher.findByIdAndDelete(new ObjectId(publisherId))

        res.status(200).json({ message: 'Publisher and its games have been removed', publisher: publisher })

    } catch (err) {
        next(err)
    }
}

exports.updatePublisher = async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        const error = new Error('Entered data is incorrect')
        error.statusCode = 422
        throw error
    }

    const publisherId = req.body.publisherId

    try {

        const publisher = await Publisher.findById(new ObjectId(publisherId))
        if (!publisher) {
            const error = new Error('Publisher not found')
            error.statusCode = 404
            throw error
        }

        const name = req.body.name
        const country = req.body.country

        const toBeUpdatedPublisher = await Publisher.findOne({ name: name, country: country })

        if (toBeUpdatedPublisher) {
            const error = new Error('Publisher already exists')
            error.statusCode = 409
            throw error
        }

        publisher.name = name
        await publisher.save()

        res.status(200).json({ mesaage: 'Publisher updated', publisher: publisher })
    } catch (err) {
        next(err)
    }
}