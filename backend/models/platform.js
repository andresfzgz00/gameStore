const mongoose = require('mongoose')

const Schema = mongoose.Schema

const platformSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    dateReleased: {
        type: String,
        default: new Date().toISOString()
    },
    games: [{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Game'
    }]
}, { timestamps: true })

module.exports = mongoose.model('Platform', platformSchema)