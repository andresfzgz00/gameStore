const Game = require('../../models/game')
const Publisher = require('../../models/publisher')
const Platform = require('../../models/platform')

const ObjectId = require('mongoose').Types.ObjectId
const publisher = require('../../models/publisher')
const { validationResult } = require('express-validator')

exports.getGames = async (req, res, next) => {
    try {
        const games = await Game.find().populate('platform', 'name')

        if (games.length === 0) {
            const error = new Error('Couldn\'t find any games')
            error.statusCode = 404
            throw error
        }
        res.status(200).json({ games: games, message: 'Games retrieved successfully' })
    } catch (err) {
        next(err)
    }
}

exports.getSelectedGames = async (req, res, next) => {
    const gameIds = req.params.gameIds.split(',')
    console.log(gameIds)
    try {
        const games = await Game.find({ _id: { $in: gameIds } })
        console.log(games)
        if (games.length === 0) {
            const error = new Error('Couldn\'t find any game')
            error.statusCode = 404
            throw error
        }
        res.status(200).json({ games: games, message: 'Games retrieved successfully' })
    } catch (err) {
        next(err)
    }
}

exports.getGame = async (req, res, next) => {
    const gameId = req.params.gameId

    try {
        const game = await Game.findById(new ObjectId(gameId))
        console.log(game)

        if (!game) {
            const error = new Error('Couldn\'t find game')
            error.statusCode = 404
            throw error
        }

        res.status(200).json({ game: game, message: 'Game retrieved successfully' })
    } catch (err) {
        next(err)
    }
}

exports.getHome = async (req, res, next) => {
    try {
        const games = await Game.find().sort('-createdAt').populate('platform', 'name').limit(6)
        const carousel = games.slice(0, 3)
        const newReleases = games.slice(3, 6)

        if (games.length === 0) {
            const error = new Error('Couldn\'t find any games')
            error.statusCode = 404
            throw error
        }
        res.status(200).json({
            carousel: carousel,
            newReleases: newReleases,
            message: 'Home retrieved successfully'
        })
    } catch (err) {
        next(err)
    }
}

exports.addGame = async (req, res, next) => {

    const errors = validationResult(req)
    console.log(errors)

    try {
        if (!errors.isEmpty()) {
            const error = new Error('Entered data is incorrect.');
            error.statusCode = 422;
            throw error;
        }
        const title = req.body.title
        const publisherId = req.body.publisher
        const dateReleased = req.body.dateReleased
        const platformId = req.body.platform

        const [platform, publisher] = await verifyGameExistence(publisherId, platformId, title, dateReleased)

        const description = req.body.description
        const imageUrl = req.body.imageUrl
        const coverUrl = req.body.coverUrl
        const price = req.body.price

        const newGame = new Game({
            title: title,
            imageUrl: imageUrl,
            dateReleased: dateReleased,
            description: description,
            publisher: publisher,
            platform: platform,
            coverUrl: coverUrl,
            price: price
        })
        console.log(newGame)

        await newGame.save()

        await publisher.games.push(newGame)
        await publisher.save()

        await platform.games.push(newGame)
        await platform.save()

        res.status(200).send(newGame.title + ' added successfully')

    } catch (err) {
        next(err)
    }
}



exports.deleteGame = async (req, res, next) => {
    const gameId = req.body.gameId
    console.log(req.body)

    try {
        const toBeDeletedGame = await Game.findById(new ObjectId(gameId))

        if (!toBeDeletedGame) {
            const error = new Error('Game not found')
            error.statusCode = 404
            throw error
        }

        const publisher = await Publisher.findById(toBeDeletedGame.publisher)
        const platform = await Platform.findById(toBeDeletedGame.platform)

        await Game.findByIdAndRemove(gameId)

        await publisher.games.pull(toBeDeletedGame)
        await publisher.save()

        await platform.games.pull(toBeDeletedGame)
        await platform.save()

        return res.status(200).send(toBeDeletedGame.title + ' deleted successfully')

    } catch (err) {
        next(err)
    }
}

exports.updateGame = async (req, res, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        console.log(errors)
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        throw error;
    }

    const gameId = req.body._id

    try {

        const game = await Game.findById(new ObjectId(gameId))

        if (!game) {
            console.log(gameId)
            const error = new Error('Game not found')
            error.statusCode = 404
            throw error
        }

        const title = req.body.title
        const publisherId = req.body.publisher
        const dateReleased = req.body.dateReleased
        const platformId = req.body.platform

        const [platform, publisher] = await verifyGameExistence(publisherId, platformId, title, true)

        if (game.publisher !== new ObjectId(publisherId)) {
            const oldPublisher = await Publisher.findById(game.publisher)
            await oldPublisher.games.pull(game)
            await oldPublisher.save()

            await publisher.games.push(game)
            await publisher.save()
        }

        if (game.platform !== new ObjectId(platformId)) {
            const oldPlatform = await Platform.findById(game.platform)
            await oldPlatform.games.pull(game)
            await oldPlatform.save()

            await platform.games.push(game)
            await platform.save()
        }

        const imageUrl = req.body.imageUrl
        const coverUrl = req.body.coverUrl
        const description = req.body.description
        const price = req.body.price

        game.title = title
        game.publisher = new ObjectId(publisherId)
        game.dateReleased = dateReleased
        game.platform = new ObjectId(platformId)
        game.imageUrl = imageUrl
        game.description = description
        game.coverUrl = coverUrl
        game.price = price
        await game.save()

        res.status(200).send(game.title + ' updated successfully')
    } catch (err) {
        next(err)
    }
}

const verifyGameExistence = async (publisherId, platformId, title, updating = false) => {
    const publisher = await Publisher.findById(new ObjectId(publisherId)).populate('games')

    if (!publisher) {
        const error = new Error('Couldn\'t find publisher')
        error.statusCode = 404
        throw error
    }


    const platform = await Platform.findById(new ObjectId(platformId))

    if (!platform) {
        const error = new Error('Couldn\'t find platform')
        error.statusCode = 404
        throw error
    }

    publisher.games.forEach(game => {
        if (game.title === title && !updating) {
            console.log('hola')
            const error = new Error('Game already exists')
            error.statusCode = 409
            throw error
        }

    })

    return [platform, publisher]

}