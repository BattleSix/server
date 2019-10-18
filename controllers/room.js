const Room = require('../models/room')

class RoomController {
    static create(req, res, next) {
        const { name, description, groupA, groupB, status, roomMaster } = req.body
        Room.create({ name, description, groupA, groupB, status, roomMaster })
            .then(room => {
                req.io.emit('createRoom', room)
                res.status(201).json(room)
            })
            .catch(next)
    }

    static find(req, res, next) {
        Room.find().sort({ createdAt: -1 })
            .then(rooms => {
                req.io.emit('getAllRoom', rooms)
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

    static updatePlayer(req, res, next) {
        const { player } = req.body
        Room.findById(req.params.id)
            .then(room => {
                let teamA = room.groupA.get('players')
                let teamB = room.groupB.get('players')
                let scoreA = room.groupA.get('score')
                let scoreB = room.groupB.get('score')
                if (teamA.length < 3) {
                    teamA.push(player)
                    let newObjA = {
                        score: scoreA,
                        players: teamA
                    }
                    return Room.updateOne({ _id: req.params.id }, { groupA: newObjA })
                } else if (teamB.length < 3) {
                    teamB.push(player)
                    let newObjB = {
                        score: scoreB,
                        players: teamB
                    }
                    return Room.updateOne({ _id: req.params.id }, { groupB: newObjB })
                }
            })
            .then(() => {
                req.io.emit('joingroup', req.params.id)
                res.status(200).json({ message: `update success` })
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

module.exports = RoomController