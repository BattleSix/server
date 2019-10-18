if (process.env.NODE_ENV == 'development') {
    require('dotenv').config()
}

require('./config/mongoose')
const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')
const morgan = require('morgan')
const server = http.createServer(app)
const io = require('socket.io').listen(server)
const errorHandler = require('./middlewares/errorHandler')
const router = require('./routes/index')
const PORT = process.env.PORT || 3000

io.on('connection', function (socket) {
    socket.on('addplayer', function (player) {
        io.emit('notificationNewPlayer', `${player.name} join the game room`)
    })
})

app.use(function (req, res, next) {
    req.io = io
    next()
})

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.use('/', router)
app.use(errorHandler)

server.listen(PORT, () => {
    console.log(`Server Running On PORT ${PORT}`)
})