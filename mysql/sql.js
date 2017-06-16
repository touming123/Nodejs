var mysql = require('mysql');

// 创建连接
var conn = mysql.createConnection({
  host : '127.0.0.1',
  user : 'root',
  password : '123',
  database : 'test'
})

// 创建连接后不论是否成功都会调用
conn.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log('connect success');
  }
});

conn.end(() => {
  if (err) {
    throw err;
  } else {
    console.log('connect error');
  }
})