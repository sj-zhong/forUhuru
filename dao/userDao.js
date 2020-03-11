var mysql = require('mysql');
var $conf = require('../conf/conf');
var $sql = require('./userSqlMapping');

// poolを使って、接続性能改善
var pool = mysql.createPool( $conf.mysql );

// clientにフィードバック
var jsonWrite = function (res, ret) {
    if(typeof ret === 'undefined') {
        res.json({
            code:'1',
            msg: 'opretion fail'
        });
    } else {
        res.json(ret);
    }
};

module.exports = {
    add: function (req, res, next) {

       var result={code:0,msg:'s'};
        if(req.query.name.length === 0 || req.query.name.length > 255)
        {
            result = {
                code: 1,
                msg:'名前不正：空欄かまたは255文字超えました!'
            };
            jsonWrite(res, result);
            return;
        }

        if(req.query.age < 0 || req.query.age > 200)
        {
            result = {
                code: 2,
                msg:'年齢不正!'
            };
            jsonWrite(res, result);
            return;
        }
        if(req.query.sex !== "F" && req.query.sex !== "M")
        {
            result = {
                code: 3,
                msg:'性別不正!'
            };
            jsonWrite(res, result);
            return;
        }
        var reg=/^[0-9]{11}$/;
        if(!reg.test(req.query.telephone))
        {
            result = {
                code: 4,
                msg:'電話番号不正!'
            };
            jsonWrite(res, result);
            return;
        }

        var reg=/^[0-9]{7}$/;
        if(!reg.test(req.query.postNum))
        {
            result = {
                code: 5,
                msg:'郵便番号不正!'
            };
            jsonWrite(res, result);
            return;
        }
        if(req.query.address.length === 0 || req.query.address.length > 255)
        {
            result = {
                code: 6,
                msg:'住所不正：空欄かまたは255文字超えました！'
            };
            jsonWrite(res, result);
            return;
        }
        pool.getConnection(function(err, connection) {
            // clientデータ取得
            var param = req.query || req.params;
			
            // データベースに該当記録を挿入する
            connection.query($sql.insert, [param.name, param.age, param.sex, param.telephone, param.postNum, param.address], function(err, result) {
                if(result) {
                    result = {
                        code: 200,
                        msg:'Add sucessed'
                    };    
                }
                // 結果をclientに返す.
                jsonWrite(res, result);
                // 接続を開放する 
                connection.release();
            });
        });
    },
    create: function (req, res, next) {
        pool.getConnection(function(err, connection) {
	        connection.query("CREATE TABLE user(name  varchar(255),age int, sex varchar(255),telephone varchar(255),postNum varchar(255), address varchar(255))", function(err,result){
				if(err){throw err}else{
					console.log("创建表成功")
				}
			});
        });
    },
    drop: function (req, res, next) {
        pool.getConnection(function(err, connection) {
	        connection.query("DROP TABLE IF EXISTS  user", function(err,result){
				if(err){throw err}else{
					console.log("delete sucessed")
				}
			});
        });
    },    
    queryAll: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryAll, function(err, result) {
                res.render('list',{
                    title:'List',
                    result:result
                });
                connection.release();
            });
        });
    }
};