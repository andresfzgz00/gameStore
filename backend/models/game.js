const mongoose = require('mongoose')

const Schema = mongoose.Schema

const gameSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String,
            required: true
        },
        coverUrl: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        publisher: {
            type: Schema.Types.ObjectId,
            ref: 'Publisher',
            required: true
        },
        dateReleased: {
            type: String,
            default: new Date().toISOString()
        },
        platform: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'Platform'
        },
        price: {
            type: Number,
            required: true,
            default: 60
        }
    }, { timestamps: true }
)

module.exports = mongoose.model('Game', gameSchema)


