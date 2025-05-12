const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';//在开发环境时候
const hostname = 'localhost';
const port = 4000;//http://localhost:4000/  与打开http://localhost:3000效果一样的npm run dev

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();//http请求处理器

app.prepare().then(() => {//"devServer": "node server.js",//服务器端启动     npm run devServer
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;

      console.log(22229999999999999);
      console.log(pathname);
      console.log(query);

      if (pathname === '/tag') {//4000端口遇到这个路由就重新定向
        await app.render(req, res, '/user/2', query);//就是说路由还是http://localhost:4000/tag，但是页面实际显示的是http://localhost:4000/user/2
      } else {
        await handle(req, res, parsedUrl);
      }
    } catch (err) {
      console.log('error', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`Server is running at：http://${hostname}:${port}`);
  });
});
