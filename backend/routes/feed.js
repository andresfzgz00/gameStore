const express = require('express')
const { body } = require('express-validator/check')

const gameFeedController = require('../controllers/feed/game')
const publisherFeedController = require('../controllers/feed/publisher')
const platformFeedController = require('../controllers/feed/platform')
const orderFeedController = require('../controllers/feed/order')

const isAuth = require('../middleware/is-auth')

const Router = express.Router()

Router.get('/games/:gameIds', gameFeedController.getSelectedGames)

Router.get('/games', gameFeedController.getGames)

Router.get('/home', gameFeedController.getHome)

Router.get('/publishers', publisherFeedController.getPublishers)

Router.get('/platforms', platformFeedController.getPlatforms)

Router.get('/game/:gameId', gameFeedController.getGame)

Router.get('/orders', isAuth, orderFeedController.getOrdersUser)


Router.post('/order', [
    body('cart').not().isEmpty(),
], isAuth, orderFeedController.postOrder)

Router.post('/game', [
    body('title').trim().not().isEmpty(),
    body('publisher').trim().not().isEmpty(),
    body('platform').trim().not().isEmpty(),
], isAuth, gameFeedController.addGame)

Router.post('/publisher', [
    body('name').trim().not().isEmpty()
], publisherFeedController.addPublisher)

Router.post('/platform', [
    body('name').trim().not().isEmpty()
], isAuth, platformFeedController.addPlatform)


Router.post('/delete-game', isAuth, gameFeedController.deleteGame)

Router.delete('/publisher', isAuth, publisherFeedController.deletePublisher)

Router.delete('/platform', isAuth, platformFeedController.deletePlatform)


Router.put('/game', [
    body('title').trim().not().isEmpty(),
    body('publisher').trim().not().isEmpty(),
    body('platform').trim().not().isEmpty(),
], isAuth, gameFeedController.updateGame)

Router.put('/publisher', isAuth, [
    body('name').trim().not().isEmpty(),
    body('country').trim().not().isEmpty()
], isAuth, publisherFeedController.updatePublisher)

Router.put('/platform', isAuth, [
    body('name').trim().not().isEmpty(),
    body('dateReleased').trim().not().isEmpty()
], isAuth, platformFeedController.updatePlatform)

module.exports = Router