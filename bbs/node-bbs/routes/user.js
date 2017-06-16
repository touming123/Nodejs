var express = require('express');
var router = express.Router();
var user_m = require('../models/user');

/* 定义路由 */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'user'});
});

router.get('/reg', (req, res, next) => {
	res.render('reg', {errmsg: ''});//加载reg.ejs模板
})

router.post('/reg', (req, res, next) => {
	var userName = req.body.username || '',
			password = req.body.password || '',
			password2 = req.body.password2 || '',
	if (password !== password2) {
		res.render('reg', {errmsg: '密码不一致'});
		return;
	}
	var passwordHash = user_m.hash(pasword),//加密
			regtime = parseInt(Date.now()/1000);

	user_m.reg(username, passwordHash, regtime, (result) => {
		if (result.isExisted) {
			res.render('reg', {errmsg:'用户名已存在'}); // 重新加载注册模板，并提示用户名已存在
		} else if (result.affectedRows) {
			res.redirect('/');
		} else {
			res.render('reg', {errmsg:'注册失败，请重新尝试'});
		}
	})

})
// 进入到登录页面
router.get('/login', (req, res, next) => {
	res.render('login', {errmsg: ''});
})

// 处理登录请求
router.post('/login', (req, res, next) => {
	var username = req.body.username || '',
			password = req.body.password || '';

	var password_hash = user_m.hash(password);

	user_m.login(username, password_hash, function(result){
		if(result.length){
			//res.send('登录成功');
			req.session.user = {
				uid: result[0].id,
				username: username
			};
			res.redirect('/');
		}else{
			res.render('login', {errmsg:'用户名或密码错误'});
		}
	});
})


module.exports = router;
