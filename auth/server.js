const http = require('http');
const app = require('./app');
const port = 3000;
const server = http.createServer(app);

server.listen(port, (e)=>{
    console.log('auth server is up and running port = ' + port)
});