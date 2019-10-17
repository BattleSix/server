const Room = require('../models/room')
const { io } = require('../config/socket')

class GameController {
    static create(req, res, next) {
        const { name, group, status, roomMaster } = req.body
        Room.create({ name, group, status, roomMaster })
            .then(room => {
                res.status(201).json(room)
            })
            .catch(next)
    }

    static find(req, res, next) {
        Room.find()
            .then(rooms => {
                res.status(200).json(rooms)
            })
            .catch(next)
    }

    static findById(req, res, next) {
        Room.findById(req.params.id)
            .then(room => {
                res.status(200).json(room)
            })
            .catch(next)
    }

    static updateStatus(req, res, next) {
        const status = req.body.status
        Room.findByIdAndUpdate(req.params.id, { status }, { new: true })
            .then(room => {
                res.status(200).json(room)
            })
            .catch(next)
    }

    static remove(req, res, next) {
        Room.findByIdAndDelete(req.params.id)
            .then(() => {
                res.status(200).json({ message: `delete room success` })
            })
            .catch(next)
    }

}

module.exports = GameController