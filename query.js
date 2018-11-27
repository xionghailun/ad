var mysql = require('mysql');
var pool = mysql.createPool({
	host:'localhost',
	user:'root',
	// password:'HWMfOczgFlRhwSiq6SF6B',
	password:'123456',
	database:'mydb'
});

var query = function (sql,params) {
	return new Promise(function(resolve,reject){
		pool.getConnection(function(err,connection){
			if (err) {
				reject(err);
			} else {
				connection.query(sql,function(error,result){
					connection.release();
					if (error) {
						reject(error);
					} else {
						resolve(result);
					}
				})
			}
		});
	}).then(function(res){
		// console.log('query success',res);
		return Promise.resolve(res);
	}).catch(function(err){
		// console.log('fail',err);
		return Promise.reject(err);
	})
}
console.log('+++++++')
module.exports = query;