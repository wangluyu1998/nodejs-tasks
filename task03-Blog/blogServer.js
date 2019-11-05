const {chapterList,userList} = require('./data.js');
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
    switch(req.method){
        case 'GET':
            getPages(res);
            break;
        case 'POST':
            addMsg(req,res);
            break;
        case 'DELETE':
            break;
        default:
            break;
    }
    //处理get请求
    function getPages(res){
        if(req.url === '/login'){
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
        else if(req.url === '/list'){
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
        }else if(req.url ==='/listmanager'){
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
        else if(req.url ==='/addChapter'){
            var realPath = path.join(__dirname,'addChapter.html');
            fs.readFile(realPath,'utf8',(err,data)=>{
                if(err){
                    console.error(err.message);
                }else{
                    res.writeHead(200,{'Content-Type':'text/html'});
                    res.end(data);
                }
            })
        }else if(req.url === '/counts/'){
            res.write(JSON.stringify(chapterList));
            res.end();
        }else if(req.url.includes('/detail')){
            var realPath = path.join(__dirname,'chapter.html');
            fs.readFile(realPath,'utf8',(err,data)=>{
                if(err){
                    console.error(err.message);
                }else{
                    res.writeHead(200,{'Content-Type':'text/html'});
                    res.end(data);
                }
            })
        }else if(url.parse(req.url).pathname === '/getDetail'){
            var id=url.parse(req.url).query.replace(/chapterId=/,"");
            // log(id);
            let obj;
            for(let i = 0; i < chapterList.length; i++){
                if(chapterList[i].chapterId == id){
                    obj = chapterList[i];
                }
            }
            res.writeHead(200, {'Content-Type': 'text/json'});
            res.end(JSON.stringify(obj));
            // log(JSON.stringify(obj));
        }else if(req.url === '/items'){
            res.write(JSON.stringify(chapterList));
            res.end();
        }else{
            judgeType(req,res);
        }
    }
    
    //处理post登录信息以及add文章
    function addMsg(req,res){
        if(req.url === '/login'){
            login(req,res);
        }
        else if(req.url === '/add'){
            addArticle(req,res);
        }else{
            log('error!');
        }
    }

    //登录进行的验证过程
    function login(req,res){
        var user = '';
        var isLogin = false;
        req.on('data', (data)=>{
            user += data;
        });
        req.on('end', ()=>{
            user = qs.parse(user);
            userList.map((item)=>{
                if(item.username == user.username && item.pwd == user.pwd){
                    isLogin = true;
                    res.statusCode = 200;
                    res.end('OK');
                }
            });
            if(isLogin == false){
            res.statusCode = 404;
            res.end('error!')
            }
            // log(isLogin);错误调试
        });
    }

    //添加文章
    function addArticle(req,res){
        var article = {};
        var postdetail='';
        req.on('data', (data)=>{
            postdetail += data;
            var title=qs.parse(postdetail).title;
            var content=qs.parse(postdetail).content;
            article.chapterId = chapterList.length+1;
            article.chapterName=title;
            article.chapterDes=content;
            article.chapterContent=content;
            article.publishTimer= "2019-10-28";
            article.author="admin";
            article.views=999;
            article.imgPath='';
            chapterList.push(article);
            // log(article);调试语句
            // log(chapterList);调试语句
            //log(article.chapterName);调试语句
        });
    }

    //判断访问的文件类型
    function judgeType(req,res){
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