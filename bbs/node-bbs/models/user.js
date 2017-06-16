var pool = require('./db');
var crypto = require('crypto');

module.export = {
	// 对字符串进行sha1加密
	hash: function(str) {
		return crypto.createHmac('sha1', str).update('love').digest('hex');
	},

	reg: function(username, password, regtime, cb) {
		pool.getConnection((err, connection) => {
			if (err) {
				throw err;
			}

			connection.query('select `id` from `user` where `username` =?', [username], (err, result) => {
				if (err) throw err;

				if (result.length) {
					cb({isExisted: true});
					connection.release();
				} else {
					var params = {username:username, password:password, regtime:regtime};
					connection.query('insert into `user` set ?', params, (err, result) => {
						if (err) throw err;
						cb(result);
						connection.release();
					})
				}
			})
		})
	},

	login: function(username, password, cb) {
		pool.getConnection((err, connection) => {
			if (err) throw err;

			connection.query('SELECT `id` FROM `user` WHERE `username`=? AND `password`=?', [username, password], function(err, result){
		    if(err) throw err;

		    cb(result);
		    connection.release();
		   })
		})
	}
}