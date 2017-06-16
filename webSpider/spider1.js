var request = require('request'),
    cheerio = require('cheerio'),
    fs = require('fs'),
    path = require('path'), // 用于分析图片的名称或者后缀名
    mkdirp = require('mkdirp'); // 用于创建多级目录

var date = new Date(),
    year = date.getFullYear(),
    month = date.getMonth()+1,
    month = ('00'+month).slice(-2), // 添加前置0
    day = date.getDate(),
    day = ('00'+day).slice(-2), // 添加前置0
    dir = './img/'+year+'/'+month+'/'+day+'/';

// 根据日期创建目录 ./img/2017/01/22/
mkdirp(dir, function(err){
    if(err) throw err;
})

request({
    url : 'http://desk.zol.com.cn/meinv/?_t='+Date.now()
}, function(err, response, body){
    if(err) throw err;

    if( response.statusCode == 200 ){
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

// 保存图片
var download = function(imgurl, filename){
    request.head(imgurl, function(err, res, body) {
        request(imgurl).pipe(fs.createWriteStream(filename));
        console.log(filename+' success!');
    });
}