var express = require('express');//引入模块
var app = express();//执行express()得到一个app实例
//app实例中有get,post,use,listen方法

app.get('/', function(req, res) {
  res.send('hello world');
});
/* 当使用get方法访问路径path时，执行handler指定的方法，
而且handler方法还带有req和res两个参数供我们使用。
req是请求过来时带的信息，比如参数query, body, 头部header等； 
res是我们作为服务器想要返回给浏览器的信息设置。
res.send(‘hello world')表示是向页面中发送'hello world'字符串。
*/

app.listen(3000, function() {
  console.log('server run at port 3000');
});
//app.listen用来监听本地的端口后运行web程序，监听成功后执行回调函数