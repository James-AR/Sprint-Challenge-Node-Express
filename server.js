const express = require('express');
const helmet = require('helmet');

const projectRouter = require('./routes/projectRouter.js');
const actionRouter = require('./routes/actionRouter.js');

const server = express();

function logger( req, res, next) {
    next();
}

server.use(helmet());
server.use(express.json());
server.use(logger);

server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);

server.get('/', (req, res) => {
    res.json({ API: 'Functioning...'});
})

const port = 5000;
server.listen(port, () => console.log ('API Running'));