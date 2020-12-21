const express = require('express');

const postRouter = require('./routes/posts.js');
const commentRouter = require('./routes/comments.js')

const server = express();

server.use(express.json());

server.use('/api/posts', postRouter)
server.use('/api/posts', commentRouter)

server.get('/', (req, res) => {
    res.send(`
    <h2>Lambda Project 2 API</h2>
    <p> Welcome to Lambda Project 2 API</p>
    `);
});

module.exports = server;