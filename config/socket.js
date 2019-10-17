const server = require('../bin/http')
const io = require('socket.io')(server);

io.on('connection', function (socket) {
    console.log('a user connected')
})

module.exports = {
    io
}