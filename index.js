const express = require("express");
const app = express();
const http = require("http");
const morgan = require("morgan");
// const mongoose = require("mongoose");
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
require("dotenv").config();


const {Server} = require('socket.io')

const io = new Server(server);

io.on('connection', (socket) => {

  console.log('a user connected', socket.id);


  setInterval(() => {
    io.to(socket.id).emit('private', "Hi...")
  }, 5000)
  
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });


  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
  });

});



app.get("/", (req, res) => res.status(200).json({ status: "Everything is fine." }));

app.get("/index", (req, res) => {
  res.sendFile(__dirname + "/index.html")
})


server.listen(PORT, (err) =>
  !err ? console.log(`✔ Node Listening to http://localhost:${PORT}`) : console.log("There was some error ", err.message)
);
