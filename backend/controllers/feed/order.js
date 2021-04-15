const mongoose = require('mongoose')

const Order = require('../../models/order')
const Game = require('../../models/game')
const User = require('../../models/user')

const ObjectId = mongoose.Types.ObjectId

exports.getOrdersUser = async (req, res, next) => {
    const userId = req.userId
    try {
        const orders = await Order.find({ user: new ObjectId(userId) }).sort('-createdAt')
        if (orders.length === 0) {
            const error = new Error('No orders for this user found')
            error.statusCode = 404
            throw error
        }
        res.status(200).json({ orders: orders, message: 'Orders for this user retrieved successfully' })
    } catch (err) {
        next(err)
    }
}

exports.postOrder = async (req, res, next) => {
    const userId = req.userId
    try {
        const user = await User.findById(new ObjectId(userId))
        if (!user) {
            const error = new Error('User not found')
            error.statusCode = 401
            throw error
        }

        let total = 0
        const cart = await Promise.all(req.body.cart.map(async cartItem => {
            const game = await Game.findById(new ObjectId(cartItem.id))
            if (!game) {
                const error = new Error('Game not found')
                error.statusCode = 404
                throw error
            }
            total += game.price * cartItem.quantity
            return {
                ...cartItem,
                id: new ObjectId(cartItem.id)
            }
        }))
        const newOrder = new Order({
            games: cart,
            user: new ObjectId(userId),
            total: total
        })
        await newOrder.save()

        await user.orders.push(newOrder)
        await user.save()

        res.status(200).json({ message: 'Order posted successfully', order: newOrder })
    } catch (err) {
        next(err)
    }
}