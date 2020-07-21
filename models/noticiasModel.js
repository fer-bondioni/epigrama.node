var pool = require('./bd');

async function getNoticias() {
    var query = "select * from noticias order by id DESC limit 3";
    var rows = await pool.query(query);
    return rows;
}// en index


async function getNoticias2() {
    var queryPrimera = "select * from noticias where id > 12 and id < 36 order by id DESC";
    var querySegunda = "select * from noticias where id > 36 order by id DESC";
    return {
        pepe : await pool.query(queryPrimera),
        pepeDos : await pool.query(querySegunda)
    }
}//en noticias front


async function getNoticias3() {
    var query = "select * from noticias order by id DESC";
    var rows = await pool.query(query);
    return rows;
}//admin


async function insertNoticia(obj) {
    try{
        var query = "insert into noticias set ?";
        var rows = await pool.query(query, [obj]);
        return rows;
    } catch(error){
        console.log(error);
        throw error;
    }
}

async function deleteNoticiasById(id) {
    var query = "delete from noticias where id = ?";
    var rows = await pool.query(query, [id]);
    return rows;
}

// async function getNoticiasById(id){
//     var query = "select * from noticias where id = ?";
//     var rows = await pool.query(query, [id]);
//     return rows[0];
// }en admin, /modificar


async function getNoticiaById(id){
    var query = "select * from noticias where id = ? limit 1";
    var rows = await pool.query(query, [id]);
    return rows[0];
}


async function getNoticiasByCategoria(categoria){
    var query = "select * from noticias where categoria = ? order by id DESC";

    return {
        pepe: await pool.query(query, [categoria])
    }
}

async function modificarNoticiabyId(obj, id){
    try{
        var query = "update noticias set ? where id=?";
        var rows = await pool.query(query, [obj, id]);
        return rows;
    } catch(error){
        throw error;
    }
}

async function buscarNoticias(busqueda){
    var query = "select * from noticias where titulo like ? or contenido like ? or categoria like ? or fecha like ?";
    var rows = await pool.query(query, ['%'+ busqueda + '%', '%'+ busqueda + '%', '%'+ busqueda + '%', '%'+ busqueda + '%' ]);
    return rows;
}

module.exports = 
{   getNoticias, 
    getNoticias2, 
    getNoticias3, 
    insertNoticia, 
    deleteNoticiasById, 
    getNoticiaById,
    modificarNoticiabyId, 
    buscarNoticias, 
    getNoticiasByCategoria }
