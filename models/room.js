const mongoose = require('mongoose')
const Schema = mongoose.Schema

const roomSchema = new Schema({
    name: {
        type: String,
        required: [true, `Name room must be filled`],
        maxlength: [12, `max length 12 char`]
    },
    groupA: {
        type: Map
    },
    groupB: {
        type: Map
    },

    status: String,
    roomMaster: {
        type: Map,
    }
}, {
    versionKey: false,
    timestamps: true
})

module.exports = mongoose.model('Room', roomSchema)