var express = require('express');
var router = express.Router();
var fs = require('fs');

var dataObj = fs.readFileSync('./data.json','utf8');
// console.log(dataObj);
var obj = JSON.parse(dataObj);
// console.log(obj);
// console.log(obj.users[0].username);
// console.log(obj.users[0].password);

router.get('/', function(req, res,next) {
  res.render('login',{title:'login'});
});

router.get('/list',function(req,res,next){
  res.render('list',{title:'list',data:obj})
});

router.post('/',function(req,res,next){
  // console.log(req.body.username);
  // console.log(req.body.pwd);
  if(req.body.username === obj.users[0].username && req.body.pwd === obj.users[0].password){
    res.render('list',{title:'list',data:obj}); 
  }else{
    res.send('账号或密码错误，请重新输入！');
  }
});

module.exports = router;