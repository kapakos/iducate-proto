const Koa = require('koa');
const Router = require('koa-route');
const serve = require('koa-static');
const send = require('koa-send');

const app = new Koa();

const PORT = process.env.PORT || 7000;

app.use(serve(`${__dirname}/dist`));

app.use(Router.get('/*', function* index() {
  yield send(this, `${__dirname}/dist/index.html`);
}));

app.listen(PORT);
