require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const apiRouter = require('./api');
const {client} = require('./db/');

client.connect();

const server = express();
const PORT = process.env.PORT || 3001

server.use(morgan("dev"));
server.use(express.json());
server.use(cors());

server.use((req, res, next) => {
  console.log('Hitting server')
  next();
})

server.use('/api', apiRouter);

server.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`)
})
