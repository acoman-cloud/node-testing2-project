const express = require("express");

const pokeminRouter = require('./pokemin/pokemin-router');

const server = express();

server.use(express.json());

server.use('/api/pokemon/abilites', pokeminRouter)

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

server.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  })
})

module.exports = server;
