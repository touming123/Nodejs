let request = require('request');
let cheerio = require('cheerio');
let fs = require('fs');
let path = require('path');
let mkdirp = require('mkdirp');

var date = new Date(),
    year = date.getFullYear(),
    month = date.getMonth()+1,
    month = ('00'+month).slice(-2), // 添加前置0
    day = date.getDate(),
    day = ('00'+day).slice(-2), // 添加前置0
    dir = './img/'+year+'/'+month+'/'+day+'/';

// 根据日期创建目录 ./img/2017/01/22/
let stats = fs.statSync(dir);
if(stats.isDirectory() ){
    console.log(dir+' 已存在');
}else{
    console.log('正在创建目录 '+dir);
    
}

request({
    url: 'http://desk.zol.com.cn/meinv/?_t='+Date.now()
}, (err, res, body) => {
    if (err) {
        throw err;
    }
    if (res.statusCode === 200) {
        var $ = cheerio.load(body);
        $('.photo-list-padding img').each(function(){
            var $this = $(this),
                imgurl = $this.attr('src');
            
            var ext = path.extname(imgurl); // 获取图片的后缀名，如 .jpg, .png .gif等
            var filename = Date.now()+'_'+ parseInt(Math.random()*10000)+ext; // 命名方式：毫秒时间戳+随机数+后缀名
            // var filename = path.basename(imgurl); // 直接获取图片的原名称
            // console.log(filename);
            download(imgurl, dir+filename); // 开始下载图片
        })
    }
});

function download(imgurl, filename) {
    request.head(imgurl, function(err, res, body) {
        request(imgurl).pipe(fs.createWriteStream(filename));
        console.log(filename+' success!');
    });
}