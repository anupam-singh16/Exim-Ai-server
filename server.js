const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('response_of_query', (data) => {
        io.emit('query', { message: `Exim AI: You asked "${data.message}", right?` });
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(4000, () => {
    console.log('listening on : 4000');
});
