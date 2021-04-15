const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderSchema = new Schema({
    games: [{
        quantity: {
            type: Number,
            required: true
        },
        id: {
            type: mongoose.Types.ObjectId,
            ref: 'Game',
            required: true
        }
    }],
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    dateOrdered: {
        type: String,
        default: new Date().toISOString()
    },
    total: {
        type: Number,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Order', orderSchema)