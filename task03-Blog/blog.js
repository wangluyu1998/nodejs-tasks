const http = require('http'),
    log = console.log,
    fs = require('fs'),
    url = require('url'),
    path = require('path'),
    qs = require('querystring');

http.createServer((req,res)=>{
    log(`${req.method} ${req.url} HTTP/${req.httpVersion}`);
    log(req.headers);
    log('');

    // var pathname = url.parse(req.url).pathname;
    
    if(req.method === 'GET' && req.url === '/login'){
        var realPath = path.join(__dirname,'login.html');
        fs.readFile(realPath,'utf8',function(err,data){
            if(err){
                console.error(err.message);
            }else{
                res.writeHead(200,{'Content-Type':'text/html'});
                res.end(data);
            }
        })
    }
    else if(req.method === 'GET' && req.url === '/list'){
        var realPath = path.join(__dirname,'chapterList.html');
        fs.readFile(realPath,'utf8',(err,data)=>{
            if(err){
                console.error(err.message);
            }
            else{
                res.writeHead(200,{'Content-Type':'text/html'});
                res.end(data);
            }
        })
    }else if(req.method === 'GET' && req.url ==='/listmanager'){
        var realPath = path.join(__dirname,'list.html');
        fs.readFile(realPath,'utf8',(err,data)=>{
            if(err){
                console.error(err.message);
            }else{
                res.writeHead(200,{'Content-Type':'text/html'});
                res.end(data);
            }
        })
    }
    else if(req.method === 'GET' && req.url ==='/addChapter'){
        var realPath = path.join(__dirname,'addChapter.html');
        fs.readFile(realPath,'utf8',(err,data)=>{
            if(err){
                console.error(err.message);
            }else{
                res.writeHead(200,{'Content-Type':'text/html'});
                res.end(data);
            }
        })
    }
    else{
        judType();
    }

    //判断访问的文件类型
    function judType(){
        if(req.url.includes('jpg')){
            var realPath = path.join(__dirname,req.url);
            fs.readFile(realPath,function(err,data){
                if(err) {
                    console.error(err.message);
                }
                else{
                    res.writeHead(200,{'Content-Type':'image/jpg'});
                    res.end(data);
                }
            })
        }else if(req.url.includes('jpeg')){
            var realPath = path.join(__dirname,req.url);
            fs.readFile(realPath,function(err,data){
                if(err) {
                    console.error(err.message);
                }
                else{
                    res.writeHead(200,{'Content-Type':'image/jpeg'});
                    res.end(data);
                }
            })
        }else if(req.url.includes('css')){
            var realPath = path.join(__dirname,req.url);
            fs.readFile(realPath,function(err,data){
                if(err) {
                    console.error(err.message);
                }
                else{
                    res.writeHead(200,{'Content-Type':'text/css'});
                    res.end(data);
                }
            })
        }
        else if(req.url.includes('js')){
            var realPath = path.join(__dirname,req.url);
            fs.readFile(realPath,function(err,data){
                if(err) {
                    console.error(err.message);
                }
                else{
                    res.writeHead(200,{'Content-Type':'text/js'});
                    res.end(data);
                }
            })
        }
    }
}).listen(8083);