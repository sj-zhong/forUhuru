var mysql = require('mysql');
const dao = require("../dao/userDao");
jest.mock('../dao/userSqlMapping');

test('test add', (done) => {

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
 //const queryMock = jest.fn(connection.query);
 //   var mockUser = {query:{name: 'some-user', age: 18, sex:'f'}};
 //    dao.add(mockUser){

 //   expect(1).toEqual(1);
    done();
 //   }
 //  });
})