const http = require('http');
const app = require('./app');
const port = 3001;
const server = http.createServer(app);

server.listen(port, (e)=>{
    console.log('server is up and running port = ' + port)
});