const http = require('http'),
    fs = require('fs'),
    log = console.log,
    url = require('url'),
    qs = require('querystring');

http.createServer((req,res)=>{
    log(`${req.method} ${req.url} HTTP/${req.httpVersion}`);
    log(req.headers);
    log('');

    let pathname = url.parse(req.url).pathname;

    if(req.method === 'GET' && pathname === '/list'){
        res.writeHead(200,{'Content-Type':'text/html'});
        fs.readFile('./chapterList.html','utf8',function(err,data){
            
            if(err){
                console.log('Error!');
            }else{
                res.end(data);
            }
        });
    }else if( req.method === 'GET' && req.url ==='/login'){
        fs.readFile('./Login.html','utf8',function(err,data){
            if(err){
                console.log('Error!')
            }else{
                res.end(data);
            }
        });
    }else{
        res.end('Error!');
    }
}).listen(8083);