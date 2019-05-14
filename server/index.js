const morgan = require('morgan');
const fastify = require('fastify')({})

// required plugin for HTTP requests proxy
fastify.register(require('fastify-reply-from'))

// gateway plugin
fastify.register(require('k-fastify-gateway'), {
  middlewares: [
    morgan('dev')
  ],
    routes: [{
      prefix: '/v1/auth',
      prefixRewrite: ':3000/v1',
      target: 'http://localhost',
    },{
        prefix: '/v1/profile',
        prefixRewrite: ':3001/v1',
        target: 'http://localhost',
    },{
        prefix: '/v1/feed',
        prefixRewrite: ':3002/v1',
        target: 'http://localhost',
    }]
  })
   
  // start the gateway HTTP server
  fastify.listen(8080, '0.0.0.0').then((address) => {
    console.log(`API Gateway listening on ${address}`)
  })