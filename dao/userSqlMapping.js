var user = {
    insert:'INSERT INTO user(name, age, sex, telephone, postNum, address) VALUES(? , ? , ?, ? , ?, ?)',
    queryAll: 'SELECT * FROM user'
};

module.exports = user;