var express = require('express');
var router = express.Router();
var test = require('/code/node_v1/public/javascripts');
var path = require('path');
var query = require('../query.js');
var timerObj = {};
/* GET home page. */

function getData (sql,res,isArray) {
	query(sql)
		.then(function(result){
			console.log('---',result);
			if (result[0]) {
				res.send({
					success:true,
					data:isArray ? result : result[0]
				})
			} else {
				res.send({
					success:false
				})
			}
		})
		.catch(function(err){
			res.send({
				success:false,
				err:err
			})
		});
}
function start (id) {
	console.log('change')
	let num = parseFloat(Math.random().toFixed(2));
	let num2 = Math.ceil(Math.random()*4);
	let num3 = Math.ceil(Math.random()*40);
	let num4 = Math.ceil(Math.random()*40);
	query(`SELECT * FROM unit WHERE id=${id}`)
		.then(function(result){
			console.log(`UPDATE unit SET request=${result[0].request+num2*num3*num4}, expose=${result[0].expose+num2*num3}, click=${result[0].click+num2}, resume=${result[0].resume+num} WHERE id = ${id}`)
			query(`UPDATE unit SET request=${result[0].request+num2*num3*num4}, expose=${result[0].expose+num2*num3}, click=${result[0].click+num2}, resume=${result[0].resume+num} WHERE id = ${id}`);
		})
		.catch(function(err){
			console.log(err);
		})
	query(`SELECT a.id,a.request,a.expose,a.click,a.resume FROM campaign a JOIN unit b ON a.cname=b.cname WHERE b.id=${id}`)
		.then(function(result){
			console.log(`campaign result`,result);
			query(`UPDATE campaign SET request=${result[0].request+num2*num3*num4}, expose=${result[0].expose+num2*num3}, click=${result[0].click+num2}, resume=${result[0].resume+num} WHERE id = '${result[0].id}'`);
		})
		.catch(function(err){
			console.log(err);
		})
	query(`SELECT a.id,a.resume FROM project a JOIN unit b ON a.name=b.pname WHERE b.id=${id}`)
		.then(function(result){
			console.log(`project result`,result);
			query(`UPDATE project SET resume=${result[0].resume+num} WHERE id = '${result[0].id}'`);
		})
		.catch(function(err){
			console.log(err);
		})
	query(`SELECT a.id,a.resume FROM account a JOIN unit b ON a.id=b.ownerId WHERE b.id=${id}`)
		.then(function(result){
			console.log(`account result`,result);
			query(`UPDATE account SET resume=${result[0].resume+num} WHERE id = '${result[0].id}'`);
		})
		.catch(function(err){
			console.log(err);
		})
}

router.all('*',function(req,res, next){
	//Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	res.setHeader('Access-Control-Allow-Methods', '*');
	res.setHeader('Content-Type', 'application/json;charset=utf-8');
	if (req.method.toLowerCase() == 'options') {
		res.sendStatus(200);  //让options尝试请求快速结束
	} else {
		next();
	}
});

router.get('/', function(req, res, next) {
	res.setHeader('Content-Type', 'text/html');
	res.sendFile(path.join(__dirname,'../dist/build/index.html'));
});
router.get('/change/:table/:id/:state',function(req, res, next) {
	let id = req.params.id;
	query(`UPDATE ${req.params.table} SET state=${req.params.state} WHERE id=${parseInt(id)}`);
	if (req.params.table === 'unit') {
		if (req.params.state == 1) {
			console.log('start',id);
			timerObj[id] = setInterval(function(){
				start(id);
			},10000)
		} else {
			console.log('stop',id);
			clearInterval(timerObj[id]);
		}
	}
	res.sendStatus(200);
});
router.get('/advertiser/list/:user',function(req, res, next) {
	getData(`SELECT * FROM account WHERE user="${req.params.user}"`,res,true)
});
router.get('/project/list/:id',function(req, res, next) {
	getData(`SELECT * FROM project WHERE accountId="${req.params.id}"`,res,true)
});
router.get('/campaign/list',function(req, res, next) {
	getData(`SELECT * FROM campaign`,res,true)
});
router.get('/unit/list',function(req, res, next) {
	getData(`SELECT * FROM unit`,res,true)
});

router.all('/login',function(req, res, next){
    console.log('---',req.body);
	getData(`SELECT * FROM user WHERE user="${req.body.username}" AND pwd="${req.body.password}";`,res,false)
});
router.get('*', function(req, res, next) {
	res.setHeader('Content-Type', 'text/html');
	res.sendFile(path.join(__dirname,'../dist/build/index.html'));
});

module.exports = router;
