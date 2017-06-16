let request = require('request');
let cheerio = require('cheerio');

request('https://cnodejs.org/', (err, res, body) => {
    if (!err && res.statusCode === 200) {
        // body为源码
        // 使用 cheerio.load 将字符串转换为 cheerio(jQuery) 对象，
        // 按照jQuery方式操作即可
        let $ = cheerio.load(body);
        // 输出导航的html代码
        console.log($('.nav').html());

        let data = [];
        $('#topic_list .cell').each(function(){
            let $this = $(this);
            // 使用trim去掉数据两端的空格
            data.push({
                title : trim($this.find('.topic_title').text()),
                url : trim($this.find('.topic_title').attr('href')),
                author : trim($this.find('.user_avatar img').attr('title')),
                reply : trim($this.find('.count_of_replies').text()),
                visits : trim($this.find('.count_of_visits').text())
            })
        });
        // console.log( JSON.stringify(data, ' ', 4) );
        console.log(data);
    }
});

// 删除字符串左右两端的空格
function trim(str){ 
    return str.replace(/(^\s*)|(\s*$)/g, "");
}