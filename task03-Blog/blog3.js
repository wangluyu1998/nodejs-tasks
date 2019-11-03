// const { chapterList, userList} = require('./demo1');
const http = require('http');
const fs = require('fs');
const path = require('path');
var URL = require('url');
var qs=require("querystring");


http.createServer((req,res)=>{
if(req.url === '/login'){
var listPath = path.join(__dirname,'login.html');
res.writeHead(200,{'Content-Type':'text/html'});
fs.readFile(listPath,'utf-8',(err,data)=>{
    if(err){
        console.error(message);
    }else{
        res.end(data);
    }
})
}
else if(req.url === '/list'){
var listPath = path.join(__dirname,'chapterList.html');
res.writeHead(200,{'Content-Type':'text/html'});
fs.readFile(listPath,'utf-8',(err,data)=>{
    if(err){
        console.error(message);
    }else{
        res.end(data);
    }
})
}
else if(req.url == '/a/'){
res.write(JSON.stringify(chapterList));
res.end();
}
else if(req.url === '/addChapter/'){
var listPath = path.join(__dirname,'addChapter.html');
res.writeHead(200,{'Content-Type':'text/html'});
fs.readFile(listPath,'utf-8',(err,data)=>{
    if(err){
        console.error(message);
    }else{
        res.end(data);
    }
})
}
else if(req.url == '/art/'){
res.write(JSON.stringify(chapterList));
res.end();
}else if(req.url == 'wChapter/'){
res.writeHead(200,{'Content-Type':'text/json'});
    nowChapter=chapterList[Id];  
    res.end(JSON.stringify(nowChapter));
}else if(req.url == '/add'){
console.log("收到");
var newChapter = {};

var postData = ""; 
// 数据块接收中
 req.addListener("data", function (postDataChunk) {
    postData += postDataChunk;

    var title=qs.parse(postData).title;
    var content=qs.parse(postData).content;
    console.log(qs.parse(postData));

    newChapter.chapterId=chapterList.length+1;
    newChapter.chapterName=title;
    newChapter.chapterDes=content;
    newChapter.chapterContent=content;
    newChapter.publishTimer= "2019-08-19";
    newChapter.author="admin";
    newChapter.views=1022;
    newChapter.imgPath='';
    chapterList.push(newChapter);

});

}else if(req.url !== '/'){
var cpurl = '.'+req.url;
res.writeHead(200,{'Content-type':"text/css"});
fs.readFile(cpurl, function(err, data) {
    if (err) {
        console.error(err);
    }else{
        res.end(data);
    }
});
}
else if(req.url === '/favicon.ico'){
    return;
}
}).listen(8083);