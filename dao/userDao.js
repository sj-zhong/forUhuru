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
            msg: 'opretion falt'
        });
    } else {
        res.json(ret);
    }
};

module.exports = {
    add: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            // clientデータ取得
            var param = req.query || req.params;

            // データベースに該当記録を挿入する
            connection.query($sql.insert, [param.name, param.age, param.sex, param.telephone, param.postNum, param.address], function(err, result) {
                console.log("add data result: "+result);
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