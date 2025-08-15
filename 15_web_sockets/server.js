const express = require("express");
const http = require("http");
const socketIo = require("socket.io");


const port = 3000;

// create http server
const app = express();
const server = http.createServer(app);

// add sse endpoint
app.get("/sse", (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    
    setInterval(() => {
        res.write("data: " + new Date().toISOString() + "\n\n");
    }, 1000);
});

// create a websocket server
const io = socketIo(server);

io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

