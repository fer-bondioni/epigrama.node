var pool = require('./bd');
var md5 = require('md5');

async function getUserByUsernameAndPassword(user, password) {
    try {
        var query = "select * from usuarios where usuario = ? and clave = ? limit 1";
        var rows = await pool.query(query, [user, md5(password)]);
        return rows[0];
    } catch (error) {
        throw (error);
    }
}

async function addUser(obj) {
    try {
        obj.clave = md5(obj.clave);
        var query = "insert into usuarios set ?";
        var rows = await pool.query(query,[obj]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}





module.exports = { getUserByUsernameAndPassword, addUser }