var pool = require('./bd');

async function getNovedades() {
    var query = "select * from novedades order by id DESC";
    var rows = await pool.query(query);
    return rows;
}//admin

async function getNovedades2() {
    var query = "select * from novedades order by id ASC limit 1";
    var rows = await pool.query(query);
    return rows;
}//front primera

async function getNovedades3() {
    var query = "select * from novedades where id = 8";
    var rows = await pool.query(query);
    return rows;
}//front segunda

async function getNovedades4() {
    var query = "select * from novedades where id = 9";
    var rows = await pool.query(query);
    return rows;
}//front tercera


async function insertNovedad(obj) {
    try{
        var query = "insert into novedades set ?";
        var rows = await pool.query(query, [obj]);
        return rows;
    } catch(error){
        console.log(error);
        throw error;
    }
}

async function deleteNovedadById(id) {
    var query = "delete from novedades where id = ?";
    var rows = await pool.query(query, [id]);
    return rows;
}

async function getNovedadesById(id){
    var query = "select * from novedades where id = ?";
    var rows = await pool.query(query, [id]);
    return rows[0];
}

async function modificarNovedadbyId(obj, id){
    try{
        var query = "update novedades set ? where id=?";
        var rows = await pool.query(query, [obj, id]);
        return rows;
    } catch(error){
        throw error;
    }
}

async function buscarNovedades(busqueda){
    var query = "select * from novedades where mes like ? or texto like ?";
    var rows = await pool.query(query, ['%'+ busqueda + '%', '%'+ busqueda + '%' ]);
    return rows;
}

module.exports ={ getNovedades, getNovedades2, getNovedades3, getNovedades4, insertNovedad, deleteNovedadById, getNovedadesById, modificarNovedadbyId, buscarNovedades }
