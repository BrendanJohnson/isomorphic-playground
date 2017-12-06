
const express = require('express')
const next = require('next')
const routes = require('./routes')

const dev = process.env.NODE_ENV !== 'production'

const app = next({ dev })
const handler = routes.getRequestHandler(app)

app.prepare().then(() => {
  const server = express();
  server.use(handler).listen(3000)
  // // create router from express
  // const router = express.Router();

  // // this will prevent 404 not found when copy & parse url in browser's address bar
  // router.get('/:slug', (req, res) => {
  //   return app.render(req, res, '/search', req.query);
  // });

  // router.get('*', (req, res) => {
  //   handle(req, res);
  // });

  // // bind prefix to resource url
  // server.use('/prefix', router); 
  // server.use('/prefix/static', express.static('static'));
  // server.use(handle);

  // server.listen(3000, err => {
  //   if (err)
  //     throw err;
  //   console.log(`> Ready on http://localhost:3000/prefix`);
  // });
});