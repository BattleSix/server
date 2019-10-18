const mongoose = require('mongoose')
const Schema = mongoose.Schema

const roomSchema = new Schema({
    name: {
        type: String,
        required: [true, `Name room must be filled`],
        maxlength: [50, `max length 50 char`]
    },
    description: {
        type: String,
        maxlength: [50, `character maximum 50`]
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