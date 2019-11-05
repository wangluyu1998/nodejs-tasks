const http = require('http'),
    fs = require('fs'),
    qs = require('querystring');

http.createServer((req, res) => {
    var data = '';

    if(req.method === 'GET' && req.url==='/login') {
      res.writeHead(200, {'Content-Type':'text/html'});
      res.end(showLogin(res));
    }

    if(req.method === 'POST' && req.url === '/login') {
      req.on('data', (chunk) => { 
        data += chunk; 
      });
      req.on('end', () => {
        var user = qs.parse(data);
        if(user.username === 'zhangsan' && user.pwd === '123') {
          console.log('user: %s, password: %s', user.username, user.pwd);
          var logincount = 1;
          if(typeof req.headers['cookie'] === 'undefined') {
            logincount = 1;
          } else {
            var pair = req.headers['cookie'].split('=');
            logincount = Number(pair[1]) + 1;
          }      
          res.setHeader('Set-cookie', `logincount=${logincount}; max-age=600`);
          res.end(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>状态保持</title></head><body>zhangsan这是您第 ${logincount} 次登录</body><ml>`);
        }else { 
          res.writeHead(200, {'Content-Type':'text/html'});
          res.end('Input Error!');
      }
    });
  }
}).listen(8081);

function showLogin(){
  var html = fs.readFileSync('./login.html').toString('utf8');
  return html;
}