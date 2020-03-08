var mysql = require('mysql');
const dao = require("../dao/userDao");


test('test add', async() => {

  beforeAll(async () => {
    connection = await mysql.createConnection({
        host: 'us-cdbr-iron-east-04.cleardb.net', 
        user: 'bf265313f175c4',
        password: '832682b3',
        database:'heroku_1fce15628916a32' 
     });
  });
	afterAll(async () => {
	    await  connection.release();
	  });  

    var mockUser = {name: 'some-user', age: 18, sex:'f'};
    await dao.add((mockUser,res,next)=>{

    expect(res).toEqual(1);
    });
})