const path = require('path')
const http = require('http')
const express = require('express')
 const formatMessage = require('./utils/messages')
const app =express();
const server = http.createServer(app);
const socketio = require('socket.io')
const io = socketio(server)
// Set static

app.use(express.static(path.join(__dirname,'public')))

const botName = 'ChatCord Bot';
// Run when client connects
io.on('connection',socket=>{

    socket.on('joinRoom',({username,room})=>{




        
        socket.emit('message', formatMessage(botName,'Welcome to ChatCord'));

        // Broadcast when a user connects
        socket.broadcast.emit('message',formatMessage(botName,'A User joined the chat'));
        
        // Runs when client disconnects
        socket.on('disconnect',()=>{
            io.emit('message', formatMessage(botName,'A User has left the chat'))
        });
    })



  
    // Listen to chat message
     socket.on('chatMessage',(msg)=>{
        io.emit('message',formatMessage('USER',msg))
     });

});
app.use(express.static(path.join()))
const PORT = 3000 || process.env.PORT;

server.listen(PORT,()=> console.log(`Server running on port ${PORT}`))